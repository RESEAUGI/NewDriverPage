import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUsers, faSuitcase, faCogs, faFan } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const photos = [
  { src: '/img/devantVoiture.png', alt: 'Photo 1' },
  { src: '/img/derriereVoiture.png', alt: 'Photo 2' },
  { src: '/img/latteralVoiture.png', alt: 'Photo 3' },
  { src: '/img/interieurVoiture.png', alt: 'Photo 4' },
];

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        fontSize: '3em',
        right:'20px',
        zIndex: 1,
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
       }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(5px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
    >
      <FontAwesomeIcon icon={faChevronRight} size="1x" />
    </div>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        fontSize: '3em',
        left:'10px',
        zIndex: 1,
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-5px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
    >
      <FontAwesomeIcon icon={faChevronLeft} size="1x" />
    </div>
  );
};

const CarDetails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} className="slide-container" >
            <img src={photo.src} alt={photo.alt} className="slide" />
          </div>
        ))}
      </Slider>
      <div className="details" >
        <p className="title">Détails sur le véhicule</p>
        <div className="description">
          <div className="left-column">
            <div className="description-item">
              <FontAwesomeIcon icon={faUsers} size="2x" />
              <div className="description-text">
                <span className="description-value">4 places</span>
              </div>
            </div>
            <div className="description-item">
              <FontAwesomeIcon icon={faSuitcase} size="2x" />
              <div className="description-text">
                <span className="description-value">10 Kg</span>
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="description-item">
              <FontAwesomeIcon icon={faCogs} size="2x" />
              <div className="description-text">
                <span className="description-value">Automatique</span>
              </div>
            </div>
            <div className="description-item">
              <FontAwesomeIcon icon={faFan} size="2x" />
              <div className="description-text">
                <span className="description-value">Climatisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slide-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          overflow: hidden;
        }

        .slide {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          border-radius: 20px;
          margin: auto;
        }
        
        .details {
          margin-top: 30px;
          padding: 10px;
          text-align: center;
          font-size: 25px;
          background-color: #f5f5f5;
          border-radius: 10px;
          position: relative;
        }

        .description {
          padding: 5px;
          text-align: center;
          font-size: 20px;
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .description::before {
          content: '';
          position: absolute;
          top: 10%;
          bottom: 10%;
          left: 50%;
          border-left: 2px dashed #ccc;
          transform: translateX(-50%);
        }

        .title {
          width: 100%;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
        }

        .left-column, .right-column {
          width: 45%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .description-item {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }

        .description-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 10px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CarDetails;
