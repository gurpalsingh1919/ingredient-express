import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Header */}
      
      <header id="header">
        <div className="container">
          <div className="topBar d-flex justify-content-between">
            <a className="navbar-brand" href="/"><img src="/images/logo.png" alt="" className="header-logo" /></a>
            <div className="d-flex align-items-center topIcons">
              <div className="search-container d-flex" id="searchBox">
                <button className="search-btn" id="searchBtn"><i className="fas fa-search"></i></button>
                <input type="text" className="search-input" id="searchInput" placeholder="Search..." />
              </div>
              <div className="cartButton">
                <button className="cart-btn" id="cartBtn">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="badge" id="cartBadge">3</span>
                </button>
              </div>
              <div className="myAccount positionRelative">
                <a href="#" className="myAccount-btn" id="accountIcon" title="My Account">
                  <i className="fas fa-user"></i>
                </a>
                <div id="myAccountdropdownMenu" class="myAccountdropdown">
                  <a href="#"><i class="fas fa-user"></i>My Profile</a>
                  <a href="#"><i class="fas fa-cog"></i>Settings</a>
                  <a href="#"><i class="fas fa-box"></i>Orders</a>
                  <a href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link" href="#">Ingredients</a>
                  <span className="icon"><i className="fa-solid fa-chevron-down dropdown-icon"></i></span>
                  <ul className="subMenu">
                    <li><a href="#">Acidulants</a></li>
                    <li><a href="#">Flours</a></li>
                    <li><a href="#">Frozen & Dairy</a></li>
                    <li><a href="#">Gelato, Ice Cream & Sorbet</a></li>
                  </ul>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">Gluten Free</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Organic & Non-GMO</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Equipments & Tools</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Paper & Packaging </a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      {children}


    </>
  );
}

export default Layout;
