import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ImageOff,
  MessageSquareText,
} from "lucide-react";
import API_URL, { getImageUrl } from "../config/config";

const ShopByCategory = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/properties`);

      if (!res.ok) {
        throw new Error("Unable to fetch products.");
      }

      const data = await res.json();

      if (data.success) {
        setProperties(data.properties || []);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Product fetch error:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Home page par sirf 12 products show honge
  const displayedProperties = properties.slice(0, 12);

  return (
    <section
      className="bg-[#E8E0D4] py-12 sm:py-16 lg:py-20"
      id="categories"
    >
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-5 lg:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A9812C] sm:text-xs">
            Explore Our Collection
          </span>

          <h2 className="mb-3 font-serif text-3xl font-semibold leading-tight text-[#2B2420] sm:text-4xl lg:text-5xl">
            New Products
          </h2>

          <p className="mx-auto max-w-lg text-sm leading-6 text-[#6b6156] sm:text-base">
            Discover our latest premium products, carefully selected for your
            requirements.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl bg-white"
              >
                <div className="aspect-square w-full bg-[#2B2420]/10" />

                <div className="p-3 sm:p-4">
                  <div className="mb-4 h-4 w-3/4 rounded bg-[#2B2420]/10" />
                  <div className="h-10 w-full rounded-lg bg-[#2B2420]/10" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProperties.length === 0 ? (
          <div className="rounded-xl bg-white/50 px-5 py-14 text-center">
            <ImageOff
              size={42}
              strokeWidth={1.5}
              className="mx-auto mb-4 text-[#A9812C]"
            />

            <h3 className="mb-2 font-serif text-xl font-semibold text-[#2B2420]">
              No products available
            </h3>

            <p className="text-sm text-[#6b6156]">
              New products will be available soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {displayedProperties.map((property) => (
              <article
                key={property._id}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product Image */}
                <Link
                  to={`/properties/${property._id}`}
                  className="relative block aspect-square overflow-hidden bg-[#DDD2C3]"
                  aria-label={`View ${property.title || "product"}`}
                >
                  {property.images?.length > 0 ? (
                    <img
                      src={getImageUrl(property.images[0])}
                      alt={property.title || "Product"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#6b6156]">
                      <ImageOff size={30} strokeWidth={1.5} />

                      <span className="hidden text-xs sm:block">
                        Image not available
                      </span>
                    </div>
                  )}

                  {/* Light Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                  {/* New Badge */}
                  <span className="absolute left-2 top-2 rounded-full bg-[#A9812C] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
                    New
                  </span>

                  {/* Arrow Icon */}
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2B2420] opacity-0 shadow-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:h-9 sm:w-9">
                    <ArrowRight size={16} />
                  </span>
                </Link>

                {/* Product Content */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <Link
                    to={`/properties/${property._id}`}
                    className="mb-3 block"
                  >
                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-[#2B2420] transition-colors duration-300 hover:text-[#A9812C] sm:min-h-[48px] sm:text-base sm:leading-6 lg:text-sm">
                      {property.title || "Untitled Product"}
                    </h3>
                  </Link>

                  {/* Quote Button */}
                  <Link
                    to={`/contact?productId=${
                      property._id
                    }&product=${encodeURIComponent(property.title || "")}`}
                    className="mt-auto flex items-center justify-center gap-2 bg-[#241611] rounded-xl hover:bg-[#c9a227] text-[#f2e9dc] font-medium text-sm py-2.5 transition-colors duration-300"
                  >
                    <MessageSquareText
                      size={15}
                      className="shrink-0 sm:h-2 sm:w-4"
                    />

                    <span>Get Quote</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && properties.length > 0 && (
          <div className="mt-10 flex justify-center sm:mt-12 lg:mt-14">
            <Link
              to="/properties"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#2B2420] px-6 py-3 text-sm font-semibold text-[#2B2420] transition-all duration-300 hover:bg-[#2B2420] hover:text-[#E8E0D4] sm:px-8 sm:py-3.5"
            >
              View All Products

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;