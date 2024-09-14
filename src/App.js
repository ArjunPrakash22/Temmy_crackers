import React,{useEffect} from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import './App.css';
import {Home,Login,Admin,Product,Contact} from './Pages'
import {Navbar,Footer} from './Component'
import { Backtotop,Radialmenu } from "./Widget";

function App() {

  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Backtotop/>
      <Radialmenu/>
      <Footer/>
    </div>
  );
}

export default App;
