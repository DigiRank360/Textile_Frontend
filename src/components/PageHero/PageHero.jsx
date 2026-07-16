import React from "react";
import "./PageHero.css";

const PageHero = ({ label, title, subtitle, image }) => {
  return (
    <section
      className="page-hero"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        {label && <span className="page-hero-badge">{label}</span>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;