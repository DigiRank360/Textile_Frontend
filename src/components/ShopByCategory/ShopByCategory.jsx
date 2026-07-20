import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquareText } from "lucide-react";
import API_URL, { getImageUrl } from "../config/config";

const ShopByCategory = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();

      if (data.success) {
        setProperties(data.properties || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#E8E0D4] py-20" id="categories">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#2B2420] mb-3">
            New Products
          </h2>

          <p className="text-[#6b6156] text-base max-w-md mx-auto">
            Explore our premium properties.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[4/3] bg-[#2B2420]/10 rounded-xl mb-4" />
                <div className="h-4 bg-[#2B2420]/10 rounded w-3/4 mb-3" />
                <div className="h-10 bg-[#2B2420]/10 rounded-lg w-full" />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <p className="text-center text-[#6b6156]">
            No properties available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property._id} className="group">
                {/* Property details link */}
                <Link
                  to={`/properties/${property._id}`}
                  className="block"
                >
                  <div className="relative w-full aspect-[3/3] rounded-xl overflow-hidden mb-4 bg-[#2B2420]/5">
                    <img
                      src={
                        property.images?.length
                          ? getImageUrl(property.images[0])
                          : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"
                      }
                      alt={property.title || "Product"}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <h3 className="flex items-center justify-between gap-2 text-[#2B2420] font-medium text-lg leading-snug mb-4">
                    <span className="line-clamp-1">
                      {property.title}
                    </span>

                    <span className="text-[#A9812C] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </h3>
                </Link>

                {/* Get Quote button */}
                <Link
                  to={`/contact?productId=${property._id}&product=${encodeURIComponent(
                    property.title || ""
                  )}`}
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#2B2420] px-5 py-3 text-sm font-medium text-[#E8E0D4] transition-all duration-300 hover:bg-[#A9812C] active:scale-[0.98]"
                >
                  <MessageSquareText size={16} />
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 border border-[#2B2420]/30 text-[#2B2420] px-7 py-3 rounded-full text-sm font-medium hover:bg-[#2B2420] hover:text-[#E8E0D4] hover:border-[#2B2420] transition-colors duration-300"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;