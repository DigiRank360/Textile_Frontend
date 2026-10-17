import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  ImageOff,
  MessageSquareText,
  Flame,
  Wind,
  Sparkles,
  Leaf,
} from "lucide-react";
import API_URL, { getImageUrl } from "../components/config/config";
import PageHero from "../components/PageHero/PageHero";
import "../components/PageHero/PageSections.css";

const RITUAL_STEPS = [
  {
    icon: Flame,
    title: "Inspect",
    copy: "Check the fabric for shade, width and finish before cutting or stitching.",
  },
  {
    icon: Wind,
    title: "Prepare",
    copy: "Pre-wash or steam as recommended so the fabric settles and shrinkage is accounted for.",
  },
  {
    icon: Sparkles,
    title: "Create",
    copy: "Cut, stitch and style with confidence — quality fabric drapes and wears beautifully.",
  },
];

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchProperty();
    setActiveImage(0);
  }, [id]);

  useEffect(() => {
    if (!loading) {
      const raf = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(raf);
    }
    setMounted(false);
  }, [loading]);

  const fetchProperty = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`);
      const data = await res.json();

      if (data.success) {
        setProperty(data.property);
      } else {
        setProperty(null);
      }
    } catch (err) {
      console.log(err);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>

        <main>
          <PageHero
            label="Shop Details"
            title="Product Details"
            subtitle="Fetching everything you need to know about this product."
            image="/heroPage.jpg"
          />

          <div className="max-w-[1100px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="animate-pulse">
              <div className="w-full aspect-square bg-[#241611]/8 rounded-2xl mb-3" />

              <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[#241611]/8 rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="animate-pulse">
              <div className="h-3 bg-[#241611]/8 rounded w-1/4 mb-4" />
              <div className="h-9 bg-[#241611]/8 rounded w-3/4 mb-8" />
              <div className="h-4 bg-[#241611]/8 rounded w-full mb-2" />
              <div className="h-4 bg-[#241611]/8 rounded w-5/6 mb-2" />
              <div className="h-4 bg-[#241611]/8 rounded w-2/3 mb-8" />
              <div className="h-12 bg-[#241611]/8 rounded-full w-full" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!property) {
    return (
      <>

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

            <h2 className="font-serif text-2xl font-semibold text-[#241611] mb-2">
              Product Not Found
            </h2>

            <p className="text-[#8a7c6a] text-sm mb-6">
              This product may have been removed or the link is incorrect.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-[#111111]/25 text-[#111111] px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#111111] hover:text-white transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  const images = property.images?.length
    ? property.images.map(getImageUrl)
    : ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"];

  const quoteUrl = `/contact?productId=${
    property._id
  }&product=${encodeURIComponent(property.title || "")}`;

  const eyebrow =
    (typeof property.category === "object"
      ? property.category?.name
      : property.category) || "Signature Piece";

  const fadeCls = (delayMs = 0) =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`;

  return (
    <>

      <main>
        <PageHero
          label="Shop"
          title={property.title}
          subtitle="Explore the details, fabric details and care behind this piece."
        />

        <section className="bg-white py-14">
          <div className="max-w-[1100px] mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#8a7c6a] mb-10">
              <Link to="/" className="hover:text-[#241611] transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <Link
                to="/products"
                className="hover:text-[#241611] transition-colors"
              >
                Products
              </Link>
              <ChevronRight size={14} />
              <span className="text-[#241611] font-medium line-clamp-1">
                {property.title}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
              {/* Gallery */}
              <div
                className={`flex flex-col-reverse lg:flex-row gap-3 ${fadeCls()}`}
                style={{ transitionDelay: mounted ? "60ms" : "0ms" }}
              >
                {/* Thumbnail rail */}
                {images.length > 1 && (
                  <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible lg:w-[76px] shrink-0">
                    {images.map((img, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative aspect-square w-[76px] lg:w-full shrink-0 rounded-lg overflow-hidden bg-[#f5efe3] border transition-all duration-300 ${
                          activeImage === index
                            ? "border-[#c9a227] ring-1 ring-[#c9a227] scale-[0.98]"
                            : "border-[#241611]/10 hover:border-[#241611]/25"
                        }`}
                        aria-label={`View product image ${index + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image */}
                <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-[#f5efe3] group">
                  <img
                    src={images[activeImage]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {images.length > 1 && (
                    <span className="absolute bottom-3 left-3 text-[11px] tracking-wider font-medium bg-[#241611]/80 text-[#f2e9dc] px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {String(activeImage + 1).padStart(2, "0")} /{" "}
                      {String(images.length).padStart(2, "0")}
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div
                className={`lg:sticky lg:top-24 ${fadeCls()}`}
                style={{ transitionDelay: mounted ? "160ms" : "0ms" }}
              >
                <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c9a227] mb-3">
                  {eyebrow}
                </span>

                <h1 className="font-serif text-3xl md:text-[2.6rem] font-semibold text-[#241611] mb-6 leading-[1.1]">
                  {property.title}
                </h1>

                {/* Gold flourish divider */}
                <div className="flex items-center gap-3 mb-7">
                  <span className="h-px flex-1 bg-[#241611]/12" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#c9a227]" />
                  <span className="h-px flex-1 bg-[#241611]/12" />
                </div>

                <h3 className="text-[13px] font-semibold tracking-wider uppercase text-[#8a6d2f] mb-3">
                  Description
                </h3>

                <p className="text-[#6b5f4f] text-base leading-relaxed mb-8 first-letter:font-serif first-letter:text-4xl first-letter:font-semibold first-letter:text-[#241611] first-letter:mr-1 first-letter:float-left first-letter:leading-[0.85]">
                  {property.description || "No description available."}
                </p>

                {/* Feature strip */}
                <div className="grid grid-cols-3 gap-2.5 mb-9">
                  {[
                    { icon: Leaf, label: "Natural" },
                    { icon: Sparkles, label: "Handcrafted" },
                    { icon: Flame, label: "Small batch" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center text-center gap-1.5 py-3 rounded-xl bg-[#f5efe3]/70"
                    >
                      <Icon size={17} className="text-[#8a6d2f]" />
                      <span className="text-[11px] font-medium text-[#6b5f4f]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Get Quote */}
                <Link
                  to={quoteUrl}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#c9a227] hover:text-[#111111] text-white font-medium text-sm py-3.5 rounded-md transition-colors duration-200"
                >
                  <MessageSquareText size={17} />
                  Get Quote
                </Link>

                <p className="text-[#8a7c6a] text-xs text-center mt-4">
                  Request pricing, availability and product details from our
                  team.
                </p>
              </div>
            </div>

            {/* Using the Fabric — signature section */}
            <div
              className={`mt-20 pt-14 border-t border-[#241611]/10 ${fadeCls()}`}
              style={{ transitionDelay: mounted ? "260ms" : "0ms" }}
            >
              <div className="max-w-xl mb-10">
                <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c9a227] mb-2">
                  How to use
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#241611]">
                  Using the Fabric
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                {RITUAL_STEPS.map(({ icon: Icon, title, copy }, i) => (
                  <div key={title} className="relative pl-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-serif text-sm text-[#c9a227] font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-[#241611]/10" />
                      <Icon size={16} className="text-[#8a6d2f]" />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-[#241611] mb-2">
                      {title}
                    </h4>
                    <p className="text-[#6b5f4f] text-sm leading-relaxed">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PropertyDetails;