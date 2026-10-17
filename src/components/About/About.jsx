import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Leaf,
  Hand,
  Flame,
  Clock3,
  PackageCheck,
  Quote,
  ArrowRight,
} from "lucide-react";

import PageHero from "../PageHero/PageHero";
import "../PageHero/PageSections.css";

import about from "../../assets/images/about.jpg";
import founder from "../../assets/images/founder.jpeg";

const FEATURES = [
  "Premium Quality Yarns & Fibres",
  "Skilled Weaving & Finishing",
  "Colour-Fast, Durable Fabrics",
  "Trusted Quality You Can Rely On",
];

const STATS = [
  {
    value: "5+",
    label: "Years of Experience",
  },
  {
    value: "500+",
    label: "Happy Customers",
  },
  {
    value: "100%",
    label: "Quality Assured",
  },
];

const PROCESS = [
  {
    icon: Leaf,
    title: "Yarn Sourcing",
    copy: "Cotton, silk and blended yarns are carefully selected from trusted suppliers for strength and quality.",
  },
  {
    icon: Hand,
    title: "Weaving",
    copy: "Skilled weavers and modern looms create fabrics with precise texture, weight and drape.",
  },
  {
    icon: Flame,
    title: "Dyeing & Printing",
    copy: "Colour-fast dyes and detailed prints deliver vibrant, long-lasting shades in every batch.",
  },
  {
    icon: Clock3,
    title: "Finishing",
    copy: "Fabrics are softened, treated and inspected to achieve a smooth, consistent finish.",
  },
  {
    icon: PackageCheck,
    title: "Packaging",
    copy: "Every finished product is inspected and securely packed before leaving our facility for customers.",
  },
];

