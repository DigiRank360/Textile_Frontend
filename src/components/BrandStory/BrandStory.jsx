import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Clock, ArrowRight } from "lucide-react";
import agerbatti from "../../assets/images/brandstory.jpg";

const BrandStory = () => {
  return (
    <section className="bg-[#f5efe3] py-20" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-[#e9dfd2]">
              <img
                src={agerbatti}
                alt="Eagle Textile Fabrics"
                className="w-full h-[420px] lg:h-[520px] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#c9a227]">
              Our Story
            </span>

            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-[#241611]">
              Woven with Quality & Craftsmanship
            </h2>

            <p className="mt-5 text-[#6b5f4f] leading-8">
              Eagle Textile supplies premium fabrics made with carefully selected
              yarns and finishing processes, delivering consistent quality,
              rich colours and a soft feel for fashion, home and bulk business needs.
            </p>

            <div className="flex flex-wrap gap-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227]">
                  <Leaf size={18} />
                </div>
                <span className="text-sm font-medium text-[#241611]">
                  Premium Fabrics
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227]">
                  <Clock size={18} />
                </div>
                <span className="text-sm font-medium text-[#241611]">
                  Consistent Quality
                </span>
              </div>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 mt-8 text-[#241611] font-medium border-b border-[#241611]/30 hover:border-[#241611] transition"
            >
              Learn More
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;