// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./components/About/About";
import PropertyDetails from "./pages/PropertyDetails";
import PrivacyAndPolicy from "./pages/PrivacyAndPlicy";
import Faq from "./pages/Faq";
import TermNcondition from "./pages/TermNcondition";

import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/properties"
            element={<Products />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route path="/about" element={<About />} />

          <Route path="/faq" element={<Faq />} />

          <Route
            path="/privacy-policy"
            element={<PrivacyAndPolicy />}
          />

          <Route
            path="/terms-and-conditions"
            element={<TermNcondition />}
          />

          <Route
            path="*"
            element={
              <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
                <div>
                  <h1 className="mb-3 text-5xl font-bold">
                    404
                  </h1>

                  <p className="mb-6 text-gray-600">
                    The page you are looking for does
                    not exist.
                  </p>

                  <a
                    href="/"
                    className="rounded-md bg-[#c9a227] px-6 py-3 font-semibold text-[#241611]"
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>

        <WhatsAppButton />
      </MainLayout>
    </Router>
  );
}

export default App;