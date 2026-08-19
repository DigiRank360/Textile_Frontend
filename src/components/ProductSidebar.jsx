import React from "react";
import {
  Check,
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const ProductSidebar = ({
  products = [],
  categories = [],
  categoryLoading = false,
  searchTerm = "",
  setSearchTerm,
  selectedCategory = "",
  onCategoryChange,
  sortBy = "newest",
  setSortBy,
  onReset,
  showFilters = true,
}) => {
  const getProductCategoryId = (product) => {
    if (!product?.category) return "";

    if (typeof product.category === "string") {
      return product.category;
    }

    return product.category._id || product.category.id || "";
  };

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    Boolean(selectedCategory) ||
    sortBy !== "newest";

  return (
    <aside className="bg-[#f5efe3] rounded-2xl border border-[#241611]/10 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-[#241611]/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="text-[#c9a227]"
          />

          <h2 className="font-serif text-xl font-semibold text-[#241611]">
            Shop Products
          </h2>
        </div>

        {showFilters && hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8a6d2f] hover:text-[#241611] transition-colors"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        )}
      </div>

      <div className="p-5">
        {showFilters && (
          <>
            {/* Search */}

            <div className="mb-7">
              <label
                htmlFor="sidebar-product-search"
                className="block text-[12px] uppercase tracking-[0.14em] font-semibold text-[#8a6d2f] mb-3"
              >
                Search Products
              </label>

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7c6a]"
                />

                <input
                  id="sidebar-product-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm?.(event.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-[#241611]/15 bg-white py-3 pl-10 pr-10 text-sm text-[#241611] outline-none placeholder:text-[#8a7c6a]/70 focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/10 transition"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm?.("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7c6a] hover:text-[#241611]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            <div className="h-px bg-[#241611]/10 mb-7" />
          </>
        )}

        {/* Categories */}

        <div className="mb-7">
          <p className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#8a6d2f] mb-3">
            Collections
          </p>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => onCategoryChange?.("")}
              className={`w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                selectedCategory === ""
                  ? "bg-[#241611] text-[#f2e9dc]"
                  : "text-[#6b5f4f] hover:bg-white hover:text-[#241611]"
              }`}
            >
              <span>All Products</span>

              <span
                className={`min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full text-[11px] ${
                  selectedCategory === ""
                    ? "bg-white/15 text-white"
                    : "bg-[#241611]/5 text-[#8a7c6a]"
                }`}
              >
                {products.length}
              </span>
            </button>

            {categoryLoading ? (
              <div className="space-y-2 pt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-10 bg-[#241611]/5 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              categories.map((category) => {
                const categoryId =
                  category._id || category.id;

                const isSelected =
                  String(selectedCategory) ===
                  String(categoryId);

                const productCount = products.filter(
                  (product) =>
                    String(getProductCategoryId(product)) ===
                    String(categoryId)
                ).length;

                return (
                  <button
                    type="button"
                    key={categoryId}
                    onClick={() =>
                      onCategoryChange?.(categoryId)
                    }
                    className={`w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                      isSelected
                        ? "bg-[#241611] text-[#f2e9dc]"
                        : "text-[#6b5f4f] hover:bg-white hover:text-[#241611]"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-left min-w-0">
                      {isSelected && (
                        <Check
                          size={14}
                          className="text-[#c9a227] shrink-0"
                        />
                      )}

                      <span className="line-clamp-1">
                        {category.name}
                      </span>
                    </span>

                    <span
                      className={`min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full text-[11px] ${
                        isSelected
                          ? "bg-white/15 text-white"
                          : "bg-[#241611]/5 text-[#8a7c6a]"
                      }`}
                    >
                      {productCount}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {showFilters && (
          <>
            <div className="h-px bg-[#241611]/10 mb-7" />

            {/* Sorting */}

            <div>
              <label
                htmlFor="sidebar-product-sort"
                className="block text-[12px] uppercase tracking-[0.14em] font-semibold text-[#8a6d2f] mb-3"
              >
                Sort Products
              </label>

              <div className="relative">
                <select
                  id="sidebar-product-sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy?.(event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-[#241611]/15 bg-white px-4 py-3 pr-10 text-sm text-[#241611] outline-none focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/10"
                >
                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>

                  <option value="name-asc">
                    Name: A to Z
                  </option>

                  <option value="name-desc">
                    Name: Z to A
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7c6a]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default ProductSidebar;