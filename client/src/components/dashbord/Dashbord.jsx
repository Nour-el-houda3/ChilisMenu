import React, { useState, useEffect } from 'react';
import { getAllPlats, deletePlat } from '../../api';
import LayoutDashboard from '../layoutDashboord/LayoutDashbord';
import { Link } from 'react-router-dom';
import './dashbordStyle.css';

const DashboardComponent = () => {
  const [plats, setPlats] = useState([]);

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

  const handleDeletePlat = async (platId) => {
    try {
      await deletePlat(platId);
      const updatedPlats = plats.filter(plat => plat._id !== platId);
      setPlats(updatedPlats);
    } catch (error) {
      console.error('Error deleting plat:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <LayoutDashboard/>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom du plat</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plats.map(plat => (
              <tr key={plat.id}>
                <td>{plat.name}</td>
                <td>{plat.description}</td>
                <td>{plat.price}</td>
                <td>
                  {plat.image && (
                    <img
                      src={plat.image}
                      alt={`Image du plat ${plat.name}`}
                    />
                  )}
                </td>
                <td>
      <Link to={`/admin/edit/${plat._id}`}>Modifier</Link>

<Link to="#" onClick={() => handleDeletePlat(plat._id)}>Supprimer</Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardComponent;
