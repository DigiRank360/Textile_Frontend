import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import API_URL, { getImageUrl } from '../config/config';
import './Hero.css';

const DEFAULT_SLIDES = [
  {
    image: banner1,
    badge: 'Premium Textile Manufacturer',
    title: ['Fabrics Woven with', 'Quality & Trust'],
  },
  {
    image: banner2,
    badge: 'Silk, Cotton & Blends',
    title: ['Colours That Bring', 'Every Design to Life'],
  },
  {
    image: banner3,
    badge: 'Wholesale & Bulk Orders',
    title: ['Your Trusted Partner', 'for Quality Fabrics'],
  },
];

const INTERVAL = 5500;

const Hero = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL + '/api/banners')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d.banners?.length) return;
        setSlides(
          d.banners.map((b) => ({
            image: getImageUrl(b.image),
            badge: b.badge || '',
            title: [b.title || '', b.subtitle || ''],
          }))
        );
        setActive(0);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const go = useCallback(
    (index) => setActive((index + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return undefined;
    const timer = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [active, paused, go]);

  return (
    <section
      className="hero"
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i + slide.image}
          className={'hero-slide' + (i === active ? ' is-active' : '')}
          aria-hidden={i !== active}
        >
          <div
            className="hero-bg"
            style={{ backgroundImage: 'url(' + slide.image + ')' }}
          />
        </div>
      ))}
      <div className="hero-overlay-gradient" />
      <div className="hero-overlay-multiply" />

      <div className="hero-container">
        {slides.map((slide, i) => (
          <div
            key={i + slide.image}
            className={'hero-content' + (i === active ? ' is-active' : '')}
          >
            <p className="hero-badge">{slide.badge}</p>

            <h1 className="hero-title">
              {slide.title[0]}
              {slide.title[1] && <br />}
              {slide.title[1]}
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
        ))}
      </div>

      <button
        type="button"
        className="hero-arrow hero-arrow-prev"
        onClick={() => go(active - 1)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        onClick={() => go(active + 1)}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            key={i + slide.image}
            type="button"
            className={'hero-dot' + (i === active ? ' is-active' : '')}
            onClick={() => go(i)}
            aria-label={'Go to slide ' + (i + 1)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
