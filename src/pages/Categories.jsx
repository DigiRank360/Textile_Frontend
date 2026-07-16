import React, { useEffect, useState } from "react";
import API_URL from "../components/config/config";
import { Link } from "react-router-dom";
import { ArrowRight, PackageOpen, AlertCircle } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import agerbatti1 from '../assets/images/agarbatti1.png';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        if (data.success) setCategories(data.data || []);
        else setError(data.message || "Unable to load categories.");
      } catch (err) {
        setError(err.message || "Server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <PageHero
        label="Collection"
        title="Shop by Collection"
        subtitle="Explore curated collections from your live product database."
      />

      <main className="bg-white pt-14 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-[4/3] bg-[#241611]/8 rounded-2xl mb-4" />
                  <div className="h-5 bg-[#241611]/8 rounded w-2/3 mb-3" />
                  <div className="h-3.5 bg-[#241611]/8 rounded w-full mb-2" />
                  <div className="h-3.5 bg-[#241611]/8 rounded w-4/5 mb-4" />
                  <div className="h-9 bg-[#241611]/8 rounded-full w-32" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center text-center py-20">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#c9a227]/10 text-[#c9a227] mb-4">
                <AlertCircle size={24} />
              </div>
              <p className="text-[#241611] font-medium mb-1">Something went wrong</p>
              <p className="text-[#8a7c6a] text-sm">{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center text-center py-20">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#241611]/5 text-[#8a7c6a] mb-4">
                <PackageOpen size={24} />
              </div>
              <p className="text-[#241611] font-medium mb-1">No collections yet</p>
              <p className="text-[#8a7c6a] text-sm">Check back soon — new collections are on their way.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="group bg-[#f5efe3] rounded-2xl p-5 hover:shadow-xl hover:shadow-[#241611]/8 transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-[#e9dfd2]">
                    <img
                      src={agerbatti1}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <h3 className="flex items-center justify-between gap-2 font-serif text-xl font-semibold text-[#241611] mb-2">
                    <span className="line-clamp-1">{category.name}</span>
                    <ArrowRight
                      size={18}
                      className="text-[#c9a227] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </h3>

                  <p className="text-[#8a7c6a] text-sm leading-relaxed mb-5 line-clamp-2">
                    {category.description || "Handpicked items from this curated collection."}
                  </p>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 border border-[#241611]/25 text-[#241611] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#241611] hover:text-[#f2e9dc] hover:border-[#241611] transition-colors duration-300"
                  >
                    View Products
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Categories;