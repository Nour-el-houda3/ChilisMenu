import React, { useState, useEffect } from 'react';
import { getAllPlats, createPlat } from '../../api';
import { useNavigate } from 'react-router-dom';

import LayoutDashboard from '../layoutDashboord/LayoutDashbord';
import './createComponentStyles.css'; 

const CreateComponent = () => {
  const [plats, setPlats] = useState([]);
  const navigate = useNavigate();
  const [newPlat, setNewPlat] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
    imageUrl: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const platsData = await getAllPlats();
        setPlats(platsData);
      } catch (error) {
        console.error('Error fetching plats:', error);
      }
    };

    fetchPlats();
  }, []);

  const handleCreatePlat = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    const inputErrors = {};
    if (!newPlat.name.trim()) {
      inputErrors.name = 'Le nom du plat est requis';
    }
    if (!newPlat.description.trim()) {
      inputErrors.description = 'La description du plat est requise';
    }
    if (newPlat.price <= 0) {
      inputErrors.price = 'Le prix du plat doit être supérieur à zéro';
    }
    if (!newPlat.image) {
      inputErrors.image = 'L\'image du plat est requise';
    }

    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    try {
      const formData = new FormData();
      formData.append('name', newPlat.name);
      formData.append('description', newPlat.description);
      formData.append('price', newPlat.price);

      const file = newPlat.image;
      const fileExtension = file.name.split('.').pop();
      const fileName = `plat_image_${Date.now()}.${fileExtension}`;
      formData.append('image', new File([file], fileName));

      const createdPlat = await createPlat(formData);
      setPlats((prevPlats) => [...prevPlats, createdPlat]);
      navigate('/admin');
    } catch (error) {
      console.error('Error creating plat:', error);
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setNewPlat((prevPlat) => ({
      ...prevPlat,
      image: file,
      imageUrl: imageUrl,
    }));
  };

  return (
    <div className="form-container">
      <LayoutDashboard/>
      <h1 className="form-header">Ajouter un plat au menu</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleCreatePlat}
        className="form"
      >
        <label className="form-label">
          Nom du plat:
          <input
            type="text"
            value={newPlat.name}
            onChange={(e) => setNewPlat({ ...newPlat, name: e.target.value })}
            className="form-input"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </label>
        <label className="form-label">
          Description:
          <input
            type="text"
            value={newPlat.description}
            onChange={(e) => setNewPlat({ ...newPlat, description: e.target.value })}
            className="form-input"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </label>
        <label className="form-label">
          Prix:
          <input
            type="number"
            value={newPlat.price}
            onChange={(e) => setNewPlat({ ...newPlat, price: e.target.value })}
            className="form-input"
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </label>
        <label className="form-label">
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </label>
        {newPlat.imageUrl && (
          <img
            src={newPlat.imageUrl}
            alt="Preview"
            className="image-preview"
          />
        )}

        <button
          type="submit"
          className="form-button"
        >
          Ajouter un Plat
        </button>
      </form>
    </div>
  );
};

export default CreateComponent;
