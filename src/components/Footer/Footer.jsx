


import React, { useState } from "react";
import { MapPin, Phone, Mail, ArrowUp, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const shopLinks = [
    { label: "All Products", href: "/products" },
    { label: "About Us", href: "/about" },
  ];

  const careLinks = [
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSubscribed(false);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to subscribe");
      }

      setSubscribed(true);
      setMessage(data.message || "You are subscribed successfully.");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscribed(false);
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="overflow-hidden bg-[#1a221a] text-[#e9dfd2]" id="footer">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-7 pt-10 sm:px-6 sm:pb-8 sm:pt-12 lg:px-8 lg:pt-16">
          {/* Newsletter band */}
          <div className="mb-10 border-b border-[#e9dfd2]/10 pb-10 sm:mb-12 sm:pb-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="w-full text-center sm:text-left lg:max-w-[460px]">
                <h4 className="mb-2 font-serif text-2xl font-semibold leading-tight text-[#f2e9dc] sm:text-3xl">
                  Join our circle
                </h4>
                <p className="mx-auto max-w-[420px] text-sm leading-6 text-[#b6a794] sm:mx-0 sm:text-[15px]">
                  Get early access to new fragrances, festival collections, and
                  rituals — no spam, ever.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0 lg:w-auto lg:min-w-[430px]"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-md border border-[#e9dfd2]/20 bg-[#e9dfd2]/[0.06] px-4 py-3.5 text-sm text-[#f2e9dc] outline-none placeholder:text-[#8a7c6a] focus:border-[#c9a227] disabled:opacity-60 sm:rounded-r-none sm:border-r-0"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#c9a227] px-5 py-3 text-sm font-semibold text-[#241611] transition-colors hover:bg-[#dbb43a] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[140px] sm:rounded-l-none"
                >
                  <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                  {!loading && <Send size={16} />}
                </button>
              </form>
            </div>

            {message && (
              <p
                role="status"
                className={`mt-3 w-full text-center text-[13px] sm:text-left ${
                  subscribed ? "text-[#c9a227]" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* Main grid */}
          <div className="mb-10 grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.35fr] lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <img
                src={logo}
                alt="Dhoop & Co."
                className="mb-4 h-9 w-auto object-contain sm:h-10"
              />
              <p className="mb-5 max-w-[360px] text-sm leading-7 text-[#b6a794]">
                Crafting premium agarbatti and dhoop sticks since 1932.
                Experience the divine fragrance of nature with every ritual.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {[ 
                  { label: "Facebook", icon: <FaFacebookF size={14} /> },
                  { label: "Instagram", icon: <FaInstagram size={14} /> },
                  { label: "YouTube", icon: <FaYoutube size={14} /> },
                ].map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9dfd2]/[0.08] text-[#e9dfd2] transition-all hover:-translate-y-0.5 hover:bg-[#c9a227] hover:text-[#241611]"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-[#c9a227]">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-sm text-[#b6a794] transition-all hover:translate-x-1 hover:text-[#f2e9dc]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-[#c9a227]">
                Customer Care
              </h4>
              <ul className="flex flex-col gap-3">
                {careLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-sm text-[#b6a794] transition-all hover:translate-x-1 hover:text-[#f2e9dc]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-[#c9a227]">
                Contact
              </h4>
              <address className="flex min-w-0 flex-col gap-4 not-italic">
                <div className="flex items-start gap-3 text-sm leading-6 text-[#b6a794]">
                  <MapPin size={17} className="mt-1 shrink-0 text-[#c9a227]" />
                  <span className="break-words">
                    A-182 English Villas, Kolar Road, Bhopal - 462042
                  </span>
                </div>

                <div className="flex items-start gap-3 text-sm text-[#b6a794]">
                  <Phone size={17} className="mt-0.5 shrink-0 text-[#c9a227]" />
                  <a
                    href="tel:+919981997440"
                    className="break-all transition-colors hover:text-[#f2e9dc]"
                  >
                    +91 99819 97440
                  </a>
                </div>

                <div className="flex min-w-0 items-start gap-3 text-sm text-[#b6a794]">
                  <Mail size={17} className="mt-0.5 shrink-0 text-[#c9a227]" />
                  <a
                    href="mailto:info@eagleincensesticks.com"
                    className="min-w-0 break-all transition-colors hover:text-[#f2e9dc]"
                  >
                    info@eagleincensesticks.com
                  </a>
                </div>
              </address>
            </div>
          </div>

          <div className="mb-6 h-px bg-[#e9dfd2]/10" />

          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="m-0 text-[12px] leading-5 text-[#8a7c6a] sm:text-[13px]">
              © {currentYear} Dhoop & Co. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end sm:gap-x-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12px] text-[#8a7c6a] transition-colors hover:text-[#e9dfd2] sm:text-[13px]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#c9a227] text-[#241611] shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:bg-[#dbb43a] sm:bottom-6 sm:right-6 sm:h-11 sm:w-11 lg:bottom-7 lg:right-7"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};

export default Footer;