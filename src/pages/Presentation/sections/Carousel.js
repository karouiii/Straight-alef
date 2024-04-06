import React from "react";
import { Link } from "react-router-dom";
// react component for creating beautiful carousel
import Slider from "react-slick";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

import ExampleCard from "pages/Presentation/components/ExampleCard";

import data from "pages/Presentation/sections/data/pagesData";

const renderData = data.map(({ image, name, route }) => (
  <Grid container spacing={0.5} key={name}>
    <Grid item xs={12} md={6} sx={{ mb: { xs: 3, lg: 0 } }} key={name}>
      <Link to={route}>
        <ExampleCard image={image} name={name} display="grid" minHeight="auto" />
      </Link>
    </Grid>
  </Grid>
));

// Define custom arrow components
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "20px" }} // Customize the arrow style as needed
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "20px" }} // Customize the arrow style as needed
      onClick={onClick}
    />
  );
};

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default function SectionCarousel() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    prevArrow: <PrevArrow />, // Use custom PrevArrow component
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>{renderData}</Slider>
    </div>
  );
}
