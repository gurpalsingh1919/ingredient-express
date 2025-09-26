import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config"; // dynamic base URL

const SubCategoryProducts = () => {
    const { slug } = useParams();
    const location = useLocation();
    const { id, name } = location.state || {};

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("title-ascending");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    useEffect(() => {
        if (id) {
            axios
                .get(`${API_BASE_URL}/api/subcategory/${id}/products`) // dynamic API URL
                .then((res) => {
                    if (res.data.status) {
                        setProducts(res.data.products || []);
                    }
                })
                .catch((err) => console.error("Error fetching products:", err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (!id) return <p>No subcategory selected.</p>;
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

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const getPageNumbers = () => {
        const delta = 2;
        let range = [];
        for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <main>
            {/* Banner */}
            <section className="innerBanner">
                <div className="container">
                    <h1>{name || "Products"}</h1>
                </div>
            </section>

            {/* Sort & Filter */}
            <section className="contentContainer prodCatList">
                <div className="container">
                    <div className="row mb-3">
                        <div className="filterSelect d-flex align-items-center justify-content-end w-100">
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
                            currentProducts.map((prod) => {
                                const imageUrl =
                                    prod.images && prod.images.length > 0
                                        ? `${API_BASE_URL}/img/products/${prod.images[0].image}` // dynamic image URL
                                        : `${API_BASE_URL}/img/categories/noimage.png`; // dynamic fallback

                                return (
                                    <div key={prod.id} className="col-lg-3 col-md-4 col-sm-6 d-flex mb-4">
                                        <Link to={`/product/${prod.id}`} state={{ id: prod.id }} className="productBox catBox">
                                            <div className="productImage img-hover-zoom">
                                                <img className="imgResponsive" src={imageUrl} alt={prod.title} />
                                            </div>
                                            <div className="productInfo">
                                                <h5 className="productName">{prod.title}</h5>
                                                {prod.doubled_price && <div className="productPrice">${prod.doubled_price}</div>}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center w-100">No products found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
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
                    )}
                </div>
            </section>
        </main>
    );
};

export default SubCategoryProducts;
