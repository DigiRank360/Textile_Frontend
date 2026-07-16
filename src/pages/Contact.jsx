import React, { useState } from "react";
import { MapPin, Clock, Sparkles, Mail, Phone, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import API_URL from "../components/config/config";
// import contactHero from "../assets/images/contactHero.png";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoItems = [
    { icon: MapPin, title: "Visit Our Studio", text: "123 Fragrance Lane, Varanasi" },
    { icon: Clock, title: "Studio Hours", text: "Open daily • 10:00 AM – 8:00 PM" },
    { icon: Sparkles, title: "Custom Blends", text: "Tell us your mood, occasion or scent preference" },
    { icon: Mail, title: "Email Us", text: "hello@yourbrand.com" },
    { icon: Phone, title: "Call Us", text: "+91 98765 43210" },
  ];

  const inputClass =
    "w-full bg-[#f5efe3] border border-[#241611]/10 rounded-lg pl-11 pr-4 py-3 text-sm text-[#241611] placeholder-[#8a7c6a] outline-none focus:border-[#c9a227] focus:bg-white transition-colors";

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's Create Your Ritual"
        subtitle="Share your fragrance story with us and we'll help you discover the perfect incense experience."
        // image={contactHero}
      />

      <main className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">

            {/* Left: Info Panel */}
            <div>
              <span className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-3 block">
                Get in Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611] mb-5 leading-tight">
                We'd Love to Hear About Your Fragrance Journey
              </h2>
              <p className="text-[#6b5f4f] text-base leading-relaxed mb-10">
                Whether it's a custom blend or a question about our collections,
                our team is here to help you find your perfect ritual.
              </p>

              <div className="flex flex-col gap-6">
                {infoItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#c9a227]/10 text-[#c9a227] flex-shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[#241611] font-medium text-sm mb-0.5">{item.title}</h4>
                      <p className="text-[#8a7c6a] text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form Panel */}
            <div className="bg-[#f5efe3] rounded-3xl p-8 md:p-10 shadow-xl shadow-[#241611]/5">
              <span className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-2 block">
                Send an Enquiry
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#241611] mb-2">
                Start Your Ritual
              </h3>
              <p className="text-[#8a7c6a] text-sm mb-8">
                Fill in your details and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                    <input
                      type="text" name="name" placeholder="Full Name *"
                      className={inputClass} value={formData.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                    <input
                      type="tel" name="phone" placeholder="Phone Number *"
                      className={inputClass} value={formData.phone} onChange={handleChange} required
                    />
                  </div>
                </div>

                <div className="relative mb-4">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                  <input
                    type="email" name="email" placeholder="Email Address *"
                    className={inputClass} value={formData.email} onChange={handleChange} required
                  />
                </div>

                <div className="relative mb-6">
                  <MessageSquare size={16} className="absolute left-4 top-3.5 text-[#c9a227]" />
                  <textarea
                    name="message" rows={4} placeholder="Tell us about your fragrance preference *"
                    className={`${inputClass} pt-3 resize-none`}
                    value={formData.message} onChange={handleChange} required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#241611] hover:bg-[#3a281f] disabled:opacity-60 text-[#f2e9dc] font-medium text-sm py-3.5 rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 size={16} /> Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Enquiry
                    </>
                  )}
                </button>

                {isSuccess && (
                  <p className="text-[#c9a227] text-sm text-center font-medium mt-4">
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