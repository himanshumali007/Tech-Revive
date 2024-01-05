import React, { useEffect, useState } from "react";
import { Card,Button } from 'react-bootstrap';
import Slider from 'react-slick';
// import NavigationBar from "./NavigationBar";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './Categories.css'; // Custom styling
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 'AC',
      name: 'Air Conditioner',
      image: '/images/acc.jpg',
      details: 'Keep cool with our wide range of ACs.'
    },
    {
      id: 'MICROWAVE',
      name: 'Microwave',
      image: '/images/Microwave.jpg',
      details: 'Quick and convenient cooking with microwaves.'
    },
    {
      id: 'REFRIGERATOR',
      name: 'Refrigerator',
      image: '/images/fridge.jpg',
      details: 'Store your food and drinks in style.'
    },
    {
      id: 'LAPTOP',
      name: 'Laptop',
      image: '/images/lappy.jpg',
      details: 'Stay connected with powerful laptops.'
    },
    {
      id: 'PC',
      name: 'PC',
      image: '/images/pc.jpg',
      details: 'High-performance PCs for your needs.'
    },
    {
      id: 'WASHING_MACHINE',
      name: 'Washing Machine',
      image: '/images/wm.jpeg',
      details: 'Effortless laundry with advanced washing machines.'
    },
    {
      id: 'WATER_FILTER',
      name: 'Water Filter',
      image: '/images/filter.jpg',
      details: 'Clean and safe drinking water with our filters.'
    },
   
  ];

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);

  // const sliderSettings = {
  //   arrows: true, // Show side arrows
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2
  //       }
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 1
  //       }
  //     }
  //   ]
  // };

  const handleExploreClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`${categoryId}/service`);

  };

  // const handleExploreClick = (categoryId) => {
  //   console.log(`Explore clicked for category: ${categoryId}`);
  //   // You can perform actions based on the clicked category here
  // };

  return (
    <>      <div className="container categories-container">
        <h2 className="    text-center mb-4">Categories</h2>
        
        <div className="mt-4 row">
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 mb-4 text-center">
              <Card className="category-card">
                <Card.Img variant="top" src={category.image} />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>{category.details}</Card.Text>
                  <Link to={`/${category.id}/service`}></Link>
                  <Button
                    variant="primary"
                    onClick={() => handleExploreClick(category.id)}
                  >
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

