import React from 'react';
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import SeasonWiseCrop from "../src/Pages/SeasonWiseCrop";
import Fertilizer from "../src/Pages/Fertilizer";
import Spraying from "../src/Pages/Spraying";
import About from "../src/Pages/About";
import Contact from "../src/Pages/Contact";
import Login from "../src/Pages/Login";
import Register from "../src/Pages/Register";
import Dashboard from "../src/Pages/Dashboard";
import { useAuth } from './context/Authprovider';

function App() {
  const location = useLocation()
  const hideNavbarFooter = ["/Dashboard", "/Login", "/Register"].includes(
    location.pathname
  );
  const {agriculture}=useAuth()
  console.log(agriculture)
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}


      <Routes>
       {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/SeasonWiseCrop" element={<SeasonWiseCrop />} />
        <Route exact path="/Fertilizer" element={<Fertilizer />} />
        <Route exact path="/Spraying" element={<Spraying />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Contact" element={<Contact />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />

      </Routes>
      {/* !hideNavbarFooter && <Footer /> */}
    </div>
  );
}

export default App