import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ingredientExpressLogo from '../assets/logo.png';

const Footer = () => {
  
  return (
    <>
            {/* Footer */}
      <footer className="contentContainer">
       <div className="container">
          <div className="row">
             <div className="col-lg-3 col-md-6">
                <div className="footerLogo">
                   <Link to="/"><img src={ingredientExpressLogo} alt="Footer Logo" className="imgResponsive" /></Link>
                </div>
                <div className="socialMediaIcon">
                   <a className="socialIcon faceBookIcon" href="https://www.facebook.com/" title="Ingredients Express on Facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                   </a>
                   <a className="socialIcon twitterIcon" href="https://twitter.com/" title="Ingredients Express on Twitter">
                    <i className="fa-brands fa-twitter"></i>
                   </a>
                   <a className="socialIcon pInterestIcon" href="https://www.pinterest.com/" title="Ingredients Express on Pinterest">
                    <i className="fa-brands fa-pinterest"></i>
                   </a>
                   <a className="socialIcon instaIcon" href="https://www.instagram.com/?hl=en" title="Ingredients Express on Instagram">
                    <i className="fa-brands fa-instagram"></i>
                   </a>
                </div>
             </div>
             <div className="col-lg-4 col-md-6">
                <div className="footerColumn">
                   <h4>Contact us</h4>
                   <address>
                      <div className="clearfix">
                         <span className="iconSec">
                         <i className="fa-solid fa-location-dot"></i>
                         </span> 
                         <span className="infoContactFooter">Address : P.O.BOX 188, <br/> Milltown, New Jersey 08850 </span>
                      </div>
                      <div className="clearfix">
                         <span className="iconSec">
                         <i className="fa fa-envelope iconSecMessage" aria-hidden="true"></i></span> 
                         <span className="infoContactFooter infoContactFooterEmail">Email : <a href="#">support@ingredientsexpress.com</a></span>
                      </div>
                   </address>
                </div>
             </div>
             <div className="col-lg-5">
                <div className="row">
                <div className="col-md-6">
                   <div className="footerColumn">
                      <h4>Our Company</h4>
                      <ul className="footerNav">
                         <li className="site-footer__list-item"><Link to="/about-us">About us</Link></li>
                         <li className="site-footer__list-item"><Link to="/sustainability">Sustainability</Link></li>
                         <li className="site-footer__list-item"><Link to="/quality-assurance">Quality Assurance</Link></li>
                      </ul>
                   </div>
                </div>
                <div className="col-md-6">
                   <div className="footerColumn">
                      <h4>Policies</h4>
                      <ul className="footerNav">
                         <li className="site-footer__list-item"><Link to="/privacy-policy">Privacy Policy</Link></li>
                         <li className="site-footer__list-item"><Link to="/return-policy">Return Policy</Link></li>
                         <li className="site-footer__list-item"><Link to="/contact-us">Contact Us</Link></li>
                      </ul>
                   </div>
                </div>
                </div>
             </div>
          </div>
       </div>
       <div className="copyRight">
          <div className="container">
             <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12"> Copyright © 2019 INGREDIENTS EXPRESS. </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                   <div className="paymentAccept">
                      <img src="/images/icons/american.jpg" alt="American Express" /> 
                      <img src="/images/icons/applepay.jpg" alt="Apple Pay" />
                      <img src="/images/icons/dinnerclub.jpg" alt="Dinner Club" />
                      <img src="/images/icons/discover.jpg" alt="Discover" /> 
                      <img src="/images/icons/jcb.jpg" alt="JCB" />
                      <img src="/images/icons/mastercard.jpg" alt="mastercard" /> 
                      <img src="/images/icons/paypal.jpg" alt="Paypal" />
                      <img src="/images/icons/visacard.jpg" alt="Visacard" />
                   </div>
                </div>
             </div>
          </div>
       </div>
    </footer>
    </>
  );
}

export default Footer;
