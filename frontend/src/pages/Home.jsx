// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {

   const [products, setProducts] = useState([]);
   useEffect(() => {
      // destroy old instance if exists (important when navigating back)
      if ($(".hero-slider").hasClass("owl-loaded")) {
         $(".hero-slider").trigger("destroy.owl.carousel");
         $(".hero-slider")
            .html($(".hero-slider").find(".owl-stage-outer").html())
            .removeClass("owl-loaded");
      }
      const fetchProducts = async () => {
         try {
            const res = await axios.get("http://127.0.0.1:8000/api/products/random");
            setProducts(res.data); // assuming API returns an array of products
         } catch (err) {
            console.error("Error fetching products:", err);
         }
      };
      fetchProducts();
      // initialize OwlCarousel
      $(".hero-slider").owlCarousel({
         animateOut: "slideOutUp",
         animateIn: "slideDown",
         items: 1,
         loop: true,
         nav: true,
         dots: true,
         autoplay: true,
         autoplayTimeout: 5000,
         autoplayHoverPause: true,
         navigation: true,
      });
   }, []); // runs once on mount
   return (
      <main>
         <section className="banner">
            <div id="home" className="hero-slider owl-carousel owl-theme">
               <div className="single-hs-item">
                  <img src="/images/banners/homepage-banner-slide-01.jpg" alt="" />
                  <div className="d-table">
                     <div className="d-tablecell">
                        <div className="hero-text">
                           <h1>Bake it Good, Pack it even Better</h1>
                           <div className="slider-btn"> <a href="/products" className="custom-btn1">View All Products »</a> </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="single-hs-item">
                  <img src="/images/banners/homepage-banner-slide-02.jpg" alt="" />
                  <div className="d-table">
                     <div className="d-tablecell">
                        <div className="hero-text">
                           <h1>The Big Bake Theory and More…</h1>
                           <div className="slider-btn"> <a href="#" className="custom-btn1 mr-30">View All Products »</a> </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="single-hs-item">
                  <img src="/images/banners/homepage-banner-slide-03.jpg" alt="" />
                  <div className="d-table">
                     <div className="d-tablecell">
                        <div className="hero-text">
                           <h1> Your Dreams, Our Ingredients</h1>
                           <div className="slider-btn"> <a href="#" className="custom-btn1 mr-30">View All Products »</a> </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="qualityStocksBadge">
            <div className="container">
               <div className="tagLineBanner text-uppercase"><span><img src="/images/icons/qualityicon.png" alt="" /></span>OVER 5,000 QUALITY INGREDIENTS IN STOCK</div>
            </div>
         </section>
         <section className="aboutInfo contentContainer">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <h2 className="text-center">What’s Ingredients Express All About</h2>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-12 col-lg-5">
                     <div className="aboutImage"><img src="/images/about-image.jpg" alt="" className="imgResponsive" /></div>
                  </div>
                  <div className="col-md-12 col-lg-7">
                     <div className="aboutInfoSection">
                        <p>We make your food yummy! We are your all-inclusive store for baking and cooking ingredients. Not only this, we also deal in tools &amp; equipment and paper &amp; packaging for your food. We are wholesale dealers of spices, herbs, seeds, seasonings, flavors, canned fruits &amp; veggies, flours, dairy products etc. </p>
                        <p>Apart from this we make our customers happy by ensuring quality service anytime and every time. From a small bakery down the street to a full-fledged restaurant, Ingredients Express caters to all business types with responsibility and efficiency. </p>
                        <a href="https://ingredientsexpress.com/pages/about-us" className="custom-btn1 custom-btn2">KNOW MORE »</a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="collectionItems contentContainer">
            <div className="page-width">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <h2 className="text-center text-white">Products</h2>
                     </div>
                  </div>
                  <div className="row">
                     {products.length > 0 ? (
                        products.map((product) => (
                           <div
                              key={product.id}
                              className="col-lg-3 col-md-6 col-sm-6 d-flex"
                           >
                              <Link to={`/product/${product.id}`} className="productBox">
                                 <div className="productImage img-hover-zoom">
                                    <img
                                       src={`http://127.0.0.1:8000/img/products/${product.images?.[0]?.image || "noimage.png"}`}
                                       alt={product.title}
                                       className="imgResponsive"
                                    />
                                 </div>
                                 <div className="productInfo">
                                    <h5 className="productName">{product.title}</h5>
                                    <div className="productPrice">${product.doubled_price}</div>
                                 </div>
                              </Link>
                           </div>
                        ))
                     ) : (
                        <p className="text-center text-white">Loading products...</p>
                     )}
                  </div>
                  <div className="row text-center">
                     <div className="col-12">
                        <Link to="/products" className="custom-btn1 custom-btn2 marginTop16">
                           View ALL Products »
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="servicesInfo background01 contentContainer text-center text-white">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <h2 className="text-white">Our Best Services</h2>
                     <p>Are you looking for best ingredients which can make you food delicious and want to shop online? If so, you’ve come to the right place! Ingredients express of USA have been a best ingredients company and we will help you to make your food more and more testy. We have more than 200 products which we are selling online with 100% customer satisfaction. If you need more information about our products and about us please sent us an email at <a href="mailto:info@ingredientsexpress.com" className="text-white text-decoration-underline">info @ingredientsexpress.com</a> . We're here to serve you!</p>
                     <Link to="#" className="custom-btn1 custom-btn2 marginTop16">KNOW MORE »</Link>
                  </div>
               </div>
            </div>
         </section>
         <section className="getStartedInfo background02 contentContainer">
            <div className="container">
               <div className="row">
                  <div className="col-lg-6 col-md-8 col-sm-12">
                     <div className="getStartedInfoBlock">
                        <h2 className="text-center">How To Get Started</h2>
                        <p>Cruise through our online store to find rightly categorized ingredients and tools to spice up your cooking and beautify your baking. Cart-in your favorite cookie dough and select those colorful ribbons to wrap your cupcakes in from a huge variety of 5000+ products. All your kitchen needs under one roof is what we are about, be it the basic ingredient that you need in bulk or the absolute rare decorative tool you’ve been looking for since the beginning of times!</p>
                        <p>Feel free to drop an email at <a href="mailto:info@ingredientsexpress.com">info @ingredientsexpress.com</a> and we will help you with your order. We aren’t just about selling ingredients only, developing a strong clientele through prompt service and substantial assistance is what we aim for. </p>
                        <Link to="#" className="custom-btn1 custom-btn2 marginTop16">KNOW MORE »</Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-md-4 col-sm-4 col-12 noPadding">
                     <div className="infoBlocks img-hover-zoom--brightness">
                        <img src="/images/ourstory.jpg" alt="" className="opacityImage imgResponsive" />
                        <h3 className="text-center"><Link to="/about-us">About US</Link></h3>
                     </div>
                  </div>
                  <div className="col-md-4 col-sm-4 col-12 noPadding padding1">
                     <div className="infoBlocks img-hover-zoom--brightness">
                        <img src="/images/sustainability.jpg" alt="" className="opacityImage imgResponsive" />
                        <h3 className="text-center"><Link to="/sustainability">Sustainability</Link></h3>
                     </div>
                  </div>
                  <div className="col-md-4 col-sm-4 col-12 noPadding padding1">
                     <div className="infoBlocks img-hover-zoom--brightness">
                        <img src="/images/qa.jpg" alt="" className="opacityImage imgResponsive" />
                        <h3 className="text-center"><Link to="/quality-assurance">Quality Assurance</Link></h3>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="ourClients background04 contentContainer text-center">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <h2>Our Clients</h2>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                     <img src="/images/client-logo/client-logo-10.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-09.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-01.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-08.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-02.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-07.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-04.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-06.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-05.jpg" alt="" className="clientLogo" />
                     <img src="/images/client-logo/client-logo-03.jpg" alt="" className="clientLogo" />
                  </div>
               </div>
            </div>
         </section>
         <section className="newsletterBox">
            <div className="container">
               <div className="row">
                  <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 text-right">
                     <div className="newsTextInfo">Let’s Bake Something Great Together! Know What’s Going On..</div>
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 text-center">
                     <div className="newsletterEmailBox">
                        <form method="post" action="/contact#contact_form" id="contact_form" accept-charset="UTF-8" className="contact-form">
                           <input type="hidden" name="form_type" value="customer" />
                           <input type="hidden" name="utf8" value="✓" />
                           <input type="hidden" name="contact[tags]" value="newsletter" />
                           <input type="email" value="" placeholder="Your email" name="contact[email]" id="NewsletterEmail-" className="newsLetterInput" autocorrect="off" autocapitalize="off" />
                           <button type="submit" className="newsLetterSignup" name="commit">
                              Sign Up
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}
export default Home;