import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../services/axiosConfig';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axiosInstance.post('http://localhost:5000/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.access_token);
        onLogin();
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input 
        type="text" 
        className="form-control" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        className="form-control" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
  