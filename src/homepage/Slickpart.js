import React, { Component } from "react";
import Slider from "react-slick";

export default class Slickpart extends Component {
  render() {
    const settings = {
      dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 1000,
  arrows:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
       
      }
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
  }
  ]
    };
    return (
      <div>
        
        <Slider {...settings}>
          <div class="first"><img src="img/files/1549610218066IMG_4578.jpg" alt="Owl Image"></img></div>
          <div class="first"><img src="img/files/1549610236683IMG_4582.jpg" alt="Owl Image"></img></div>
          <div class="first"><img src="img/files/1549610249814IMG_4570.jpg" alt="Owl Image"></img></div>
          <div class="first"><img src="img/files/1549610218066IMG_4578.jpg" alt="Owl Image"></img></div>
          <div class="first"><img src="img/files/1549610236683IMG_4582.jpg" alt="Owl Image"></img></div>
          <div class="first"><img src="img/files/1549610249814IMG_4570.jpg" alt="Owl Image"></img></div>
          
        </Slider>
      </div>
    );
  }
}