import React from 'react';
import { Link } from 'react-router-dom';

const rituals = [
  {
    name: 'Mangal Deep',
    price: '₹185',
    desc: 'Traditional camphor dhoop for morning prayers',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
  },
  {
    name: 'Sandalwood Classic',
    price: '₹220',
    desc: 'Pure Mysore sandalwood agarbatti sticks',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=400&fit=crop',
  },
  {
    name: 'Rose Divine',
    price: '₹165',
    desc: 'Hand-rolled rose and kewda fragrance blend',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
  },
  {
    name: 'Temple Blend',
    price: '₹199',
    desc: 'Sacred temple-grade incense for daily puja',
    image: 'https://images.unsplash.com/photo-1602928322019-960f9c8a0a0a?w=400&h=400&fit=crop',
  },
];

const MostLovedRituals = () => {
  return (
    <section className="bg-white py-20" id="rituals">
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611]">
            Most Loved Rituals
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-[#8a6d2f] hover:text-[#c9a227] underline underline-offset-4 decoration-[#c9a227]/40 hover:decoration-[#c9a227] transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {rituals.map((item) => (
            <Link to="/products" key={item.name} className="group block">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f5efe3] mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <h3 className="text-[#241611] font-medium text-base leading-snug mb-1">
                {item.name}
              </h3>
              <p className="text-[#c9a227] font-semibold text-sm mb-1">
                {item.price}
              </p>
              <p className="text-[#8a7c6a] text-sm leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostLovedRituals;