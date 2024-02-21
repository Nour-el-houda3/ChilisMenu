import React, { useRef, useState, useEffect } from 'react';
import './MenuComponent.css';
import FooterComponent from '../footer/FooterComponent';
import { getAllPlats} from '../../api';

const MenuComponent = () => {
  const menuRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(6); // Initial number of visible items
  const [menuData, setMenuData] = useState([]); // State to store menu data

  useEffect(() => {
    // Fetch menu data from your backend API when the component mounts
    const fetchMenuData = async () => {
      try {
        const data = await getAllPlats(); // Replace with your actual API endpoint
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleScrollToMenu = () => {
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeeMore = () => {
    // Increase the number of visible items when "voir plus" is clicked
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
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
        {menuData.slice(0, visibleItems).map((menuItem, index) => (
          <div className="item" key={index}>
            <img className="plat-img" src={menuItem.image} alt={menuItem.name} />
            <div className="name">{menuItem.name}</div>
            <div className="price">{menuItem.price} DT</div>
          </div>
        ))}

        {visibleItems < menuData.length && (
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
