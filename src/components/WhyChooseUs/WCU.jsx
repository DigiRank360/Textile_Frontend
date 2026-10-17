import React from "react";
import {
  Award,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: <Leaf size={34} />,
    title: "Quality Materials",
    description:
      "Made from carefully selected yarns and fibres for a soft feel, durability and comfort.",
  },
  {
    icon: <Award size={34} />,
    title: "Premium Quality",
    description:
      "Every fabric goes through strict quality checks for colour fastness, strength and consistent finish.",
  },
  {
    icon: <ShieldCheck size={34} />,
    title: "Trusted Brand",
    description:
      "Trusted by designers, retailers and wholesale buyers for our commitment to quality and customer satisfaction.",
  },
  {
    icon: <Truck size={34} />,
    title: "Fast Delivery",
    description:
      "Reliable packaging and timely delivery across India to ensure your products reach safely and on time.",
  },
];

const WCU = () => {
  return (
    <section className="bg-[#f8f4ec] py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#c9a227]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#1a221a] md:text-5xl">
            Discover the Finest in
            <span className="block text-[#c9a227]">
              Premium Textiles
            </span>
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-[#6c665f]">
            At Eagle Textile, we combine traditional craftsmanship
            with modern manufacturing to create fabrics that bring
            comfort, colour and elegance to every creation.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-[#d8c8ab] bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#c9a227] hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a221a] text-[#c9a227] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#c9a227] group-hover:text-[#1a221a]">
                {item.icon}
              </div>

              <h3 className="mb-4 text-xl font-semibold text-[#1a221a]">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-[#6c665f]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-16 rounded-[30px] bg-[#1a221a] px-8 py-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Crafted with Care. Delivered with Trust.
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-[#d6c9b6]">
            From everyday wear to festive collections and bulk orders, Eagle Textile
            delivers fabrics with reliable quality, rich texture and timeless style.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WCU;