import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, Phone as PhoneIcon, Mail as MailIcon, MapPin as MapPinIcon, ShieldCheck } from 'lucide-react';
import API_URL from '../config/config';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Server Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    { icon: PhoneIcon, label: 'Phone', value: '+91 98765 43210' },
    { icon: MailIcon, label: 'Email', value: 'info@sanwariyavatika.com' },
    { icon: MapPinIcon, label: 'Address', value: 'Mumbai, India' },
  ];

  const perks = [
    '100% Verified Properties',
    'Legal Documentation Support',
    'Best Market Prices',
    'Free Property Consultation',
  ];

  const inputClass =
    'w-full bg-white border border-[#2B2420]/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#2B2420] placeholder-[#8B6F47]/60 outline-none focus:border-[#A9812C] transition-colors';

  return (
    <section className="bg-[#E8E0D4] py-20" id="contact">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12">

        {/* Left — Info */}
        <div>
          <span className="text-[13px] font-semibold tracking-wider uppercase text-[#A9812C] mb-3 block">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#2B2420] mb-4 leading-tight">
            Find Your <span className="text-[#A9812C]">Dream Property</span>
          </h2>
          <p className="text-[#6b6156] text-sm leading-relaxed mb-8">
            Share your requirement and our experts will help you find the perfect property for your needs and budget.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {contactDetails.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2B2420]/5 text-[#A9812C] flex-shrink-0">
                  <d.icon size={16} />
                </div>
                <p className="text-sm text-[#2B2420]">
                  <span className="text-[#6b6156]">{d.label}:</span> {d.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white/60 border border-[#2B2420]/10 rounded-2xl p-5">
            <h4 className="flex items-center gap-2 text-[#2B2420] font-medium text-sm mb-3">
              <ShieldCheck size={16} className="text-[#A9812C]" />
              Why Choose Us?
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-[#6b6156] text-sm">
                  <CheckCircle2 size={14} className="text-[#A9812C] mt-0.5 flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-[#2B2420]/5 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9812C]" />
              <input
                type="text" name="name" placeholder="Full Name *"
                className={inputClass} value={formData.name} onChange={handleChange} required
              />
            </div>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9812C]" />
              <input
                type="tel" name="phone" placeholder="Phone Number *"
                className={inputClass} value={formData.phone} onChange={handleChange} required
              />
            </div>
          </div>

          <div className="relative mb-4">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9812C]" />
            <input
              type="email" name="email" placeholder="Email Address *"
              className={inputClass} value={formData.email} onChange={handleChange} required
            />
          </div>

          <div className="relative mb-5">
            <MessageSquare size={16} className="absolute left-3.5 top-3 text-[#A9812C]" />
            <textarea
              name="message" rows={3} placeholder="Tell us about your requirement *"
              className={`${inputClass} pt-2.5 resize-none`}
              value={formData.message} onChange={handleChange} required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#2B2420] hover:bg-[#3a3128] disabled:opacity-60 text-[#E8E0D4] font-medium text-sm py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? (
              'Sending...'
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
            <p className="text-[#A9812C] text-sm text-center font-medium mt-3">
              Thank you! Our team will contact you within 24 hours.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;