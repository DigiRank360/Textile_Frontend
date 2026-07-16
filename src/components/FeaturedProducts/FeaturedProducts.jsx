import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../config/config';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/properties`);
        const data = await res.json();
        if (data.success) {
          setProducts((data.properties || []).slice(0, 4));
        } else {
          setError(data.message || "Unable to load products.");
        }
      } catch (err) {
        setError(err.message || "Server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-[#f5efe3] py-20" id="featured">
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611] mb-3">
            Featured Products
          </h2>
          <p className="text-[#6b5f4f] text-base max-w-md mx-auto">
            Handpicked favourites loved by thousands for their rich, lasting fragrance.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[400/530] bg-[#241611]/8 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-[#8a7c6a] text-sm">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-[#8a7c6a] text-sm">No featured products available right now.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/properties/${product._id}`}
                className="group relative block aspect-[400/530] rounded-2xl overflow-hidden"
              >
                <img
                  src={
                    product.images?.length
                      ? `${API_URL}${product.images[0]}`
                      : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"
                  }
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/90 via-[#241611]/10 to-transparent" />

                <span className="absolute bottom-5 left-5 right-5 text-[#f2e9dc] font-serif text-lg leading-snug line-clamp-1">
                  {product.title}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-14">
         <Link
  to="/properties"
  className="inline-flex items-center gap-2 border border-[#241611]/30 text-[#241611] px-7 py-3 rounded-full text-sm font-medium hover:bg-[#241611] hover:text-[#f2e9dc] hover:border-[#241611] transition-colors duration-300"
>
  View All Properties
</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;