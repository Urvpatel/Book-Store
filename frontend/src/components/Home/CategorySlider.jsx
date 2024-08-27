import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/get-categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
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
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Explore Categories</h4>
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="p-4 flex flex-col items-center">
                        <div className="bg-zinc-800 p-4 rounded-lg text-center hover:bg-zinc-700 transition-all duration-300 w-full flex flex-col items-center">
                            {/* Display the image */}
                            <img 
                                src={category.imageUrl} 
                                alt={category.name} 
                                className="w-16 h-16 mb-4" 
                            />
                            <h5 className="text-xl font-semibold text-white mb-2">{category.name}</h5>
                            {/* {category.subcategories && category.subcategories.length > 0 && (
                                <ul className="text-zinc-400 text-sm">
                                    {category.subcategories.map((sub, i) => (
                                        <li key={i}>{sub.name}</li>
                                    ))}
                                </ul>
                            )} */}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategorySlider;
