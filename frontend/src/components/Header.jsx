import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ingredientExpressLogo from "../assets/logo.png";
import Swal from "sweetalert2";
import axios from "axios";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCart = async () => {
    if (!authToken) {
      setCartCount(0); // ✅ reset to 0 if not logged in
      return;
    }
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cart", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCartCount(res.data.count || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("auth_token"));
    setUser(JSON.parse(localStorage.getItem("user")));
    fetchCart();
  }, [location, authToken]); // ✅ correct dependency array

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setCartCount(0); // ✅ reset cart count on logout

    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have been successfully logged out.",
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/login");
  };

  return (
    <header id="header">
      <div className="container">
        <div className="topBar d-flex justify-content-between">
          <a className="navbar-brand" href="/">
            <img src={ingredientExpressLogo} alt="logo" className="header-logo" />
          </a>
          <div className="d-flex align-items-center topIcons">
            {/* Search */}
            <div className="search-container d-flex" id="searchBox">
              <button className="search-btn" id="searchBtn">
                <i className="fas fa-search"></i>
              </button>
              <input
                type="text"
                className="search-input"
                id="searchInput"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              />
            </div>

            {/* Cart */}
            <div className="cartButton">
              <Link to="/shopping-cart" className="cart-btn">
                <i className="fas fa-shopping-cart"></i>
                <span className="badge">{cartCount}</span>
              </Link>
            </div>

            {/* Account */}
            <div className="myAccount positionRelative">
              <a href="#" className="myAccount-btn" id="accountIcon" title="My Account">
                <i className="fas fa-user"></i>
              </a>
              <div id="myAccountdropdownMenu" className="myAccountdropdown">
                {!authToken ? (
                  <>
                    <Link to="/login"><i className="fas fa-lock"></i> Login</Link>
                    <Link to="/register"><i className="fas fa-user"></i> Register</Link>
                  </>
                ) : (
                  <>
                    <Link to="/my-account"><i className="fas fa-user"></i> {user?.name || "My Profile"}</Link>
                    <a href="#logout" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
