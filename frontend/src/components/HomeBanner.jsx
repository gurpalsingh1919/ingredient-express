import React, { useEffect } from "react";
import $ from "jquery";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MySlider = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  };

  return (
    <div id="homepage-slider" className="custom-slider"> {/* ✅ custom wrapper */}
      <OwlCarousel className="owl-theme" {...options}>
        <div className="item"><h4>Slide 1</h4></div>
        <div className="item"><h4>Slide 2</h4></div>
        <div className="item"><h4>Slide 3</h4></div>
      </OwlCarousel>
      asdasdadad
    </div>
  );
};

export default MySlider;