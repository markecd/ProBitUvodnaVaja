import React, { useState, useEffect } from 'react';
import axiosInstance from './services/axiosConfig';
import CarList from './components/CarList';
import Filter from './components/Filter';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.sub.username);
      setId(decoded.sub.id);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCars();
    }
  }, [isAuthenticated]);

  const fetchCars = () => {
    axiosInstance.get('http://localhost:5000/cars')
      .then(response => {
        setCars(response.data);
        setFilteredCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
  };

  const handleFilter = (filters) => {
    let filtered = cars;
    if (filters.brand) {
      filtered = filtered.filter(car => car.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }
    if (filters.model) {
      filtered = filtered.filter(car => car.model.toLowerCase().includes(filters.model.toLowerCase()));
    }
    if (filters.year) {
      filtered = filtered.filter(car => car.year.toString().includes(filters.year));
    }
    if (filters.price) {
      filtered = filtered.filter(car => car.price.toString().includes(filters.price));
    }
    setFilteredCars(filtered);
  };

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.sub.username);
      setId(decoded.sub.id);
      setIsAuthenticated(true);
    }
  };

  const handleUpdateCar = (updatedCar) => {
    axiosInstance.put(`http://localhost:5000/cars/${updatedCar.id}`, updatedCar)
      .then(response => {
        fetchCars();
      })
      .catch(error => {
        console.error('There was an error updating the car!', error);
      });
  };

  const handleDeleteCar = (carToDelete) => {
    axiosInstance.delete(`http://localhost:5000/cars/${carToDelete.id}`)
      .then(response => {
        fetchCars();
      })
      .catch(error => {
        console.error('There was an error deleting the car!', error);
      });
  };

  const handleAddCar = (newCar) => {
    newCar.owner_id = id;
    axiosInstance.post(`http://localhost:5000/cars`, newCar)
      .then(response => {
        fetchCars();
      })
      .catch(error => {
        console.error('There was an error updating the car!', error);
      });
  };

  return (
    <div className="container">
      <h1>Car Management</h1>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Filter onFilter={handleFilter} />
          <CarList cars={filteredCars} username={username} onUpdateCar={handleUpdateCar} onDeleteCar={handleDeleteCar} onAddCar={handleAddCar} />
        </>
      )}
    </div>
  );
};

export default App;
