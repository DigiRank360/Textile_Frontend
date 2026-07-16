import React from "react";
import { Check } from "lucide-react";
import Header from "../Header/Header";
import PageHero from "../PageHero/PageHero";
import "../PageHero/PageSections.css";

const About = () => {
  const features = [
    "100% Natural Ingredients",
    "Traditional Handcrafted Process",
    "Long Lasting Premium Fragrance",
    "Trusted Quality Since 2010",
  ];

  return (
    <>
      <Header disableScrollColor />
      <main>
 <PageHero
  label="About Us"
  title="Where Tradition Meets Lasting Fragrance"
  subtitle="Crafted with care since 2010 — a story of natural ingredients, patience and timeless technique."
/>

        <section id="about" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Left Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://m.media-amazon.com/images/I/616ooPgOAWL._AC_UF350,350_QL80_.jpg"
                    alt="Premium Incense"
                    className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-8 -right-6 hidden rounded-2xl bg-[#161616] p-6 shadow-xl lg:block border border-[#d4af37]/20">
                  <p className="text-4xl font-bold text-[#d4af37]">15+</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Years of Craftsmanship
                  </p>
                </div>
              </div>

              {/* Right Content */}
              <div>
                <span className="tracking-[0.35em] text-sm font-semibold uppercase text-[#b8912e]">
                  ABOUT US
                </span>

                <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">
                  Where Tradition Meets
                  <span className="block font-semibold text-[#b8912e]">
                    Lasting Fragrance
                  </span>
                </h2>

                <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
                  <p>
                    Every incense stick is carefully crafted using traditional
                    techniques and premium natural ingredients to create an aroma
                    that brings peace, positivity and elegance into every home.
                  </p>

                  <p>
                    Our passion is to preserve the timeless art of fragrance while
                    delivering exceptional quality that transforms ordinary moments
                    into memorable experiences.
                  </p>
                </div>

                {/* Features */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2">
                  {features.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:border-[#d4af37]/40 hover:bg-amber-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37]/15">
                        <Check className="h-5 w-5 text-[#b8912e]" />
                      </div>

                      <p className="text-sm font-medium text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-6 border-t pt-8">
                  <div>
                    <h3 className="text-3xl font-bold text-[#b8912e]">15+</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Years Experience
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-[#b8912e]">5000+</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Happy Customers
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-[#b8912e]">100%</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Natural Products
                    </p>
                  </div>
                </div>

                <button className="mt-12 rounded-full bg-[#d4af37] px-8 py-4 font-medium text-[#111] transition hover:bg-[#e7c65b] hover:shadow-[0_10px_25px_rgba(212,175,55,.25)]">
                  Discover Our Collection
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
     
    </>
  );
};

export default About;