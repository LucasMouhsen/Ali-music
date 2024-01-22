import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Carousel = () => {

  const images = [
    'carrusel2.jpg',
    'asd.jpg',
    'banner_alimusic.png',
    'banner_alimusic3.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <FontAwesomeIcon className="arrow-button prev" icon={faArrowLeft} onClick={handlePrev}></FontAwesomeIcon>
      <div className="image-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={'/images/'+image}
            alt={`slide-${index}`}
            className={`carousel-image ${index === currentIndex ? 'visible' : 'hidden'}`}
          />
        ))}
      </div>
      <FontAwesomeIcon className="arrow-button next" icon={faArrowRight} onClick={handleNext}></FontAwesomeIcon>
    </div>
  );
};

export default Carousel;
