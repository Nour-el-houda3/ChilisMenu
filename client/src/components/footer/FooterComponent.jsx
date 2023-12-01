import React from 'react';
import './footerStyles.css';

const FooterComponent = () => {
  return (
    <div className="container">
      <img className="contact-img" src="/contact.png" alt="contact" />
      <form className="contact-form">
        <input type="text" placeholder="Nom et Prénom" />
        <input type="email" placeholder="Adresse Email" />
        <textarea placeholder="Votre message ici"></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default FooterComponent;
