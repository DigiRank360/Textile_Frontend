// src/components/Footer/Footer.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const quickLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "All Products",
      path: "/products",
    },
    {
      label: "About Us",
      path: "/about",
    },
  ];

  const customerCareLinks = [
    {
      label: "FAQs",
      path: "/faq",
    },
    {
      label: "Contact Us",
      path: "/contact",
    },
  ];

  const legalLinks = [
    {
      label: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      path: "/terms-and-conditions",
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FaFacebookF size={15} />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: <FaInstagram size={16} />,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      icon: <FaYoutube size={17} />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleInternalLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setSubscribed(false);
      setMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setSubscribed(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      setSubscribed(false);
      setMessage("Newsletter service is currently unavailable.");
      console.error(
        "VITE_API_URL is missing in environment variables.",
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSubscribed(false);

      const response = await fetch(
        `${apiUrl}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        },
      );

      const contentType =
        response.headers.get("content-type");

      let data = {};

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        data = await response.json();
      }

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            "Unable to subscribe. Please try again.",
        );
      }

      setSubscribed(true);
      setMessage(
        data.message ||
          "You have subscribed successfully.",
      );
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      setSubscribed(false);
      setMessage(
        error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer
        id="footer"
        className="overflow-hidden bg-[#1a221a] text-[#e9dfd2]"
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-12 lg:px-8 lg:pt-16">
          {/* Newsletter Section */}
          <div className="mb-10 border-b border-white/10 pb-10 sm:mb-12 sm:pb-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="w-full text-center lg:max-w-[470px] lg:text-left">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                  Stay Connected
                </p>

                <h2 className="mb-3 font-serif text-2xl font-semibold leading-tight text-[#f2e9dc] sm:text-3xl">
                  Join Us
                </h2>

                <p className="mx-auto max-w-[470px] text-sm leading-6 text-[#b6a794] lg:mx-0 sm:text-[15px]">
                  Get early access to new fragrances,
                  festival collections and exclusive
                  updates directly in your inbox.
                </p>
              </div>

              <div className="w-full lg:max-w-[510px]">
                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0"
                >
                  <input
                    type="email"
                    value={email}
                    disabled={loading}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    autoComplete="email"
                    className="min-h-[50px] min-w-0 w-full flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-[#f2e9dc] outline-none transition placeholder:text-[#8a7c6a] focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-r-none sm:border-r-0"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#241611] transition-all duration-300 hover:bg-[#dbb43a] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[150px] sm:rounded-l-none"
                  >
                    <span>
                      {loading
                        ? "Subscribing..."
                        : "Subscribe"}
                    </span>

                    {!loading && <Send size={16} />}
                  </button>
                </form>

                {message && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`mt-3 text-center text-[13px] leading-5 lg:text-left ${
                      subscribed
                        ? "text-[#d5b84d]"
                        : "text-red-400"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="mb-10 grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1.45fr_0.75fr_0.85fr_1.35fr] lg:gap-10">
            {/* Brand */}
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <Link
                to="/"
                onClick={handleInternalLinkClick}
                aria-label="Go to homepage"
                className="mb-4 inline-flex"
              >
                <img
                  src={logo}
                  alt="Eagle Incense Sticks"
                  className="h-20 w-auto max-w-full object-contain sm:h-24"
                />
              </Link>

              <p className="mb-5 max-w-[390px] text-sm leading-7 text-[#b6a794]">
                Crafting premium agarbatti and dhoop
                sticks with carefully selected
                fragrances for peaceful rituals,
                spiritual moments and everyday
                freshness.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[#e9dfd2] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a227] hover:bg-[#c9a227] hover:text-[#241611]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="min-w-0">
              <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#c9a227]">
                Quick Links
              </h3>

              <ul className="flex flex-col gap-3.5">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={handleInternalLinkClick}
                      className="inline-flex min-h-[28px] items-center text-sm text-[#b6a794] transition-all duration-300 hover:translate-x-1 hover:text-[#f2e9dc]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div className="min-w-0">
              <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#c9a227]">
                Customer Care
              </h3>

              <ul className="flex flex-col gap-3.5">
                {customerCareLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={handleInternalLinkClick}
                      className="inline-flex min-h-[28px] items-center text-sm text-[#b6a794] transition-all duration-300 hover:translate-x-1 hover:text-[#f2e9dc]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="min-w-0">
              <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#c9a227]">
                Contact Us
              </h3>

              <address className="flex min-w-0 flex-col gap-5 not-italic">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/10 text-[#c9a227]">
                    <MapPin size={17} />
                  </div>

                  <p className="min-w-0 break-words text-sm leading-6 text-[#b6a794]">
                    A-182 English Villas, Kolar Road,
                    Bhopal, Madhya Pradesh - 462042
                  </p>
                </div>

                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/10 text-[#c9a227]">
                    <Phone size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="mb-0.5 text-[11px] uppercase tracking-wider text-[#8a7c6a]">
                      Call us
                    </p>

                    <a
                      href="tel:+919981997440"
                      className="break-all text-sm text-[#b6a794] transition-colors hover:text-[#f2e9dc]"
                    >
                      +91 99819 97440
                    </a>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/10 text-[#c9a227]">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="mb-0.5 text-[11px] uppercase tracking-wider text-[#8a7c6a]">
                      Email us
                    </p>

                    <a
                      href="mailto:info@eagleincensesticks.com"
                      className="block min-w-0 break-all text-sm leading-6 text-[#b6a794] transition-colors hover:text-[#f2e9dc]"
                    >
                      info@eagleincensesticks.com
                    </a>
                  </div>
                </div>
              </address>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px w-full bg-white/10" />

          {/* Bottom Footer */}
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="m-0 text-[12px] leading-5 text-[#8a7c6a] sm:text-[13px]">
              © {currentYear} Eagle Incense Sticks.
              All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-end">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleInternalLinkClick}
                  className="text-[12px] leading-5 text-[#8a7c6a] transition-colors hover:text-[#e9dfd2] sm:text-[13px]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a227] text-[#241611] shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dbb43a] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
      >
        <ArrowUp size={19} />
      </button>
    </>
  );
};

export default Footer;