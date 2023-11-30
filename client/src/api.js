import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllPlats = async () => {
  try {
    const response = await axios.get(`${API_URL}/plats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plats:', error);
    throw error;
  }
};

export const createPlat = async (platData) => {
  try {
    const response = await axios.post(`${API_URL}/plats`, platData);
    return response.data;
  } catch (error) {
    console.error('Error creating plat:', error);
    throw error;
  }
};

export const deletePlat = async (platId) => {
  try {
    const response = await axios.delete(`${API_URL}/plats/${platId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting plat with ID ${platId}:`, error);
    throw error;
  }
};

export const updatePlat = async (platId, platData) => {
  try {
    const response = await axios.put(`${API_URL}/plats/${platId}`, platData);
    return response.data;
  } catch (error) {
    console.error(`Error updating plat with ID ${platId}:`, error);
  }
};

export const getPlatById = async (platId) => {
  try {
    const response = await axios.get(`${API_URL}/plats/${platId}`);
    return response.data;
  } catch (error) {
    console.error(`Error  fetching plat with ID ${platId}:`, error);
  }
};

