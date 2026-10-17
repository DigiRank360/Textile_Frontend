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
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
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
    if (!productName) return "";

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
  const [phoneValue, setPhoneValue] = useState("91");
  const [phoneError, setPhoneError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const businessPhone = "919981997440";
  const businessEmail = "eaglefabrichub@gmail.com";

  const businessAddress =
    "A-182 English Villas, Kolar Road, Bhopal, Madhya Pradesh 462042 (India)";

  const mapAddress = encodeURIComponent(businessAddress);

  const whatsappMessage = encodeURIComponent(
    productName
      ? `Hello, I would like to get a quote for ${productName}.`
      : "Hello, I would like to know more about your textile products.",
  );

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

  const handlePhoneChange = (value, country) => {
    const numericValue = String(value || "").replace(/\D/g, "");
    const dialCode = String(country?.dialCode || selectedCountryCode || "").replace(/\D/g, "");

    // react-phone-input-2 expects the complete value: dial code + national number.
    // Keep that full value in phoneValue, but save only the national number in formData.
    setPhoneValue(numericValue);

    const nationalNumber =
      dialCode && numericValue.startsWith(dialCode)
        ? numericValue.slice(dialCode.length)
        : numericValue;

    setFormData((prev) => ({
      ...prev,
      phone: nationalNumber,
    }));

    if (dialCode) {
      setSelectedCountryCode(dialCode);
    }

    if (country?.name) {
      setSelectedCountryName(country.name);
    }

    if (!nationalNumber) {
      setPhoneError("Phone number is required.");
    } else if (nationalNumber.length < 6 || nationalNumber.length > 15) {
      setPhoneError("Please enter a valid phone number.");
    } else {
      setPhoneError("");
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

    if (cleanPhone.length < 6 || cleanPhone.length > 15) {
      setPhoneError("Please enter a valid phone number.");
      alert("Please enter a valid phone number.");
      return false;
    }

    setPhoneError("");

    if (!cleanMessage) {
      alert("Please enter your message.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    try {

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        // Keep phone and countryCode separate to avoid submitting the dial code twice.
        phone: formData.phone.replace(/\D/g, ""),
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
            `Unable to submit enquiry. Server returned ${response.status}.`,
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
      setPhoneValue("91");
      setPhoneError("");

      window.setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      alert(
        error.message || "Unable to submit your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Phone,
      title: "Call Us",
      text: "+91 99819 97440",
      href: "tel:+919981997440",
      action: "Call now",
    },
    {
      icon: Mail,
      title: "Email Us",
      text: businessEmail,
      href: `mailto:${businessEmail}`,
      action: "Send email",
    },
    
  ];

  const inputClass =
    "w-full rounded-xl border border-[#241611]/10 bg-white " +
    "pl-11 pr-4 py-3.5 text-sm text-[#241611] placeholder-[#8a7c6a] " +
    "outline-none transition-all duration-300 " +
    "focus:border-[#c9a227] focus:ring-4 focus:ring-[#c9a227]/10";

  return (
    <>
      <PageHero
        label={productName ? "Get Quote" : "Contact Us"}
        title={
          productName ? "Request Your Product Quote" : "We’re Here to Help"
        }
        subtitle={
          productName
            ? "Share your requirement and our team will provide product details, pricing and availability."
            : "Contact our team for product information, bulk orders, custom fabrics or business enquiries."
        }
        image="/heroPage.jpg"
      />

      <main className="bg-[#fbf8f2]">
        {/* Contact Information and Form */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Left Side */}
              <div>
                <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                  Get in Touch
                </span>

                <h2 className="mb-5 max-w-xl font-serif text-3xl font-semibold leading-tight text-[#241611] md:text-4xl">
                  Let’s Find the Perfect Fabric for You
                </h2>

                <p className="mb-8 max-w-xl text-base leading-7 text-[#6b5f4f]">
                  Our team can assist you with product selection, wholesale
                  enquiries, custom blends, pricing and order-related questions.
                </p>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {contactItems.map((item) => {
                    const ItemIcon = item.icon;

                    const content = (
                      <div
                        className="
                          group h-full rounded-2xl border border-[#241611]/8
                          bg-white p-3 transition-all duration-300
                          hover:-translate-y-1 hover:border-[#c9a227]/40
                          hover:shadow-[0_16px_45px_rgba(36,22,17,0.08)]
                        "
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c9a227]/10 text-[#c9a227]">
                            <ItemIcon size={19} />
                          </div>

                          {item.href && (
                            <ArrowUpRight
                              size={17}
                              className="text-[#8a7c6a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c9a227]"
                            />
                          )}
                        </div>

                        <h3 className="mb-1.5 text-sm font-semibold text-[#241611]">
                          {item.title}
                        </h3>

                        <p className="min-h-[42px] break-words text-sm leading-6 text-[#6b5f4f]">
                          {item.text}
                        </p>

                        <span className="mt-3 block text-xs font-medium text-[#a48623]">
                          {item.action}
                        </span>
                      </div>
                    );

                    return item.href ? (
                      <a key={item.title} href={item.href} className="block">
                        {content}
                      </a>
                    ) : (
                      <div key={item.title}>{content}</div>
                    );
                  })}
                </div>

                {/* WhatsApp Button */}
               
              </div>

              {/* Right Form */}
              <div className="rounded-[28px] border border-[#241611]/5 bg-white p-6 shadow-[0_24px_70px_rgba(36,22,17,0.08)] sm:p-8 md:p-10">
                <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                  {productName ? "Request a Quote" : "Send an Enquiry"}
                </span>

                <h3 className="mb-2 font-serif text-2xl font-semibold text-[#241611] md:text-3xl">
                  {productName ? "Get Product Pricing" : "How Can We Help?"}
                </h3>

                <p className="mb-7 text-sm leading-6 text-[#8a7c6a]">
                  Fill in your details and our team will contact you within one
                  business day.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {productName && (
                    <div className="relative mb-4">
                      <Package
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]"
                      />

                      <input
                        type="text"
                        value={productName}
                        readOnly
                        aria-label="Selected product"
                        className={`${inputClass} cursor-default bg-[#f8f4ec]`}
                      />
                    </div>
                  )}

                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <User
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]"
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

                    <div className="relative z-20">
                      <PhoneInput
                        country="in"
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        countryCodeEditable={false}
                        enableLongNumbers={15}
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
                          inputMode: "tel",
                          "aria-label": "Phone number",
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        inputStyle={{
                          width: "100%",
                          height: "49px",
                          backgroundColor: "#ffffff",
                          border: "1px solid rgba(36,22,17,0.1)",
                          borderRadius: "12px",
                          color: "#241611",
                          fontSize: "14px",
                          paddingLeft: "56px",
                        }}
                        buttonStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid rgba(36,22,17,0.1)",
                          borderRadius: "12px 0 0 12px",
                        }}
                        dropdownStyle={{
                          width: "320px",
                          maxWidth: "calc(100vw - 48px)",
                          maxHeight: "300px",
                          borderRadius: "12px",
                          zIndex: 99999,
                        }}
                        searchStyle={{
                          width: "calc(100% - 20px)",
                          margin: "10px",
                          padding: "10px",
                          border: "1px solid rgba(36,22,17,0.15)",
                          borderRadius: "8px",
                          outline: "none",
                        }}
                      />

                      {phoneError && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]"
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

                  <div className="relative mb-5">
                    <MessageSquare
                      size={17}
                      className="pointer-events-none absolute left-4 top-4 text-[#c9a227]"
                    />

                    <textarea
                      name="message"
                      rows={5}
                      placeholder={
                        productName
                          ? "Mention quantity, packaging or product requirement *"
                          : "Tell us about your product or fabric requirement *"
                      }
                      className={`${inputClass} resize-none pt-3.5`}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      flex w-full items-center justify-center gap-2
                      rounded-md bg-[#111111] py-4 text-sm font-semibold
                      text-white transition-all duration-200
                      hover:bg-[#c9a227] hover:text-[#111111]
                      disabled:cursor-not-allowed disabled:opacity-60
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f2e9dc]/30 border-t-[#f2e9dc]" />
                        Sending Enquiry...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 size={17} />
                        Enquiry Sent Successfully
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        {productName ? "Request Product Quote" : "Send Enquiry"}
                      </>
                    )}
                  </button>

                  {isSuccess && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <p>
                        Thank you. Our team will contact you within 24 hours.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-5 text-[#8a7c6a]">
                    <ShieldCheck
                      size={15}
                      className="mt-0.5 flex-shrink-0 text-[#c9a227]"
                    />
                    <span>
                      Your information is secure and will only be used to
                      respond to your enquiry.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
            <div className="overflow-hidden rounded-[28px] border border-[#241611]/8 bg-white shadow-[0_22px_65px_rgba(36,22,17,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr]">
                {/* Map Information */}
                <div className="flex flex-col justify-center bg-[#241611] p-7 text-white sm:p-9 md:p-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a227]/15 text-[#d7b542]">
                    <MapPin size={22} />
                  </div>

                  <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d7b542]">
                    Our Location
                  </span>

                  <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
                    Visit Our Office 
                  </h2>

                  <p className="mb-6 text-sm leading-7 text-white/70">
                    {businessAddress}
                  </p>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex w-fit items-center gap-2 rounded-md
                      bg-[#111111] px-5 py-3 text-sm font-semibold
                      text-white transition-all duration-200
                      hover:bg-[#c9a227] hover:text-[#111111]
                    "
                  >
                    Get Directions
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* Google Maps Embed */}
                <div className="h-[380px] w-full lg:h-[440px]">
                  <iframe
                    title="Eagle Textile Location"
                    src={`https://www.google.com/maps?q=${mapAddress}&output=embed`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;