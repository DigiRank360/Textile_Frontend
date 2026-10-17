import React, { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";

import PageHero from "../components/PageHero/PageHero";
import ProductSidebar from "../components/ProductSidebar";
import "../components/PageHero/PageSections.css";

const ShopLayout = ({
  children,
  heroLabel = "Shop",
  heroTitle = "Product Collection",
  heroSubtitle = "Explore our complete product collection.",
  heroImage = "/heroPage.jpg",

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
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <>

      <main>
        <PageHero
          label={heroLabel}
          title={heroTitle}
          subtitle={heroSubtitle}
          image={heroImage}
        />

        <section className="bg-white py-18">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Mobile sidebar button */}

            <div className="lg:hidden mb-10">
              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen((previous) => !previous)
                }
                className="w-full flex items-center justify-between rounded-xl border border-[#241611]/15 bg-[#f5efe3] px-4 py-3 text-sm font-medium text-[#241611]"
              >
                <span className="flex items-center gap-2">
                  <Filter
                    size={17}
                    className="text-[#c9a227]"
                  />
                  Browse Collections
                </span>

                {mobileSidebarOpen ? (
                  <X size={17} />
                ) : (
                  <ChevronDown size={17} />
                )}
              </button>

              {mobileSidebarOpen && (
                <div className="mt-3">
                  <ProductSidebar
                    products={products}
                    categories={categories}
                    categoryLoading={categoryLoading}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(categoryId) => {
                      onCategoryChange?.(categoryId);
                      setMobileSidebarOpen(false);
                    }}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onReset={onReset}
                    showFilters={showFilters}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)] gap-8 items-start">
              {/* Desktop sidebar */}

              <div className="hidden lg:block sticky top-24">
                <ProductSidebar
                  products={products}
                  categories={categories}
                  categoryLoading={categoryLoading}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onReset={onReset}
                  showFilters={showFilters}
                />
              </div>

              {/* Page content */}

              <div className="min-w-0">{children}</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ShopLayout;