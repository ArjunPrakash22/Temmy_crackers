// src/components/AdminLogin.jsx
import React, { useState,useEffect } from 'react';
import { collection, addDoc, getDocs,query,where } from "firebase/firestore";
import { db } from '../../firebase';
import { Link,useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import './Login.css';
import adminlogo from '../../Assets/Pictures/logo1.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg,setErrormsg]=useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    var user_pswd=handleHash();
    const usersCollectionRef = collection(db, 'login'); // Replace 'users' with your Firestore collection name
      const q = query(usersCollectionRef, where('user', '==', 'admin')); // Query active users
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if(user_pswd===usersData[0].pswd){
        console.log("Success")
        window.history.replaceState(null, null, "/admin");
        navigate("/admin");
      }else{
        setErrormsg("Incorrect Password")
        console.log("Failure")
      }
  };

  const handleHash = () => {
    const hashedValue = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedValue
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
            {errormsg}
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
