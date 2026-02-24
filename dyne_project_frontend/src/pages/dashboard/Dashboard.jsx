import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import RatingAnalysis from "../../components/Bar_Histogram_Analysis";

const Dashboard = () => {
  
  const [topReviewedProduct, setTopReviewedProduct] = useState();
  const [productPerCategory, setProductPerCategory] = useState();
  const [discountDistribution, setDiscountDistribution] = useState();
  const [categoryWiseAverageRating, setCategoryWiseAverageRating] = useState();


  const data = [
    { label: "Total Products", count: `${productPerCategory ? productPerCategory.totalCount.totalproductcount : ''}` },
    { label: "Avg. Discount", count: `${discountDistribution ? discountDistribution.averageDiscount.avg_discount_percentage+'%': ''} `},
    { label: "Top Category", count: topReviewedProduct && topReviewedProduct.data[0].product_name.substring(0, 25) },
    { label: "Avg. Rating", count: categoryWiseAverageRating && categoryWiseAverageRating.data[0].average_rating },
  ];

  console.log(topReviewedProduct)
  console.log(productPerCategory)
  console.log(discountDistribution)
  console.log(categoryWiseAverageRating)

  useEffect(()=> {
    fetch(`http://localhost:3000/products/getTopReviewdProduct`)
    .then((resp) => resp.json())
    .then(data => setTopReviewedProduct(data))
  }, []) 
  useEffect(()=> {
    fetch(`http://localhost:3000/products/getProductPerCategory`)
    .then((resp) => resp.json())
    .then(data => setProductPerCategory(data))
  }, []) 
  useEffect(()=> {
    fetch(`http://localhost:3000/products/getDiscountDistribution`)
    .then((resp) => resp.json())
    .then(data => setDiscountDistribution(data))
  }, []) 
  useEffect(()=> {
    fetch(`http://localhost:3000/products/getCategoryWiseAverageRating`)
    .then((resp) => resp.json())
    .then(data => setCategoryWiseAverageRating(data))
  }, [])

  return (
    <>
      <main className="lg:w-[84%] h-screen lg:left-[16%] absolute overflow-y-auto overflow-x-hidden w-screen left-0 lg:pt-0 pt-35 lg:mt-0">
        <div className="w-full h-[4vw] border-b border-gray-600 lg:block hidden">
          <h1 className="text-center font-bold text-2xl py-5">Machine Test: Product's Ratings and Review Analytics Dashboard</h1>
        </div>
        <div className="p-10">
          <div className="flex justify-between lg:w-[80%] flex-wrap gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-[#0F172A] lg:w-[15vw] lg:h-[5vw] w-[46%] h-[30vw] border border-gray-600 rounded-md p-3 flex flex-col gap-2 items-start"
              >
                <h1 className="text-xl text-gray-400">{item.label}</h1>
                <h3 className="text-xl text-gray-200 text-wrap w-fit">{item.count}</h3>
              </div>
            ))}
          </div>

          <div className="w-full py-10 flex justify-between gap-5 flex-wrap">
            <RatingAnalysis title = {'Top Reviewed Products'} Data = {topReviewedProduct} xKey="product_name" yKey="rating_count"/>
            <RatingAnalysis title = {'Products per Category.'} Data = {productPerCategory}  xKey="category" yKey="product_count"/>
            <RatingAnalysis title = {'Discount Distribution.'} Data = {discountDistribution} xKey="discount_range" yKey="frequency" tick = {true} barCategoryGap={0}/>
            <RatingAnalysis title = {'Category-wise Average Rating'} Data = {categoryWiseAverageRating} xKey="category" yKey="average_rating"/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;


