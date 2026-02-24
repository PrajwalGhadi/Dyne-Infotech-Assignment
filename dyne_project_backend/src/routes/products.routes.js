const express = require("express");
const router = express.Router();

const {
  getProductPerCategory,
  getTopReviewdProduct,
  getDiscountDistribution,
  getCategoryWiseAverageRating,
  getSearchedProducts
} = require("../controllers/products.controller");

router.get("/getProductPerCategory", getProductPerCategory);
router.get("/getTopReviewdProduct", getTopReviewdProduct);
router.get("/getDiscountDistribution", getDiscountDistribution);
router.get("/getCategoryWiseAverageRating", getCategoryWiseAverageRating);
router.get("/getSearchedProducts/", getSearchedProducts);

module.exports = router;
