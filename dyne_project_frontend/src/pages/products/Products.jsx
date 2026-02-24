import React, { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

const Products = () => {
  const [productData, setProductData] = useState();

  // Creating the variables for searching, sorting, limit and pagination
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("product_id");
  const [orderBy, setOrderBy] = useState("ASC");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const sortFilter = ["product_name", "category", "product_id"];
  const [sortButtonToggle, setSortButtonToggle] = useState(false);

  const limitList = [10, 20, 50];
  const [limitButtonToggle, setLimitButtonToggle] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetch(
      `${API_BASE_URL}/products/getSearchedProducts/?search=${search || ""}&limit=${limit || 10}&page=${page || 1}&sortBy=${sortBy || "product_id"}&orderBy=${orderBy || "ASC"}`,
    )
      .then((resp) => resp.json())
      .then((data) => setProductData(data));
  }, [search, limit, page, sortBy, orderBy]);

  return (
    <section className="lg:w-[84%] h-screen lg:left-[16%] overflow-y-auto overflow-x-hidden w-screen left-0 lg:px-10 relative lg:mt-0 space-y-10">
      <div className=" px-4 py-4 lg:w-[79.5%] z-9 flex flex-col gap-5 bg-[#101921] fixed lg:py-10">
        <div className="full">
          <h1 className="text-2xl font-bold">Product Inventory Data</h1>
          <p className="text-xl font-extralight text-gray-400">
            Manage and view detailed product performance metrics
          </p>
        </div>

        <div className="w-full flex justify-between flex-wrap lg:flex-nowrap lg:gap-2 gap-4">
          {/* Input Button */}
          <input
            type="text"
            placeholder={`Search by Product Name, ID's or Categories`}
            className="border border-gray-400 rounded-md p-3 w-full lg:w-[50%] outline-none focus:border-blue-300"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <div className="flex lg:justify-start justify-between lg:w-[30%] w-1/2">
            {/* Filter Button on the basis of product_id, category and id */}
            <div className="w-[25%] lg:w-[35%] flex justify-items-start relative select-none">
              <IoFilter
                className="text-3xl lg:text-5xl "
                onClick={() => setSortButtonToggle((prev) => !prev)}
              />
              {sortButtonToggle ? (
                <div className="absolute bg-gray-200 w-fit lg:w-[8vw] min-h-[5vw] top-10 flex flex-col gap-3 rounded-lg p-2">
                  {sortFilter.map((item, index) => (
                    <p
                      key={index}
                      className={`${sortBy === item ? "text-red-400 border-b-2" : "text-black"} pb-1 rounded-b-lg px-2 cursor-p`}
                      onClick={() => {
                        setSortBy(item);
                        setSortButtonToggle((prev) => !prev)
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Filter based on limit */}
            <div className="w-[25%] lg:w-[35%] flex justify-items-start relative select-none">
              <div className="lg:w-[3.5vw] lg:h-[2vw] h-[10vw] bg-white text-black flex items-center p-2 text-xl rounded-lg">
                <p>{limit}</p>{" "}
                <RiArrowDropDownLine
                  className="text-2xl lg:text-4xl"
                  onClick={() => setLimitButtonToggle((prev) => !prev)}
                />
              </div>
              {limitButtonToggle ? (
                <div className="absolute bg-gray-200 w-[20vw] lg:w-[8vw] min-h-[5vw] top-10 flex flex-col gap-3 rounded-lg p-2">
                  {limitList.map((item, index) => (
                    <p
                      key={index}
                      className={`${limit === item ? "text-red-400 border-b-2" : "text-black"} pb-1 rounded-b-lg px-2 cursor-p`}
                      onClick={() => {
                        setLimit(item);
                        setLimitButtonToggle((prev) => !prev)
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <button className="w-[35%] lg:w-fit p-4 rounded-md bg-[#2563EB] flex justify-between items-center gap-1">
            <MdOutlineFileDownload className="text-2xl" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Below AI written code to create the tabular structure like excel sheet on website quickly */}

      <div class="flex flex-col md:grid md:grid-cols-[120px_720px_120px_120px_150px_148px_120px] bg-gray-50 md:bg-white rounded-lg border border-gray-200 relative lg:top-65 top-70 overflow-auto">
        <div class="hidden md:contents font-semibold text-gray-600 uppercase text-xs fixed">
          <div class="p-4 bg-gray-100 border-b rounded-tl-lg">ID</div>
          <div class="p-4 bg-gray-100 border-b">Product Name</div>
          <div class="p-4 bg-gray-100 border-b">Category</div>
          <div class="p-4 bg-gray-100 border-b">Actual</div>
          <div class="p-4 bg-gray-100 border-b">Discount</div>
          <div class="p-4 bg-gray-100 border-b">Rating</div>
          <div class="p-4 bg-gray-100 border-b rounded-tr-lg">Action</div>
        </div>

        {productData &&
          productData.data.map((item) => (
            <div class="flex flex-col m-3 p-4 bg-white border rounded-xl shadow-sm md:m-0 md:p-0 md:border-none md:shadow-none md:contents group">
              <div class="flex justify-between md:block p-2 md:p-4 border-b md:border-gray-100 md:group-hover:bg-blue-50">
                <span class="md:hidden font-bold text-gray-400">ID</span>
                <span class="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-mono">
                  {item.product_id}
                </span>
              </div>

              <div class="py-3 md:p-4 font-medium text-gray-800 md:border-b md:border-gray-100 md:group-hover:bg-blue-50">
                {item.product_name}
              </div>

              <div class="flex justify-between md:block py-2 md:p-4 border-b md:border-gray-100 md:group-hover:bg-blue-50">
                <span class="md:hidden text-gray-500">Category</span>
                {/* <span class="text-sm text-gray-600">{item.category}</span> */}
              </div>

              <div class="flex justify-between md:block py-2 md:p-4 border-b md:border-gray-100 md:group-hover:bg-blue-50">
                <span class="md:hidden text-gray-500">Price (Actual)</span>
                <span class="text-sm text-gray-400 line-through">
                  {item.actual_price.substring(1)}
                </span>
              </div>

              <div class="flex justify-between items-center md:block py-2 md:p-4 border-b md:border-gray-100 md:group-hover:bg-blue-50">
                <span class="md:hidden text-gray-500">Discounted</span>
                <div class="flex items-center gap-2 md:flex-col md:items-center lg:flex-row">
                  <span class="text-green-600 font-bold text-xs">
                    {item.discount_percentage} OFF
                  </span>
                  <span class="font-bold text-gray-900">
                    {item.discounted_price.substring(1)}
                  </span>
                </div>
              </div>

              <div class="flex justify-between gap-2 items-center w-fit md:block py-2 md:p-4 border-b md:border-gray-100 md:group-hover:bg-blue-50">
                <span class="md:hidden text-gray-500">Rating</span>
                <span class="text-sm text-black bg-gray-100 px-2 py-1 flex gap-2">
                  ⭐ {item.rating}{" "}
                  <span class="text-gray-400">({item.rating_count})</span>
                </span>
              </div>

              <div class="flex justify-center md:block py-3 md:py-4 md:border-b md:border-gray-100 md:group-hover:bg-blue-50">
                <button class="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                  <span>Quick View</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Products;
