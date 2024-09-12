// src/components/AdminLogin.jsx
import React, { useState,useEffect } from 'react';
import { collection, addDoc, getDocs,query,where } from "firebase/firestore";
import { db } from '../../firebase';
import './Login.css';
import adminlogo from '../../Assets/Pictures/logo1.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(username,password)
    const usersCollectionRef = collection(db, 'login'); // Replace 'users' with your Firestore collection name
      const q = query(usersCollectionRef, where('user', '==', 'admin')); // Query active users
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(usersData)
  };

  return (
    <div className="login-container">
        <div className='logo-sec'>
            <img className='logo-img-sec' src={adminlogo}/>
        </div>
      <div className="login-form">
        <h2>ADMIN LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
