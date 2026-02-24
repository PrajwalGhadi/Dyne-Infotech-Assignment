const pool = require("../configs/db");
const AppError = require("../utils/App.error");
const asyncCatchWrapper = require("../utils/asyncCatchWrapper");
const productSearch = require("../utils/search.logic");

const getProductPerCategory = asyncCatchWrapper(async (req, res) => {
  const productPerCategoryData = await pool.query(
    `SELECT category, COUNT(*) AS product_count FROM amazon_products GROUP BY category ORDER BY product_count DESC LIMIT 10`,
  );

  const allProductCount = await pool.query(
    "SELECT COUNT(*) As totalProductCount FROM amazon_products",
  );

  if (productPerCategoryData.rows.length === 0) {
    // Throwing this goes to the Wrapper, then to the Handler
    throw new AppError("No data found", 404);
  }

  res.status(200).json({
    totalCount: allProductCount.rows[0],
    count: productPerCategoryData.rows.length,
    data: productPerCategoryData.rows,
  });
});

const getTopReviewdProduct = asyncCatchWrapper(async (req, res) => {
  const topReviewedProduct = await pool.query(
    `
    SELECT 
      product_name, 
      -- Remove commas and cast to BIGINT for accurate sorting
      CAST(REPLACE(rating_count, ',', '') AS BIGINT) AS rating_count,
      rating,
      category
    FROM amazon_products
    WHERE rating_count IS NOT NULL AND rating_count <> ''
    ORDER BY rating_count DESC -- Lowest numbers first
    LIMIT 10;
    `,
  );

  if (topReviewedProduct.rows.length === 0) {
    throw new AppError("No data found", 404);
  }

  res.status(200).json({
    count: topReviewedProduct.rows.length,
    data: topReviewedProduct.rows,
  });
});

const getDiscountDistribution = asyncCatchWrapper(async (req, res) => {
  const discountDistribution = await pool.query(
    `
    SELECT 
    CONCAT((width_bucket(REPLACE(discount_percentage, '%', '')::numeric, 0, 101, 10) - 1) * 10, '-', 
         width_bucket(REPLACE(discount_percentage, '%', '')::numeric, 0, 101, 10) * 10, '%') AS discount_range,
    COUNT(*) AS frequency
    FROM amazon_products
    GROUP BY discount_range
    ORDER BY min(width_bucket(REPLACE(discount_percentage, '%', '')::numeric, 0, 101, 10));
    `,
  );

  const averageDiscount = await pool.query(
    `
    SELECT 
    ROUND(AVG(CAST(REPLACE(discount_percentage, '%', '') AS NUMERIC)), 2) AS avg_discount_percentage
    FROM amazon_products
    WHERE discount_percentage IS NOT NULL 
    AND discount_percentage <> '';
    `,
  );

  res.status(200).json({
    count: discountDistribution.rows.length,
    data: discountDistribution.rows,
    averageDiscount: averageDiscount.rows[0],
  });
});

const getCategoryWiseAverageRating = asyncCatchWrapper(async (req, res) => {
  const categoryWiseAverageRating = await pool.query(
    `
    SELECT 
    category, 
    ROUND(AVG(rating::numeric), 2) AS average_rating
    FROM amazon_products
    WHERE rating IS NOT NULL 
      AND rating <> '|'  -- Filters out the problematic character
    GROUP BY category
    ORDER BY average_rating DESC LIMIT 10;
    `,
  );

  res.status(200).json({
    count: categoryWiseAverageRating.rows.length,
    data: categoryWiseAverageRating.rows,
  });
});

const getSearchedProducts = asyncCatchWrapper(async (req, res) => {
  const { searchQuery, countQuery, values, limit, page } = productSearch(
    req.query,
  );

  console.log(searchQuery, countQuery, values, limit, page);
  const [productData, countData] = await Promise.all([
    pool.query(searchQuery, values),
    pool.query(countQuery, values),
  ]);

  // formula tocount the the totalPages
  const totalCount = Number(countData.rows[0].count);
  const totalPages = Math.ceil(totalCount / limit) || 1; // it is just for frontend use that is next page is there or not


  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    success: true,
    data: productData.rows,
    pagination: {
      totalItems: totalCount,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPrevPage
    }, // added to handle the pagination on frontend
    message: "Data Fetch Successfully.",
  });
});

module.exports = {
  getProductPerCategory,
  getTopReviewdProduct,
  getDiscountDistribution,
  getCategoryWiseAverageRating,
  getSearchedProducts,
};