const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const fade = () =>
    `transition-all duration-700 ease-out ${
      mounted
        ? "translate-y-0 opacity-100"
        : "translate-y-4 opacity-0"
    }`;

  return (
    <>

      <main>
        <PageHero
          label="About Us"
          title="Where Tradition Meets Lasting Quality"
          subtitle="Crafted with care — a story of quality fabrics, patience and timeless techniques."
          image="/heroPage.jpg"
        />

        <section
          id="about"
          className="overflow-hidden bg-white py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Founder Section */}
            <div
              className={fade()}
              style={{
                transitionDelay: mounted ? "80ms" : "0ms",
              }}
            >
              <div className="mb-14 text-center lg:mb-20">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                  The Vision Behind Eagle Textile
                </span>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#241611] md:text-5xl">
                  Meet Our Founder
                </h2>

                <div className="mx-auto mt-6 flex max-w-[200px] items-center gap-3">
                  <span className="h-px flex-1 bg-[#241611]/15" />
                  <span className="h-2 w-2 rotate-45 bg-[#c9a227]" />
                  <span className="h-px flex-1 bg-[#241611]/15" />
                </div>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#6b5f4f]">
                  A journey inspired by traditional craftsmanship, quality
                  materials and the belief that great fabric inspires great
                  design and everyday comfort.
                </p>
              </div>

              <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                {/* Founder Image */}
                <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
                  <div className="absolute -left-5 -top-5 h-full w-full rounded-[30px] border border-[#c9a227]/30" />

                  <div className="absolute -bottom-8 -right-8 hidden h-40 w-40 rounded-full bg-[#f5efe3] lg:block" />

                  <div className="relative overflow-hidden rounded-[30px] bg-[#f5efe3] shadow-[0_25px_70px_rgba(36,22,17,0.18)]">
                    <img
                      src={founder}
                      alt="Kodanda Pani, Founder of Eagle Textile"
                      className="h-[500px] w-full object-cover object-top transition-transform duration-700 hover:scale-105 sm:h-[600px]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/70 via-[#241611]/5 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e3bd52]">
                        Founder
                      </p>

                      <h3 className="mt-2 font-serif text-3xl font-semibold text-white">
                        Kodanda Pani
                      </h3>

                      <p className="mt-2 text-sm text-white/75">
                        Founder, Eagle Textile
                      </p>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-6 hidden rounded-2xl bg-[#c9a227] px-6 py-5 shadow-xl sm:block">
                    <p className="font-serif text-3xl font-bold text-[#241611]">
                      2023
                    </p>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#241611]/70">
                      Our Journey Began
                    </p>
                  </div>
                </div>

                {/* Founder Content */}
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Founder&apos;s Vision
                  </span>

                  <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#241611] md:text-5xl lg:text-[54px]">
                    A Legacy Built on
                    <span className="block font-semibold text-[#c9a227]">
                      Trust and Quality
                    </span>
                  </h2>

                  <div className="mb-2 mt-6 flex max-w-[220px] items-center gap-3">
                    <span className="h-px flex-1 bg-[#241611]/15" />
                    <span className="h-2 w-2 rotate-45 bg-[#c9a227]" />
                  </div>

                  <div className="mt-7 space-y-5 text-base leading-8 text-[#6b5f4f] sm:text-lg">
                    <p>
                      Under the leadership of{" "}
                      <strong className="font-semibold text-[#241611]">
                        Kodanda Pani
                      </strong>
                      , Eagle Textile was founded with a meaningful
                      vision to preserve the traditional art of textile making
                      while creating fabrics that enrich everyday life.
                    </p>

                    <p>
                      His dedication to purity, craftsmanship and customer
                      trust continues to guide every product we create. He
                      believes fabric is more than a material; it is an
                      experience of comfort, colour and confidence that
                      reaches every home and wardrobe.
                    </p>

                    <p>
                      What began as a passion for authentic textiles has grown
                      into a trusted brand known for consistent
                      quality, carefully selected yarns and long-lasting
                      fabrics.
                    </p>
                  </div>

                  {/* Founder Quote */}
                  <div className="relative mt-9 overflow-hidden rounded-3xl border border-[#c9a227]/25 bg-[#f8f3ea] p-7 sm:p-9">
                    <Quote className="absolute right-6 top-5 h-16 w-16 text-[#c9a227]/10" />

                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a227]">
                        <Quote className="h-5 w-5 text-[#241611]" />
                      </div>

                      <p className="mt-5 font-serif text-xl italic leading-9 text-[#38251d] sm:text-2xl">
                        “True quality is more than a fabric. It is an
                        experience of comfort, trust and lasting
                        value in everything we deliver.”
                      </p>

                      <div className="mt-6 border-t border-[#241611]/10 pt-5">
                        <h4 className="font-serif text-xl font-semibold text-[#241611]">
                          Kodanda Pani
                        </h4>

                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7c6a]">
                          Founder, Eagle Textile
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Company Section */}
            <div
              className={`mt-5 border-t border-[#241611]/10 pt-10 lg:mt-10 lg:pt-10 ${fade()}`}
              style={{
                transitionDelay: mounted ? "160ms" : "0ms",
              }}
            >
              <div className="mb-14 text-center lg:mb-20">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                  About Eagle Textile
                </span>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#241611] md:text-5xl">
                  Our Story and Purpose
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b5f4f]">
                  Rooted in tradition and guided by quality, we create
                  fabrics designed to make everyday wear and spaces
                  comfortable, stylish and memorable.
                </p>
              </div>

              <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                {/* About Image */}
                <div className="relative">
                  <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-full border border-[#c9a227]/30 lg:block" />

                  <div className="absolute -bottom-8 -right-8 hidden h-36 w-36 rounded-full bg-[#f5efe3] lg:block" />

                  <div className="relative overflow-hidden rounded-[30px] shadow-[0_25px_70px_rgba(36,22,17,0.18)]">
                    <img
                      src={about}
                      alt="Premium Eagle Textile fabrics"
                      className="h-[480px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[580px] lg:h-[650px]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/35 via-transparent to-transparent" />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:left-8 sm:right-auto sm:max-w-[280px]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]">
                      Crafted with Purpose
                    </p>

                    <p className="mt-2 font-serif text-xl font-semibold leading-snug text-[#241611]">
                      Authentic fabrics created with patience and care.
                    </p>
                  </div>
                </div>

                {/* About Content */}
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Our Story
                  </span>

                  <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#241611] md:text-5xl lg:text-[56px]">
                    Where Tradition Meets
                    <span className="block font-semibold text-[#c9a227]">
                      Lasting Quality
                    </span>
                  </h2>

                  <div className="mb-2 mt-6 flex max-w-[220px] items-center gap-3">
                    <span className="h-px flex-1 bg-[#241611]/15" />
                    <span className="h-2 w-2 rotate-45 bg-[#c9a227]" />
                  </div>

                  <div className="mt-7 space-y-5 text-base leading-8 text-[#6b5f4f] sm:text-lg">
                    <p>
                      At Eagle Textile, every fabric is created with
                      deep respect for tradition. Our textiles are
                      carefully crafted using selected yarns,
                      quality dyes and time-honoured techniques.
                    </p>

                    <p>
                      Our purpose is to create fabrics that bring comfort,
                      colour and elegance into everyday life. From
                      sourcing yarn to final packaging, every stage
                      reflects our dedication to quality and authenticity.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {FEATURES.map((item) => (
                      <div
                        key={item}
                        className="group flex items-center gap-3 rounded-2xl border border-[#241611]/10 bg-[#f8f4ec] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a227]/50 hover:bg-white hover:shadow-lg"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#111111]/15 transition-colors duration-200 group-hover:bg-[#c9a227] hover:text-[#111111]">
                          <Check className="h-5 w-5 text-[#8a6d2f] transition-colors duration-300 group-hover:text-white" />
                        </div>

                        <p className="text-sm font-semibold leading-6 text-[#241611]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-12 grid grid-cols-3 gap-3 border-t border-[#241611]/10 pt-8 sm:gap-6">
                    {STATS.map(({ value, label }) => (
                      <div key={label}>
                        <h3 className="font-serif text-2xl font-bold text-[#c9a227] sm:text-3xl">
                          {value}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#8a7c6a] sm:text-sm">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Craft Process Section */}
            <div
              className={`mt-28 border-t border-[#241611]/10 pt-20 lg:mt-36 lg:pt-24 ${fade()}`}
              style={{
                transitionDelay: mounted ? "240ms" : "0ms",
              }}
            >
              <div className="mx-auto mb-14 max-w-2xl text-center">
                <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                  From Workshop to Home
                </span>

                <h2 className="font-serif text-4xl font-semibold text-[#241611] md:text-5xl">
                  The Craft Behind Every Fabric
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6b5f4f]">
                  Every fabric passes through a careful process designed
                  to preserve its softness, colour consistency and
                  premium quality.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {PROCESS.map(({ icon: Icon, title, copy }, index) => (
                  <div
                    key={title}
                    className="group relative rounded-3xl border border-[#241611]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#c9a227]/45 hover:shadow-[0_20px_50px_rgba(36,22,17,0.12)]"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-[#c9a227]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#f5efe3] transition-all duration-200 group-hover:bg-[#c9a227]">
                        <Icon
                          size={19}
                          className="text-[#8a6d2f] transition-colors duration-300 group-hover:text-[#241611]"
                        />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-[#241611]">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#6b5f4f]">
                      {copy}
                    </p>

                    <div className="mt-6 h-px w-12 bg-[#c9a227] transition-all duration-300 group-hover:w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Discover Collection CTA - Last Section */}
            <div
              className={`relative mt-28 overflow-hidden rounded-[32px] bg-[#241611] px-6 py-14 text-center sm:px-10 lg:mt-36 lg:px-16 lg:py-20 ${fade()}`}
              style={{
                transitionDelay: mounted ? "320ms" : "0ms",
              }}
            >
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full border border-white/10" />

              <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full border border-[#c9a227]/20" />

              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c9a227]/70 to-transparent" />

              <div className="relative mx-auto max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                  Experience Eagle Textile
                </span>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Bring Quality, Colour and Timeless Style to Your Collection
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
                  Discover our premium fabric collection, created with
                  carefully selected yarns and a commitment to quality,
                  tradition and lasting value.
                </p>

                <Link
                  to="/products"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#111111] px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#c9a227] hover:text-[#111111]"
                >
                  Discover Our Collection
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;