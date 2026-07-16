import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, PackageOpen, AlertCircle } from "lucide-react";
import API_URL, { getImageUrl } from "../components/config/config";
import PageHero from "../components/PageHero/PageHero";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("API URL:", `${API_URL}/api/properties`);

        const res = await fetch(`${API_URL}/api/properties`);
        const data = await res.json();

        console.log("Response:", data);

        if (data.success) {
          console.log("Products:", data.properties);
          setProducts(data.properties);
        } else {
          setError(data.message || "Unable to load products.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  console.log("Products State:", products);

  return (
    <>
      <PageHero
        label="Shop"
        title="Product Collection"
        subtitle="Browse our live product catalog powered by the backend database."
      />

      <main className="bg-white pt-14 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-[400/530] bg-[#241611]/8 rounded-2xl mb-3" />
                  <div className="h-4 bg-[#241611]/8 rounded w-3/4 mb-2" />
                  <div className="h-3.5 bg-[#241611]/8 rounded w-1/3" />
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
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center text-center py-20">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#241611]/5 text-[#8a7c6a] mb-4">
                <PackageOpen size={24} />
              </div>
              <p className="text-[#241611] font-medium mb-1">
                No products available
              </p>
              <p className="text-[#8a7c6a] text-sm">
                Check back soon — new items are on their way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className="group relative block"
                >
                  <div className="relative aspect-[400/530] rounded-2xl overflow-hidden bg-[#f5efe3] mb-3">
                    <img
                      src={
                        product.images?.length
                          ? getImageUrl(product.images[0])
                          : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"
                      }
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />

                    {/* Gradient overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* View icon on hover */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#241611] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Eye size={16} />
                    </div>
                  </div>

                  <h3 className="text-[#241611] font-medium text-sm leading-snug line-clamp-1 mb-1">
                    {product.title}
                  </h3>
                  {product.price && (
                    <p className="text-[#c9a227] font-semibold text-sm">
                      ₹{product.price}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Products;
