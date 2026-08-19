import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919981997440";

  const message = encodeURIComponent(
    "Hello, I'm interested in your products. Please share more details."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed left-5 bottom-5 z-[9999]
        flex items-center justify-center
        w-16 h-16
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_0_25px_rgba(37,211,102,0.7)]
        hover:scale-110
        hover:shadow-[0_0_45px_rgba(37,211,102,0.95)]
        transition-all
        duration-300
        group
      "
    >
      {/* Glowing Ring */}
      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-[#25D366]
          opacity-40
          animate-ping
        "
      />

      {/* Outer Glow */}
      <span
        className="
          absolute
          -inset-2
          rounded-full
          bg-[#25D366]/30
          blur-xl
          group-hover:bg-[#25D366]/50
          transition-all
          duration-300
        "
      />

      {/* WhatsApp Icon */}
      <FaWhatsapp className="relative z-10 text-4xl" />
    </a>
  );
};

export default WhatsAppButton;