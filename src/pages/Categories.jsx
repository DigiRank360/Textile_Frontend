import React, { useEffect, useState } from "react";
import API_URL from "../components/config/config";
import { Link } from "react-router-dom";
import { ArrowRight, PackageOpen, AlertCircle } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import agerbatti1 from "../assets/images/agarbatti1.png";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    if (!loading) {
      const raf = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [loading]);

  return (
    <>
      <PageHero
        label="Collection"
        title="Shop by Collection"
        subtitle="Explore curated collections from your live product database."
        image="./heroPage.png"
      />

      <main className="bg-white pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {!loading && !error && categories.length > 0 && (
            <div className="flex items-end justify-between gap-4 mb-10 pt-2">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-[#c9a227] mb-2">
                  The Index
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#241611]">
                  Every Collection
                </h2>
              </div>
              <p className="text-sm text-[#8a7c6a] whitespace-nowrap pb-1">
                {String(categories.length).padStart(2, "0")}{" "}
                {categories.length === 1 ? "entry" : "entries"}
              </p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-[3/4] bg-[#241611]/8 rounded-2xl mb-4" />
                  <div className="h-5 bg-[#241611]/8 rounded w-2/3 mb-3" />
                  <div className="h-3.5 bg-[#241611]/8 rounded w-full mb-2" />
                  <div className="h-3.5 bg-[#241611]/8 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center text-center py-20">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#c9a227]/10 text-[#c9a227] mb-4">
                <AlertCircle size={24} />
              </div>
              <p className="text-[#241611] font-medium mb-1">
                Something went wrong
              </p>
              <p className="text-[#8a7c6a] text-sm">{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center text-center py-20">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#241611]/5 text-[#8a7c6a] mb-4">
                <PackageOpen size={24} />
              </div>
              <p className="text-[#241611] font-medium mb-1">
                No collections yet
              </p>
              <p className="text-[#8a7c6a] text-sm">
                Check back soon — new collections are on their way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {categories.map((category, index) => (
                <Link
                  to="/products"
                  key={category._id}
                  className={`group block ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "600ms",
                    transitionTimingFunction: "ease-out",
                    transitionDelay: mounted ? `${index * 70}ms` : "0ms",
                  }}
                >
                  {/* Full-bleed image */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#e9dfd2] mb-5">
                    <img
                      src={agerbatti1}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="absolute top-4 left-4 text-[11px] font-serif font-semibold tracking-wider text-[#f2e9dc] bg-[#241611]/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-[#f2e9dc] text-[#241611] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                  {/* Content — no card padding, just the text block */}
                  <h3 className="font-serif text-lg font-semibold text-[#241611] mb-1.5 line-clamp-1">
                    {category.name}
                  </h3>

                  <p className="text-[#8a7c6a] text-sm leading-relaxed line-clamp-2">
                    {category.description ||
                      "Handpicked items from this curated collection."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Categories;