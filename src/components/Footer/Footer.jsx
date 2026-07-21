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
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const careLinks = [
    { label: "My Account", href: "/login" },
    { label: "Track Order", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Shipping Policy", href: "#" },
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
          body: JSON.stringify({
            email: email.trim(),
          }),
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
      <footer className="bg-[#1a221a] text-[#e9dfd2]" id="footer">
        <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
          {/* Newsletter band */}
          <div className="flex items-center justify-between gap-8 flex-wrap pb-12 mb-12 border-b border-[#e9dfd2]/10">
            <div>
              <h4 className="font-serif text-xl md:text-2xl font-semibold text-[#f2e9dc] mb-1.5">
                Join our circle
              </h4>
              <p className="text-sm text-[#b6a794] max-w-[420px]">
                Get early access to new fragrances, festival collections, and
                rituals — no spam, ever.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-shrink-0 w-full sm:w-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="bg-[#e9dfd2]/[0.06] border border-[#e9dfd2]/20 border-r-0 text-[#f2e9dc] placeholder-[#8a7c6a] text-sm px-4 py-3 w-full sm:w-64 rounded-l outline-none focus:border-[#c9a227] disabled:opacity-60 transition-colors"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#c9a227] hover:bg-[#dbb43a] disabled:opacity-60 disabled:cursor-not-allowed text-[#241611] text-sm font-semibold px-5 py-3 rounded-r transition-colors"
              >
                <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                {!loading && <Send size={16} />}
              </button>
            </form>

            {message && (
              <p
                role="status"
                className={`text-[13px] w-full ${
                  subscribed ? "text-[#c9a227]" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            {subscribed && (
              <p role="status" className="text-[13px] text-[#c9a227] w-full">
                You're on the list — welcome.
              </p>
            )}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="Dhoop & Co." className="h-10 mb-4" />
              <p className="text-sm leading-7 text-[#b6a794] max-w-[320px] mb-5">
                Crafting premium agarbatti and dhoop sticks since 1932.
                Experience the divine fragrance of nature with every ritual.
              </p>
              <div className="flex gap-2.5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#e9dfd2]/[0.08] text-[#e9dfd2] hover:bg-[#c9a227] hover:text-[#241611] hover:-translate-y-0.5 transition-all"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#e9dfd2]/[0.08] text-[#e9dfd2] hover:bg-[#c9a227] hover:text-[#241611] hover:-translate-y-0.5 transition-all"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#e9dfd2]/[0.08] text-[#e9dfd2] hover:bg-[#c9a227] hover:text-[#241611] hover:-translate-y-0.5 transition-all"
                >
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-4.5">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#b6a794] hover:text-[#f2e9dc] hover:pl-1 transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-4.5">
                Customer Care
              </h4>
              <ul className="flex flex-col gap-3">
                {careLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#b6a794] hover:text-[#f2e9dc] hover:pl-1 transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-4.5">
                Contact
              </h4>
              <address className="not-italic flex flex-col gap-3.5">
                <div className="flex items-start gap-2.5 text-sm text-[#b6a794]">
                  <MapPin
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-[#c9a227]"
                  />
                  <span>A-182 ENGLISH VILLAS KOLAR ROAD BHOPAL-462042</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#b6a794]">
                  <Phone
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-[#c9a227]"
                  />
                  <a
                    href="tel:+919981997440"
                    className="hover:text-[#f2e9dc] transition-colors"
                  >
                    +91 99819 97440
                  </a>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#b6a794]">
                  <Mail
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-[#c9a227]"
                  />
                  <a
                    href="mailto:info@eagleincensesticks.com"
                    className="hover:text-[#f2e9dc] transition-colors"
                  >
                    info@eagleincensesticks.com
                  </a>
                </div>
              </address>
            </div>
          </div>

          <div className="h-px bg-[#e9dfd2]/10 mb-6" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-[13px] text-[#8a7c6a] m-0">
              © {currentYear} Dhoop & Co. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-[#8a7c6a] hover:text-[#e9dfd2] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-7 right-7 z-40 w-11 h-11 rounded-full bg-[#c9a227] hover:bg-[#dbb43a] text-[#241611] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};

export default Footer;
