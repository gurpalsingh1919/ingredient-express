import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config"; // ✅ Import API_BASE_URL

const slugify = (text) =>
  text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch categories dynamically
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/categories`) // ✅ Dynamic URL
      .then((res) => {
        if (res.data.status) setCategories(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) setQuery("");
  };

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  const fetchResults = useCallback(async (q) => {
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/search-suggestions?q=${q}`); // ✅ Dynamic URL
      if (res.data.status) setResults(res.data.products || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => fetchResults(query), 300);
    return () => clearTimeout(debounce);
  }, [query, fetchResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search-products?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <Link to="/ingredients" className="nav-link">Ingredients</Link>
              <span className="icon">
                <i className="fa-solid fa-chevron-down dropdown-icon"></i>
              </span>
              <ul className="subMenu">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link to={`/ingredient/${slugify(cat.name)}`} state={{ id: cat.id }}>
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No categories found</li>
                )}
              </ul>
            </li>

            {/* Other Links */}
            <li className="nav-item"><Link to="/products" className="nav-link">Gluten Free</Link></li>
            <li className="nav-item"><Link to="/products" className="nav-link">Organic & Non-GMO</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/my-account" className="nav-link">My Account</Link></li>

            {/* Search */}
            <li className="nav-item">
              <div className="search-container-mobile d-flex position-relative">
                {showSearch ? (
                  <form onSubmit={handleSubmit} className="d-flex w-100 flex-column">
                    <div className="d-flex">
                      <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <button type="submit" className="search-btn">
                        <i className="fas fa-search"></i>
                      </button>
                      <button type="button" className="btn-close ms-2" onClick={toggleSearch}></button>
                    </div>

                    {query && (
                      <div className="search-results-dropdown position-absolute bg-white shadow p-2 mt-1 w-100">
                        {loading ? (
                          <p>Loading...</p>
                        ) : results.length > 0 ? (
                          results.map((product) => (
                            <div
                              key={product.id}
                              className="search-result-item p-2 border-bottom"
                              onClick={() => navigate(`/product/${product.id}`)}
                              style={{ cursor: "pointer" }}
                            >
                              {product.title}
                            </div>
                          ))
                        ) : (
                          <p className="text-muted p-2">No results found</p>
                        )}
                      </div>
                    )}
                  </form>
                ) : (
                  <button type="button" className="search-btn" onClick={toggleSearch}>
                    <i className="fas fa-search"></i>
                  </button>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
