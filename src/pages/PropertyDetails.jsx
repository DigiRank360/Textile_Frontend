import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShoppingBag, ImageOff } from "lucide-react";
import API_URL from "../components/config/config";
import Header from "../components/Header/Header";
import PageHero from "../components/PageHero/PageHero";
import "../components/PageHero/PageSections.css";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProperty();
    setActiveImage(0);
    setQuantity(1);
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`);
      const data = await res.json();

      if (data.success) {
        setProperty(data.property);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header disableScrollColor />
        <main>
          <PageHero
            label="Shop"
            title="Product Details"
            subtitle="Fetching everything you need to know about this product."
          />
          <div className="max-w-[1100px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="animate-pulse">
              <div className="w-full aspect-[4/3] bg-[#241611]/8 rounded-2xl mb-3" />
              <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-[#241611]/8 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-9 bg-[#241611]/8 rounded w-3/4 mb-4" />
              <div className="h-7 bg-[#241611]/8 rounded w-1/4 mb-8" />
              <div className="h-4 bg-[#241611]/8 rounded w-full mb-2" />
              <div className="h-4 bg-[#241611]/8 rounded w-5/6 mb-2" />
              <div className="h-4 bg-[#241611]/8 rounded w-2/3" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header disableScrollColor />
        <main>
          <PageHero
            label="Shop"
            title="Product Not Found"
            subtitle="We couldn't find the product you're looking for."
          />
          <div className="max-w-[1100px] mx-auto px-6 py-24 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#241611]/5 text-[#8a7c6a] mx-auto mb-4">
              <ImageOff size={24} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#241611] mb-2">Product Not Found</h2>
            <p className="text-[#8a7c6a] text-sm mb-6">This product may have been removed or the link is incorrect.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-[#241611]/25 text-[#241611] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#241611] hover:text-[#f2e9dc] transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  const images = property.images?.length
    ? property.images.map((img) => `${API_URL}${img}`)
    : ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"];

  return (
    <>
      <Header disableScrollColor />
      <main>
        <PageHero
          label="Shop"
          title={property.title}
          subtitle="Explore the details, fragrance notes and ritual behind this piece."
        />

        <section className="bg-white py-14">
          <div className="max-w-[1100px] mx-auto px-6">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#8a7c6a] mb-8">
              <Link to="/" className="hover:text-[#241611] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/products" className="hover:text-[#241611] transition-colors">Products</Link>
              <ChevronRight size={14} />
              <span className="text-[#241611] font-medium line-clamp-1">{property.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Gallery */}
              <div>
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#f5efe3] mb-4">
                  <img
                    src={images[activeImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2.5">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden bg-[#f5efe3] border-2 transition-colors ${
                          activeImage === index
                            ? "border-[#c9a227]"
                            : "border-transparent hover:border-[#241611]/15"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#241611] mb-3 leading-tight">
                  {property.title}
                </h1>

                <p className="text-[#c9a227] text-2xl font-semibold mb-6">
                  ₹{property.price}
                </p>

                <div className="h-px bg-[#241611]/10 mb-6" />

                <h3 className="text-[13px] font-semibold tracking-wider uppercase text-[#8a6d2f] mb-3">
                  Description
                </h3>
                <p className="text-[#6b5f4f] text-base leading-relaxed mb-8">
                  {property.description || "No description available."}
                </p>

                {/* Quantity + CTA */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-[#241611]/15 rounded-full overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#241611] hover:bg-[#f5efe3] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-[#241611]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#241611] hover:bg-[#f5efe3] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#241611] hover:bg-[#3a281f] text-[#f2e9dc] font-medium text-sm py-3.5 rounded-full transition-colors">
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>

                <p className="text-[#8a7c6a] text-xs">
                  Free shipping on orders above ₹499 • Ships within 2–3 business days
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PropertyDetails;