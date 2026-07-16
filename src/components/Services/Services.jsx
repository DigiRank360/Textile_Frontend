import React from 'react';

// Simple version without lucide-react first
const Services = () => {
  const properties = [
    {
      title: 'Farmhouses',
      text: 'Luxurious farmhouses with vast lands, perfect for weekend getaways and peaceful living.',
      link: '#'
    },
    {
      title: 'Bangalows',
      text: 'Premium bangalows with modern amenities in prime locations across the city.',
      link: '#'
    },
    {
      title: 'Buildings',
      text: 'Commercial and residential buildings ideal for investment and business purposes.',
      link: '#'
    },
    {
      title: 'Plots',
      text: 'Residential and commercial plots in developing areas with great investment potential.',
      link: '#'
    },
    {
      title: 'Villas',
      text: 'Exclusive villas in gated communities with world-class facilities and security.',
      link: '#'
    },
    {
      title: 'Shops',
      text: 'Prime location shops and retail spaces for your business ventures.',
      link: '#'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header">
          <span className="services-subtitle">Our Properties</span>
          <h2 className="services-title">
            Explore Our <span className="highlight">Property Portfolio</span>
          </h2>
          <p className="services-description">
            Discover our wide range of premium properties designed to meet your 
            unique requirements and lifestyle needs.
          </p>
        </div>

        <div className="services-grid">
          {properties.map((property, index) => (
            <div key={index} className="services-card">
              <div className="services-card-icon" style={{ 
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🏠
              </div>
              <h3 className="services-card-title">{property.title}</h3>
              <p className="services-card-text">{property.text}</p>
              <a href={property.link} className="services-card-link">
                View Properties →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;