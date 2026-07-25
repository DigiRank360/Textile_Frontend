import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Clock, ArrowRight } from "lucide-react";
import agerbatti from "../../assets/images/agarbatti.png";

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
                alt="Eagle Premium Agarbatti"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#c9a227]">
              Our Story
            </span>

            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-[#241611]">
              Crafted with Tradition & Purity
            </h2>

            <p className="mt-5 text-[#6b5f4f] leading-8">
              Since 2021, Eagle Agarbatti has been creating premium incense using
              carefully selected natural ingredients, delivering authentic aromas
              for prayer, meditation, and everyday peace.
            </p>

            <div className="flex flex-wrap gap-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227]">
                  <Leaf size={18} />
                </div>
                <span className="text-sm font-medium text-[#241611]">
                  100% Natural
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227]">
                  <Clock size={18} />
                </div>
                <span className="text-sm font-medium text-[#241611]">
                  Premium Quality
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