import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Fade, Slide } from "react-awesome-reveal";
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 1 }
        },
        {
            breakpoint: 640,
            settings: { slidesToShow: 1 }
        }
        ]
    };
    const slides = [
    {
      img: "https://i.postimg.cc/bwQD9ZFh/Food-Grocery-Vegetables-1140771380-1080x675.jpg",
      title: "Store Your Goods",
      description: "Store your food with food tracking system and be notified.",
      link: "/events/spring-workshop"
    },
    {
      img: "https://i.postimg.cc/T1gWw0SZ/depositphotos-24762569-stock-photo-fast-food-hamburger-hot-dog.webp",
      title: "Various Types",
      description: "Store any sort of food and keep on tracking them.",
      link: "/events/urban-gardening"
    },
    {
      img: "https://i.postimg.cc/RhLVyD2V/Variety-fruits-vegetables.webp",
      title: "Groceries Fresh as Ever",
      description: "Keep your Grocies vegetables fresh.",
      link: "/events/composting-basics"
    }
  ];

    return (
        <div className="max-w-full mx-auto relative">
            <Slider {...settings}>
                {slides.map(({ img, title, description, link }, index) => (
                <div key={index} className="relative">
                    <img
                    src={img}
                    alt={title}
                    className="w-full h-[500px] object-cover brightness-75"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
                    <Fade>
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{title}</h2>
                    </Fade>
                    <Fade delay={1e3} cascade damping={1e-1}>
                        <p className="max-w-xl mb-6 drop-shadow-md font-medium">{description}</p>
                    </Fade>
                    <a
                        href={link}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow-lg transition"
                    >
                        Learn More
                    </a>
                    </div>
                </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;