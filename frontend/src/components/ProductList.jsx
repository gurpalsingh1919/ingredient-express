import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/img/products/";

function ProductList() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [sortBy, setSortBy] = useState("title-ascending");
   const [currentPage, setCurrentPage] = useState(1);
   const productsPerPage = 20;

   useEffect(() => {
      axios
         .get("http://127.0.0.1:8000/api/all-products")
         .then((res) => {
            if (res.data.status) {
               setProducts(res.data.products);
            }
         })
         .catch((err) => console.error("Error fetching products:", err))
         .finally(() => setLoading(false));
   }, []);

   if (loading) return <p>Loading products...</p>;

   // Sorting
   const sortedProducts = [...products].sort((a, b) => {
      switch (sortBy) {
         case "title-ascending":
            return a.title.localeCompare(b.title);
         case "title-descending":
            return b.title.localeCompare(a.title);
         case "price-ascending":
            return (a.doubled_price || 0) - (b.doubled_price || 0);
         case "price-descending":
            return (b.doubled_price || 0) - (a.doubled_price || 0);
         default:
            return 0;
      }
   });

   // Pagination logic
   const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

   // Get a small range of page numbers (e.g., 5 pages around current)
   const getPageNumbers = () => {
      const delta = 2; // pages before/after current
      let range = [];
      for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
         range.push(i);
      }
      return range;
   };

   return (
      <>
         {/* Sort & Filter */}
         <div className="row mb-3">
            <div className="filterSelect d-flex align-items-center justify-content-end">
               <label htmlFor="SortBy" className="mr-2">Sort by</label>
               <select
                  name="SortBy"
                  id="SortBy"
                  className="SortBy w-auto"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
               >
                  <option value="title-ascending">Alphabetically, A-Z</option>
                  <option value="title-descending">Alphabetically, Z-A</option>
                  <option value="price-ascending">Price, low to high</option>
                  <option value="price-descending">Price, high to low</option>
               </select>
            </div>
         </div>

         {/* Products Grid */}
         <div className="row">
            {currentProducts.length > 0 ? (
               currentProducts.map((product) => (
                  <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 d-flex mb-4">
                     <Link to={`/product/${product.id}`} className="productBox">
                        <div className="productImage img-hover-zoom">
                           <img
                              className="imgResponsive"
                              src={
                                 product.images?.length > 0
                                    ? `${BASE_URL}${product.images[0].image}`
                                    : "http://127.0.0.1:8000/img/categories/noimage.png"
                              }
                              alt={product.title}
                           />
                        </div>
                        <div className="productInfo">
                           <h5 className="productName">{product.title}</h5>
                           {product.doubled_price && <div className="productPrice">${product.doubled_price}</div>}
                        </div>
                     </Link>
                  </div>
               ))
            ) : (
               <p>No products found.</p>
            )}
         </div>

         {/* Beautiful Pagination */}
         <nav>
            <ul className="pagination justify-content-center">
               <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={prevPage}
                  style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
               >
                  <span className="page-link">Prev</span>
               </li>

               {getPageNumbers().map((num) => (
                  <li
                     key={num}
                     className={`page-item ${currentPage === num ? "active" : ""}`}
                     onClick={() => paginate(num)}
                     style={{ cursor: "pointer" }}
                  >
                     <span className="page-link">{num}</span>
                  </li>
               ))}

               <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={nextPage}
                  style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
               >
                  <span className="page-link">Next</span>
               </li>
            </ul>
         </nav>
      </>
   );
}

export default ProductList;
