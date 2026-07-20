import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Eye,
  MessageSquareText,
  PackageOpen,
  RotateCcw,
} from "lucide-react";

import API_URL, {
  getImageUrl,
} from "../components/config/config";

import ShopLayout from "../components/ShopLayout";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl);

  const [sortBy, setSortBy] = useState("newest");

  const fallbackImage =
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80";

  /*
  |--------------------------------------------------------------------------
  | URL category ko state ke saath sync karein
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  /*
  |--------------------------------------------------------------------------
  | Products fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        /*
         * Saare products ek baar fetch kar rahe hain.
         * Category filtering frontend par hogi.
         */
        const response = await fetch(
          `${API_URL}/api/properties`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch products.");
        }

        const data = await response.json();

        console.log("Products API response:", data);

        if (!data.success) {
          throw new Error(
            data.message || "Unable to load products."
          );
        }

        const productList =
          data.properties ||
          data.products ||
          data.data ||
          [];

        setProducts(
          Array.isArray(productList) ? productList : []
        );
      } catch (error) {
        console.error("Product fetch error:", error);

        setError(
          error.message ||
            "Server error. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Categories fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await fetch(
          `${API_URL}/api/categories`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch categories.");
        }

        const data = await response.json();

        const categoryList =
          data.data ||
          data.categories ||
          [];

        setCategories(
          Array.isArray(categoryList)
            ? categoryList
            : []
        );
      } catch (error) {
        console.error("Category fetch error:", error);
        setCategories([]);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Product helpers
  |--------------------------------------------------------------------------
  */

  const getProductCategoryId = (product) => {
    if (!product?.category) {
      return "";
    }

    if (typeof product.category === "string") {
      return product.category;
    }

    return (
      product.category._id ||
      product.category.id ||
      ""
    );
  };

  const getProductCategoryName = (product) => {
    if (!product?.category) {
      return "";
    }

    if (typeof product.category === "object") {
      return product.category.name || "";
    }

    const matchedCategory = categories.find(
      (category) =>
        String(category._id || category.id) ===
        String(product.category)
    );

    return matchedCategory?.name || "";
  };

  const getProductImage = (product) => {
    const image =
      product.images?.[0] ||
      product.image ||
      product.imageUrl ||
      product.thumbnail;

    return image ? getImageUrl(image) : fallbackImage;
  };

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  };

  /*
  |--------------------------------------------------------------------------
  | Search, category filter and sorting
  |--------------------------------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    if (normalizedSearch) {
      result = result.filter((product) => {
        const productTitle = (
          product.title ||
          product.name ||
          ""
        ).toLowerCase();

        const productDescription = (
          product.description || ""
        ).toLowerCase();

        const categoryName =
          getProductCategoryName(product).toLowerCase();

        return (
          productTitle.includes(normalizedSearch) ||
          productDescription.includes(normalizedSearch) ||
          categoryName.includes(normalizedSearch)
        );
      });
    }

    if (selectedCategory) {
      result = result.filter(
        (product) =>
          String(getProductCategoryId(product)) ===
          String(selectedCategory)
      );
    }

    result.sort((firstProduct, secondProduct) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(firstProduct.createdAt || 0) -
            new Date(secondProduct.createdAt || 0)
          );

        case "name-asc":
          return (
            firstProduct.title ||
            firstProduct.name ||
            ""
          ).localeCompare(
            secondProduct.title ||
              secondProduct.name ||
              ""
          );

        case "name-desc":
          return (
            secondProduct.title ||
            secondProduct.name ||
            ""
          ).localeCompare(
            firstProduct.title ||
              firstProduct.name ||
              ""
          );

        case "newest":
        default:
          return (
            new Date(secondProduct.createdAt || 0) -
            new Date(firstProduct.createdAt || 0)
          );
      }
    });

    return result;
  }, [
    products,
    categories,
    searchTerm,
    selectedCategory,
    sortBy,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Sidebar actions
  |--------------------------------------------------------------------------
  */

  const handleCategoryChange = (categoryId) => {
    const value = categoryId || "";

    setSelectedCategory(value);

    const updatedParams = new URLSearchParams(
      searchParams
    );

    if (value) {
      updatedParams.set("category", value);
    } else {
      updatedParams.delete("category");
    }

    setSearchParams(updatedParams);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("newest");
    setSearchParams({});
  };

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    Boolean(selectedCategory) ||
    sortBy !== "newest";

  return (
    <ShopLayout
      heroLabel="Shop"
      heroTitle="Product Collection"
      heroSubtitle="Browse our live product catalog powered by the backend database."
      heroImage="/heroPage.png"
      products={products}
      categories={categories}
      categoryLoading={categoryLoading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
      sortBy={sortBy}
      setSortBy={setSortBy}
      onReset={resetFilters}
      showFilters
    >
      {!loading && !error && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <p className="text-sm font-medium text-[#241611]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </p>

            {selectedCategory && (
              <p className="text-xs text-[#8a7c6a] mt-1">
                Showing selected collection products
              </p>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-[#241611]/20 px-4 py-2 text-xs font-medium text-[#241611] hover:bg-[#241611] hover:text-white transition-colors"
            >
              <RotateCcw size={13} />
              Clear Filters
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="animate-pulse"
              >
                <div className="w-full aspect-[400/530] bg-[#241611]/8 rounded-2xl mb-3" />

                <div className="h-4 bg-[#241611]/8 rounded w-3/4 mb-3" />

                <div className="h-10 bg-[#241611]/8 rounded-xl w-full" />
              </div>
            )
          )}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center text-center py-20 rounded-2xl border border-[#241611]/10 bg-[#f5efe3]/40">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#c9a227]/10 text-[#c9a227] mb-4">
            <AlertCircle size={24} />
          </div>

          <p className="text-[#241611] font-medium mb-1">
            Something went wrong
          </p>

          <p className="text-[#8a7c6a] text-sm">
            {error}
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 rounded-2xl border border-[#241611]/10 bg-[#f5efe3]/40">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#241611]/5 text-[#8a7c6a] mb-4">
            <PackageOpen size={24} />
          </div>

          <p className="text-[#241611] font-medium mb-1">
            No matching products
          </p>

          <p className="text-[#8a7c6a] text-sm max-w-sm">
            Search text ya selected collection ko change
            karke dobara try karein.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#241611] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c9a227] transition-colors"
            >
              <RotateCcw size={15} />
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const productTitle =
              product.title ||
              product.name ||
              "Untitled Product";

            const categoryName =
              getProductCategoryName(product);

            return (
              <article
                key={product._id}
                className="group relative flex flex-col"
              >
                <Link
                  to={`/properties/${product._id}`}
                  className="relative block"
                >
                  <div className="relative aspect-[400/530] rounded-2xl overflow-hidden bg-[#f5efe3] mb-3">
                    <img
                      src={getProductImage(product)}
                      alt={productTitle}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#241611] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Eye size={16} />
                    </div>

                    {categoryName && (
                      <span className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#241611] line-clamp-1">
                        {categoryName}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[#241611] font-medium text-sm leading-snug line-clamp-2 mb-3 min-h-[40px] transition-colors group-hover:text-[#c9a227]">
                    {productTitle}
                  </h3>
                </Link>

                <Link
                  to={`/inquiry?productId=${
                    product._id
                  }&product=${encodeURIComponent(
                    productTitle
                  )}`}
                  className="mt-auto flex items-center justify-center gap-2 w-full rounded-xl bg-[#241611] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#c9a227] active:scale-[0.98]"
                >
                  <MessageSquareText size={16} />
                  Get Quote
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </ShopLayout>
  );
};

export default Products;