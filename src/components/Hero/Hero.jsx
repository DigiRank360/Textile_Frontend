import React from 'react';
import { Link } from 'react-router-dom';
import homeHero from '../../assets/images/homeHero.png';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${homeHero})` }}
      />
      <div className="hero-overlay-gradient" />
      <div className="hero-overlay-multiply" />

      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">Established in 2023</p>

          <h1 className="hero-title">
            Experience the Divine<br />
            Fragrance of Nature
          </h1>

          <div className="hero-buttons">
            <Link to="/products" className="hero-btn-primary">
              Explore Collection
            </Link>
            <Link to="/about" className="hero-btn-secondary">
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
