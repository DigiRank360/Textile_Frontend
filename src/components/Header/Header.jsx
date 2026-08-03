import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

import logo from "../../assets/images/image.png";
import "./Header.css";

const Header = ({ disableScrollColor = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  /*
  |--------------------------------------------------------------------------
  | Header scroll effect
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (disableScrollColor) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [disableScrollColor]);

  /*
  |--------------------------------------------------------------------------
  | Close menus after route change
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.search]);

  /*
  |--------------------------------------------------------------------------
  | Close search when clicking outside
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Active navigation
  |--------------------------------------------------------------------------
  */

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }

    if (
      path !== "/" &&
      location.pathname.startsWith(path)
    ) {
      return true;
    }

    return false;
  };

  /*
  |--------------------------------------------------------------------------
  | Search actions
  |--------------------------------------------------------------------------
  */

  const toggleSearch = () => {
    setIsSearchOpen((previousValue) => !previousValue);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(
      (previousValue) => !previousValue,
    );
    setIsSearchOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const normalizedSearch = searchTerm.trim();

    if (!normalizedSearch) {
      navigate("/products");
      setIsSearchOpen(false);
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        normalizedSearch,
      )}`,
    );

    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");

    if (location.pathname === "/products") {
      navigate("/products");
    }
  };

  return (
    <header
      className={`header ${
        isScrolled || disableScrollColor
          ? "header-scrolled"
          : ""
      }`}
    >
      <div className="header-container">
        {/* Logo */}
        <Link
          to="/"
          className="header-logo"
          aria-label="Go to home page"
        >
          <img
            src={logo}
            alt="Dhoop & Co."
            className="header-logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="header-nav"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`header-nav-link ${
                isActive(link.path) ? "active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <div
            className={`header-search-wrapper ${
              isSearchOpen ? "search-open" : ""
            }`}
            ref={searchContainerRef}
          >
            <form
              onSubmit={handleSearch}
              className="header-search-form"
            >
              <Search
                size={17}
                className="header-search-input-icon"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search products..."
                aria-label="Search products"
                autoFocus={isSearchOpen}
                className="header-search-input"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="header-search-clear"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </form>

            <button
              type="button"
              className="header-action-btn"
              onClick={toggleSearch}
              aria-label={
                isSearchOpen
                  ? "Close search"
                  : "Open search"
              }
              aria-expanded={isSearchOpen}
            >
              {isSearchOpen ? (
                <X size={18} />
              ) : (
                <Search size={18} />
              )}
            </button>
          </div>

          <button
            type="button"
            className="header-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div
        className={`header-mobile-search ${
          isSearchOpen ? "open" : ""
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="header-mobile-search-form"
        >
          <Search
            size={17}
            className="header-mobile-search-icon"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search products..."
            aria-label="Search products"
            className="header-mobile-search-input"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="header-mobile-search-clear"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </form>
      </div>

      {/* Mobile Menu */}
      <div
        className={`header-mobile-menu ${
          isMobileMenuOpen ? "open" : ""
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`header-mobile-link ${
              isActive(link.path) ? "active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;