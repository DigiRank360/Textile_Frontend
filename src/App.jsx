// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Frontend Pages
import Home from './pages/Home';
import Products from './pages/Products';
// import Categories from './pages/Categories';
import Contact from './pages/Contact';
import About from './components/About/About';
import MainLayout from './layouts/MainLayout';
import PropertyDetails from "./pages/PropertyDetails";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
        <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
         <Route path="/properties" element={<Products />} />
         <Route path="/properties/:id" element={<PropertyDetails />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <WhatsAppButton />
      </MainLayout>
    </Router>
  );
}



export default App;