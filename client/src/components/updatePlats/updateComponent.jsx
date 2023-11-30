import React, { useState, useEffect } from 'react';
import { getPlatById, updatePlat } from '../../api';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutDashboard from '../layoutDashboord/LayoutDashbord';
import './updateStyles.css'; 

const UpdatePlatComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plat, setPlat] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const fetchPlatData = async () => {
      try {
        const platId = id;
        if (platId) {
          const platData = await getPlatById(platId);
          setPlat(platData);
          setFormData({
            name: platData.name,
            description: platData.description,
            price: platData.price,
            image: platData.image,
          });
        } else {
          console.error('platId is undefined.');
        }
      } catch (error) {
        console.error('Error fetching plat data:', error);
      }
    };

    fetchPlatData();
    setForceUpdate(false); // Reset forceUpdate after rendering
  }, [id, forceUpdate]);

  const handleInputChange = (e) => {
    if (plat._id) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevPlat) => ({
      ...prevPlat,
      image: file,
    }));
  };

  const validateInputs = () => {
    const inputErrors = {};
    if (!formData.name.trim()) {
      inputErrors.name = 'Le nom du plat est requis';
    }
    if (!formData.description.trim()) {
      inputErrors.description = 'La description du plat est requise';
    }
    if (formData.price <= 0) {
      inputErrors.price = 'Le prix du plat doit être supérieur à zéro';
    }
    // You can add additional validation for the image if needed
    // For example, checking file type, size, etc.
    if (!formData.image) {
      inputErrors.image = 'L\'image du plat est requise';
    }

    setErrors(inputErrors);

    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const formDataForUpdate = new FormData();
      formDataForUpdate.append('name', formData.name);
      formDataForUpdate.append('description', formData.description);
      formDataForUpdate.append('price', formData.price);
      formDataForUpdate.append('image', formData.image);

      await updatePlat(id, formDataForUpdate);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating plat:', error);
    }
  };

  return (
    <div className="form-container">
      <LayoutDashboard />
      <h2 className="form-header">Modifier le plat</h2>
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="form-label">Nom du plat:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </label>
        <label className="form-label">Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </label>
        <label className="form-label" >Prix:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </label>
        <label className="form-label" >Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </label>

        {formData.image && (
          <img
            className="image-preview"
            src={formData.image instanceof File ? URL.createObjectURL(formData.image) : `/${formData.image}`}
            alt={`Image du plat ${formData.name}`}
          />
        )}

        <button type="submit" className="form-button">Enregistrer</button>
      </form>
    </div>
  );
};

export default UpdatePlatComponent;
