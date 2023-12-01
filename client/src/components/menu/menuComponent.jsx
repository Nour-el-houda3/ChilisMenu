import React, { useRef, useState } from 'react';
import './MenuComponent.css';
import FooterComponent from '../footer/FooterComponent';

const MenuComponent = () => {
  const menuRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(6); // Initial number of visible items

  const handleScrollToMenu = () => {
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeeMore = () => {
    // Increase the number of visible items when "voir plus" is clicked
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3); // Adjust the number as needed
  };

  return (
    <div className="menu-container">
      <div className="background-container">
        <img
          className="background-image"
          src="/backgroundImg.png"
          alt="Background"
        />
        <img className="chilisLogo-img" src="/chilisLogo.png" alt="Logo" />
        <button className="btn" onClick={handleScrollToMenu}>
          Voir notre menu
        </button>
      </div>
      <div className="content" ref={menuRef}>
        <div className="logo-container">
          <img className="poivre-img" src="/poivre1.png" alt="Logo" />
          <h1>Notre Menu</h1>
          <img className="poivre-img" src="/poivre2.png" alt="Logo" />
        </div>
        <hr className="underline" />
        <h2>Nos Fajitas</h2>

        <div className="card">
          {Array.from({ length: visibleItems }).map((_, index) => (
            <div className="item" key={index}>
              <img className="plat-img" src={`/plat${index + 1}.png`} alt={`Trio Fajitas ${index + 1}`} />
              <div className="name">Trio Fajitas</div>
              <div className="price">49.90 DT</div>
            </div>
          ))}


{visibleItems < 9 && (
          <button className="voir-plus-btn" onClick={handleSeeMore}>
            Voir plus
          </button>
        )}

        </div>


        <FooterComponent />
      </div>
    </div>
  );
};

export default MenuComponent;
