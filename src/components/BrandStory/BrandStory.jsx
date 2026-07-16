import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Clock, ArrowRight } from 'lucide-react';
import agerbatti from '../../assets/images/agarbatti.png';

const BrandStory = () => {
  return (
    <section className="bg-[#f5efe3] py-20" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-[#e9dfd2]">
              <img
                src={agerbatti}
                alt="Eagle Premium Agarbatti"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl shadow-xl shadow-[#241611]/10 p-5 max-w-[260px]">
              <p className="text-[#241611] text-sm leading-relaxed mb-2">
                "The most authentic incense I've ever experienced. Pure divine fragrance."
              </p>
              <span className="text-[#8a7c6a] text-xs font-medium">
                — Priya Sharma, Mumbai
              </span>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:pl-6">
            <span className="text-[13px] font-semibold tracking-wider uppercase text-[#c9a227] mb-3 block">
              Our Story
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611] mb-6 leading-tight">
              The Soul of Aroma Divine
            </h2>

            <p className="text-[#6b5f4f] text-base leading-relaxed mb-4">
              Since 1932, we have been crafting premium agarbatti and dhoop sticks using
              time-honoured traditions passed down through generations. Each stick is a
              testament to our commitment to purity and authenticity.
            </p>
            <p className="text-[#6b5f4f] text-base leading-relaxed mb-8">
              Our master blenders source the finest natural ingredients from across India,
              creating fragrances that elevate your spiritual rituals and bring peace to
              your everyday moments.
            </p>

            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a227]/10 text-[#c9a227] flex-shrink-0">
                  <Leaf size={18} />
                </div>
                <span className="text-[#241611] font-medium text-sm">100% Pure Natural</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a227]/10 text-[#c9a227] flex-shrink-0">
                  <Clock size={18} />
                </div>
                <span className="text-[#241611] font-medium text-sm">40+ Years Legacy</span>
              </div>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-[#241611] font-medium text-sm border-b border-[#241611]/30 pb-1 hover:border-[#241611] transition-colors"
            >
              Read the Full Story
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;