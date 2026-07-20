import React, { useEffect, useState } from "react";
import { Check, Leaf, Hand, Flame, Clock3, PackageCheck } from "lucide-react";
import Header from "../Header/Header";
import PageHero from "../PageHero/PageHero";
import "../PageHero/PageSections.css";

const FEATURES = [
  "100% Natural Ingredients",
  "Traditional Handcrafted Process",
  "Long Lasting Premium Fragrance",
  "Trusted Quality Since 2010",
];

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Happy Customers" },
  { value: "100%", label: "Natural Products" },
];

const PROCESS = [
  {
    icon: Leaf,
    title: "Sourcing",
    copy: "Raw botanicals, resins and oils are hand-picked from trusted growers for purity and character.",
  },
  {
    icon: Hand,
    title: "Blending",
    copy: "Ingredients are measured and mixed by hand, following ratios refined over 15 years.",
  },
  {
    icon: Flame,
    title: "Rolling",
    copy: "Each stick is shaped and rolled individually — no two batches are ever quite the same.",
  },
  {
    icon: Clock3,
    title: "Curing",
    copy: "Sticks rest and dry slowly over several days, letting the fragrance settle into the base.",
  },
  {
    icon: PackageCheck,
    title: "Packaging",
    copy: "Finished pieces are inspected and packed by hand before they leave our workshop.",
  },
];

const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const fade = (delay = "0ms") =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`;

  return (
    <>
      <Header disableScrollColor />
      <main>
        <PageHero
          label="About Us"
          title="Where Tradition Meets Lasting Fragrance"
          subtitle="Crafted with care since 2010 — a story of natural ingredients, patience and timeless technique."
          image="/heroPage.png"
        />

        <section id="about" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Left Image */}
              <div className={`relative ${fade()}`}>
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://m.media-amazon.com/images/I/616ooPgOAWL._AC_UF350,350_QL80_.jpg"
                    alt="Premium Incense"
                    className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-8 -right-6 hidden rounded-2xl bg-[#241611] p-6 shadow-xl lg:block border border-[#c9a227]/25">
                  <p className="text-4xl font-serif font-semibold text-[#c9a227]">
                    15+
                  </p>
                  <p className="mt-1 text-sm text-[#f2e9dc]/70">
                    Years of Craftsmanship
                  </p>
                </div>
              </div>

              {/* Right Content */}
              <div
                className={fade()}
                style={{ transitionDelay: mounted ? "120ms" : "0ms" }}
              >
                <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a227]">
                  About Us
                </span>

                <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#241611] md:text-5xl">
                  Where Tradition Meets
                  <span className="block font-semibold text-[#c9a227]">
                    Lasting Fragrance
                  </span>
                </h2>

                {/* Gold flourish divider */}
                <div className="flex items-center gap-3 mt-6 mb-2 max-w-[220px]">
                  <span className="h-px flex-1 bg-[#241611]/12" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#c9a227]" />
                </div>

                <div className="mt-6 space-y-6 text-lg leading-8 text-[#6b5f4f]">
                  <p>
                    Every incense stick is carefully crafted using traditional
                    techniques and premium natural ingredients to create an
                    aroma that brings peace, positivity and elegance into
                    every home.
                  </p>

                  <p>
                    Our passion is to preserve the timeless art of fragrance
                    while delivering exceptional quality that transforms
                    ordinary moments into memorable experiences.
                  </p>
                </div>

                {/* Features */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2">
                  {FEATURES.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-[#241611]/8 bg-[#f5efe3]/70 p-4 transition-colors duration-300 hover:border-[#c9a227]/40 hover:bg-[#f5efe3]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/15">
                        <Check className="h-5 w-5 text-[#8a6d2f]" />
                      </div>

                      <p className="text-sm font-medium text-[#241611]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#241611]/10 pt-8">
                  {STATS.map(({ value, label }) => (
                    <div key={label}>
                      <h3 className="font-serif text-3xl font-bold text-[#c9a227]">
                        {value}
                      </h3>
                      <p className="mt-2 text-sm text-[#8a7c6a]">{label}</p>
                    </div>
                  ))}
                </div>

                <button className="mt-12 rounded-full bg-[#241611] px-8 py-4 font-medium text-[#f2e9dc] transition-colors duration-300 hover:bg-[#c9a227] hover:text-[#241611]">
                  Discover Our Collection
                </button>
              </div>
            </div>

            {/* The Craft — signature process section */}
            <div
              className={`mt-28 pt-16 border-t border-[#241611]/10 ${fade()}`}
              style={{ transitionDelay: mounted ? "240ms" : "0ms" }}
            >
              <div className="max-w-xl mx-auto text-center mb-14">
                <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a227] mb-2">
                  From Workshop to Home
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611]">
                  The Craft
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                {PROCESS.map(({ icon: Icon, title, copy }, i) => (
                  <div key={title} className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-serif text-sm font-semibold text-[#c9a227]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-[#241611]/10" />
                      <Icon size={16} className="text-[#8a6d2f]" />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-[#241611] mb-2">
                      {title}
                    </h4>
                    <p className="text-[#6b5f4f] text-sm leading-relaxed">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;