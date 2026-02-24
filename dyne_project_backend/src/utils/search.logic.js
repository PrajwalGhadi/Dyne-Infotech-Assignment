function productSearch(query) {
  // Advancing Searching Technique in POSTGRESQL + NODE.js  --Note: Utilize my search logic  build for todo application

  // using req.query fetch the data from url - http://localhost/product/?search=chapter

  let {
    search = '',
    limit = 10,
    page = 1,
    sortBy = "product_id",
    orderBy = "ASC",
  } = query;

  
  // As everything comes in string format so coverting the inputs which need to be in number format
  limit = parseInt(limit);
  page = parseInt(page) <= 0 ? 1 : parseInt(page);
  let offSet = (page - 1) * limit; //1 - 1 * 10 = 0(show data from 0 index) or 2 - 1 * 10 = 10(show data from 10 index)
  
  let basedQuery = " WHERE 1=1";
  let values = [];
  
  //logic for search query
  if (search) {
    values.push(`%${search}%`);
    basedQuery += ` AND (product_id ILIKE $${values.length} OR product_name ILIKE $${values.length} OR category ILIKE $${values.length})`; // using 2 different column for searching
  }

  // refining the values of sortBy and orderBy
  // Created the array for allowedSorting Columns and allowed order to prevent from sql injection
  const allowedSorting = ["product_id", "product_name", "category"];
  const allowedOrder = ["ASC", "DESC"];
  
  // checking the values are passed correctly or not
  let finalSortBy = allowedSorting.includes(sortBy.toLowerCase())
  ? sortBy
  : "product_id";
  let finalOrderBy = allowedOrder.includes(orderBy.toUpperCase())
  ? orderBy
  : "ASC";
  
  let searchQuery = `SELECT * FROM amazon_products 
  ${basedQuery} ORDER BY ${finalSortBy} ${finalOrderBy} 
  LIMIT ${limit} OFFSET ${offSet}`; // 1=1 is to add the multiple conditions

  let countQuery = `SELECT count(*) FROM amazon_products ${basedQuery}`;
  

  console.log(searchQuery, countQuery, values, limit, page)
  
  return { searchQuery, countQuery, values, limit, page }
}

module.exports = productSearch;
