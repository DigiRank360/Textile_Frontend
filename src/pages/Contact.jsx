
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PhoneInputPackage from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  MapPin,
  Clock,
  Sparkles,
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  Package,
} from "lucide-react";

import PageHero from "../components/PageHero/PageHero";
import API_URL from "../components/config/config";


const PhoneInput =
  PhoneInputPackage?.default?.default ||
  PhoneInputPackage?.default ||
  PhoneInputPackage;

const Contact = () => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId") || "";
  const productName = searchParams.get("product") || "";

  const initialMessage = useMemo(() => {
    if (!productName) {
      return "";
    }

    return `I would like to get a quote for ${productName}.`;
  }, [productName]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    productId: "",
    productName: "",
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState("91");
  const [selectedCountryName, setSelectedCountryName] = useState("India");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      productId,
      productName,
      message:
        productId || productName
          ? prev.message || initialMessage
          : prev.message,
    }));
  }, [productId, productName, initialMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handlePhoneChange = (phone, country) => {
    const numericPhone = String(phone || "").replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      phone: numericPhone,
    }));

    if (country?.dialCode) {
      setSelectedCountryCode(country.dialCode);
    }

    if (country?.name) {
      setSelectedCountryName(country.name);
    }

    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const validateForm = () => {
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.replace(/\D/g, "");
    const cleanMessage = formData.message.trim();

    if (cleanName.length < 2) {
      alert("Please enter your full name.");
      return false;
    }

    if (!cleanEmail) {
      alert("Please enter your email address.");
      return false;
    }

    const nationalNumber = cleanPhone.startsWith(selectedCountryCode)
      ? cleanPhone.slice(selectedCountryCode.length)
      : cleanPhone;

    if (nationalNumber.length < 6) {
      alert("Please enter a valid phone number.");
      return false;
    }

    if (!cleanMessage) {
      alert("Please enter your message.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const cleanPhone = formData.phone.replace(/\D/g, "");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),

        // Complete international phone number
        phone: `+${cleanPhone}`,

        // Separate country information
        countryCode: `+${selectedCountryCode}`,
        country: selectedCountryName,

        message: formData.message.trim(),
        productId: formData.productId || null,
        productName: formData.productName || null,
      };

      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid server response:", jsonError);
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Unable to submit enquiry. Server returned ${response.status}.`
        );
      }

      if (data && data.success === false) {
        throw new Error(data.message || "Unable to submit enquiry.");
      }

      setIsSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: initialMessage,
        productId,
        productName,
      });

      setSelectedCountryCode("91");
      setSelectedCountryName("India");

      window.setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      alert(
        error.message ||
          "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoItems = [
    {
      icon: MapPin,
      title: "Visit",
      text: "A-182 ENGLISH VILLAS KOLAR ROAD BHOPAL-462042",
    },
    {
      icon: Sparkles,
      title: "Custom Blends",
      text: "Tell us your mood, occasion or scent preference",
    },
    {
      icon: Mail,
      title: "Email Us",
      text: "info@eagleincensesticks.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      text: "+91 9981997440",
    },
  ];

  const inputClass =
    "w-full bg-[#f5efe3] border border-[#241611]/10 rounded-lg " +
    "pl-11 pr-4 py-3 text-sm text-[#241611] placeholder-[#8a7c6a] " +
    "outline-none focus:border-[#c9a227] focus:bg-white transition-colors";

  return (
    <>
      <PageHero
        label={productName ? "Get Quote" : "Contact"}
        title={
          productName
            ? "Request Your Product Quote"
            : "Let's Create Your Ritual"
        }
        subtitle={
          productName
            ? "Share your contact details and our team will provide pricing and product information."
            : "Share your fragrance story with us and we'll help you discover the perfect incense experience."
        }
        image="/heroPage.png"
      />

      <main className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
            {/* Left Information Panel */}
            <div>
              <span className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-3 block">
                Get in Touch
              </span>

              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611] mb-5 leading-tight">
                We'd Love to Hear About Your Fragrance Journey
              </h2>

              <p className="text-[#6b5f4f] text-base leading-relaxed mb-10">
                Whether it's a custom blend or a question about our
                collections, our team is here to help you find your perfect
                ritual.
              </p>

              <div className="flex flex-col gap-6">
                {infoItems.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4"
                    >
                      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#c9a227]/10 text-[#c9a227] flex-shrink-0">
                        <ItemIcon size={18} />
                      </div>

                      <div>
                        <h4 className="text-[#241611] font-medium text-sm mb-0.5">
                          {item.title}
                        </h4>

                        <p className="text-[#8a7c6a] text-sm">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="bg-[#f5efe3] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-[#241611]/5">
              <span className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-2 block">
                {productName ? "Request a Quote" : "Send an Enquiry"}
              </span>

              <h3 className="font-serif text-2xl font-semibold text-[#241611] mb-2">
                {productName
                  ? "Get Product Pricing"
                  : "Start Your Ritual"}
              </h3>

              <p className="text-[#8a7c6a] text-sm mb-8">
                Fill in your details and we'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Selected Product */}
                {productName && (
                  <div className="relative mb-4">
                    <Package
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227] pointer-events-none"
                    />

                    <input
                      type="text"
                      value={productName}
                      readOnly
                      aria-label="Selected product"
                      className={`${inputClass} cursor-default bg-white`}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Full Name */}
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227] pointer-events-none"
                    />

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      className={inputClass}
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative z-20">
                    <PhoneInput
                      country="in"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      enableSearch
                      disableSearchIcon={false}
                      searchPlaceholder="Search country..."
                      preferredCountries={[
                        "in",
                        "us",
                        "gb",
                        "ae",
                        "ca",
                        "au",
                        "sg",
                      ]}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoComplete: "tel",
                        "aria-label": "Phone number",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "46px",
                        backgroundColor: "#f5efe3",
                        border:
                          "1px solid rgba(36, 22, 17, 0.1)",
                        borderRadius: "8px",
                        color: "#241611",
                        fontSize: "14px",
                        paddingLeft: "56px",
                      }}
                      buttonStyle={{
                        backgroundColor: "#f5efe3",
                        border:
                          "1px solid rgba(36, 22, 17, 0.1)",
                        borderRadius: "8px 0 0 8px",
                      }}
                      dropdownStyle={{
                        width: "320px",
                        maxWidth: "calc(100vw - 48px)",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        zIndex: 99999,
                      }}
                      searchStyle={{
                        width: "calc(100% - 20px)",
                        margin: "10px",
                        padding: "10px",
                        border:
                          "1px solid rgba(36, 22, 17, 0.15)",
                        borderRadius: "6px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="relative mb-4">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227] pointer-events-none"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    className={inputClass}
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative mb-6">
                  <MessageSquare
                    size={16}
                    className="absolute left-4 top-3.5 text-[#c9a227] pointer-events-none"
                  />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder={
                      productName
                        ? "Tell us about your product quantity or requirement *"
                        : "Tell us about your fragrance preference *"
                    }
                    className={`${inputClass} pt-3 resize-none`}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#241611] hover:bg-[#3a281f] disabled:opacity-60 disabled:cursor-not-allowed text-[#f2e9dc] font-medium text-sm py-3.5 rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#f2e9dc]/30 border-t-[#f2e9dc] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 size={16} />
                      Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {productName
                        ? "Request Quote"
                        : "Send Enquiry"}
                    </>
                  )}
                </button>

                {isSuccess && (
                  <p className="text-[#8a6d2f] text-sm text-center font-medium mt-4">
                    Thank you! Our team will contact you within 24 hours.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;

