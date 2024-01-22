import React, { useState, useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.modules.css'

export default function Carrousel() {

    const { products, iTotalRecords } = useProducts();

    if (!products && !iTotalRecords) return <h2>Cargando</h2>;

    const [prevSlide, setPrevSlide] = useState(iTotalRecords -1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [postSlide, setPostSlide] = useState(1);

    /* console.log('prevSlide', prevSlide);
    console.log('currentSlide', currentSlide);
    console.log('postSlide', postSlide); */
    /* useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => prevSlide + 1);
        }, 10000);
    
        return () => clearInterval(interval);
    }, [setCurrentSlide, products, iTotalRecords, loading]); */

    const slideLeft = () => {
        if (currentSlide - 1 === -1) {
            setCurrentSlide(iTotalRecords - 1);
            setPrevSlide((prevSlide) => (prevSlide - 1 + iTotalRecords) % iTotalRecords);
            setPostSlide((postSlide) => (postSlide - 1 + iTotalRecords) % iTotalRecords);
        } else {
            setCurrentSlide((currentSlide) => currentSlide - 1);
            setPrevSlide((prevSlide) => (prevSlide - 1 + iTotalRecords) % iTotalRecords);
            setPostSlide((postSlide) => (postSlide - 1 + iTotalRecords) % iTotalRecords);
        }
    };
    
    const slideRight = () => {
        if (currentSlide + 1 === iTotalRecords) {
            setCurrentSlide(0);
            setPrevSlide((prevSlide) => (prevSlide + 1) % iTotalRecords);
            setPostSlide((postSlide) => (postSlide + 1) % iTotalRecords);
        } else {
            setCurrentSlide((currentSlide) => currentSlide + 1);
            setPrevSlide((prevSlide) => (prevSlide + 1) % iTotalRecords);
            setPostSlide((postSlide) => (postSlide + 1) % iTotalRecords);
        }
    };
    return (
        <div className="slider-container">
            <div className="slider-content">
                <div className="slider-single preactive">
                    <img
                        className="slider-left slider-single-image"
                        src={`/images/articulos/${products[prevSlide].images[0].image}`}
                        alt="producto"
                    />
                </div>
                <a
                    className={`slider-single ${products[currentSlide] ? 'active' : ''}`}
                >
                    <a href={`/products/detail/${products[currentSlide].id}`}>
                        <img
                            className="slider-single-image"
                            src={`/images/articulos/${products[currentSlide].images[0].image}`}
                            alt="producto"
                        />
                        <h1 className="slider-single-title">{products[currentSlide].name}</h1>
                    </a>
                </a>
                <div className="slider-single proactive">
                    <img
                        className="slider-right slider-single-image"
                        src={`/images/articulos/${products[postSlide].images[0].image}`}
                        alt="producto"
                    />
                </div>
            </div>
            <a className="slider-left" onClick={slideLeft}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </a>
            <a className="slider-right" onClick={slideRight}>
                <FontAwesomeIcon icon={faArrowRight} />
            </a>
        </div>
    );
}