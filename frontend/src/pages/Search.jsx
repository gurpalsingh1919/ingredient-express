import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config"; // import dynamic base URL

const Search = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [query, setQuery] = useState("");
   const [totalMatches, setTotalMatches] = useState(0);

   const [searchParams, setSearchParams] = useSearchParams();
   const searchQuery = searchParams.get("query") || "";

   // Debounce helper
   const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
         if (timeoutId) clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
            func(...args);
         }, delay);
      };
   };

   const fetchProducts = useCallback(async (q) => {
      if (!q) {
         setProducts([]);
         setTotalMatches(0);
         return;
      }
      setLoading(true);
      try {
         const res = await axios.get(`${API_BASE_URL}/api/search-suggestions?q=${q}`); // dynamic API URL
         if (res.data.status) {
            setProducts(res.data.products || []);
            setTotalMatches(res.data.products?.length || 0);
         }
      } catch (err) {
         console.error(err);
         setProducts([]);
         setTotalMatches(0);
      } finally {
         setLoading(false);
      }
   }, []);

   // Debounced version of fetchProducts
   const debouncedFetch = useCallback(debounce(fetchProducts, 500), [fetchProducts]);

   // Update query when URL param changes
   useEffect(() => {
      setQuery(searchQuery);
      if (searchQuery) debouncedFetch(searchQuery);
   }, [searchQuery, debouncedFetch]);

   // Live search as user types
   useEffect(() => {
      debouncedFetch(query);
      setSearchParams({ query });
   }, [query, debouncedFetch, setSearchParams]);

   return (
      <section className="contentContainer contentInfo text-center">
         <div className="container">
            <div className="row">
               <div className="col-md-12 mx-auto">
                  <h2>Search Results</h2>

                  {/* Search Box */}
                  <div className="search-container d-flex searchHeader justify-content-center" id="searchBox">
                     <input
                        type="text"
                        className="form-control w-50 mb-3"
                        placeholder="Search all products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                     />
                  </div>

                  {/* Total Matches */}
                  {!loading && query && (
                     <p>
                        <strong>
                           {totalMatches} match{totalMatches !== 1 ? "es" : ""} for {query}
                        </strong>
                     </p>
                  )}
               </div>
            </div>

            {/* Products Listing */}
            <div className="searchListing mt-5">
               <div className="row">
                  {loading ? (
                     <p>Loading products...</p>
                  ) : products.length > 0 ? (
                     products.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 d-flex mb-4">
                           <Link to="#" className="productBox">
                              <div className="productImage img-hover-zoom">
                                 <img
                                    className="imgResponsive"
                                    src={
                                       product.images?.length > 0
                                          ? `${API_BASE_URL}/img/products/${product.images[0].image}` // dynamic image URL
                                          : `${API_BASE_URL}/img/categories/noimage.png` // dynamic fallback
                                    }
                                    alt={product.title}
                                 />
                              </div>
                              <div className="productInfo">
                                 <h5 className="productName">{product.title}</h5>
                                 {product.doubled_price && (
                                    <div className="productPrice">${product.doubled_price}</div>
                                 )}
                              </div>
                           </Link>
                        </div>
                     ))
                  ) : (
                     <p className="text-muted">No products found.</p>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Search;
