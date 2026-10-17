import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Search,
  HelpCircle,
  Package,
  Leaf,
  Truck,
  CreditCard,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import PageHero from "../components/PageHero/PageHero";
import "../components/PageHero/PageSections.css";

const CATEGORIES = [
  {
    id: "all",
    label: "All Questions",
    icon: HelpCircle,
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
  },
  {
    id: "ingredients",
    label: "Materials",
    icon: Leaf,
  },
  {
    id: "orders",
    label: "Orders & Delivery",
    icon: Truck,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },
];

const FAQS = [
  {
    id: 1,
    category: "products",
    question: "What makes Eagle Textile different?",
    answer:
      "Eagle Textile fabrics are made with carefully selected yarns, quality dyes and modern finishing techniques. Our focus is on consistent quality, rich colours and a soft feel for fashion, home and commercial use.",
  },
  {
    id: 2,
    category: "ingredients",
    question: "What materials are your fabrics made from?",
    answer:
      "We work with cotton, silk, polyester and blended yarns chosen for quality and consistency. Exact composition varies by fabric collection; please check the product details or contact us.",
  },
  {
    id: 3,
    category: "products",
    question: "How durable are the fabrics?",
    answer:
      "Durability depends on the fibre, weave and finish. Our fabrics are tested for strength and colour fastness, and care instructions help them last longer.",
  },
  {
    id: 4,
    category: "products",
    question: "Which fabric is best for everyday wear?",
    answer:
      "Cotton and cotton blends are popular for everyday comfort, while silk and silk blends suit festive and occasion wear. The best option depends on your use, season and budget.",
  },
  {
    id: 5,
    category: "products",
    question: "How should I care for the fabrics?",
    answer:
      "Follow the care instructions for each fabric. In general, wash delicate fabrics gently in cold water, avoid harsh detergents and dry in the shade to preserve colour and texture.",
  },
  {
    id: 6,
    category: "ingredients",
    question: "Are your dyes safe and colour-fast?",
    answer:
      "Our products are manufactured with a strong focus on quality and responsible dyeing. For specific dye, allergy or sensitivity concerns, please contact our team before placing an order.",
  },
  {
    id: 7,
    category: "orders",
    question: "How can I place an order?",
    answer:
      "You can explore our available products through the Products page. Select the product you are interested in and submit an enquiry or contact our team directly for pricing, quantity and availability.",
  },
  {
    id: 8,
    category: "orders",
    question: "Do you accept bulk and wholesale orders?",
    answer:
      "Yes, we accept bulk, wholesale and business enquiries. Contact us with the required product, quantity, delivery location and packaging requirements, and our team will provide the relevant details.",
  },
  {
    id: 9,
    category: "orders",
    question: "How long does delivery take?",
    answer:
      "Delivery timelines depend on the order quantity, product availability and delivery location. Our team will confirm the estimated dispatch and delivery schedule when processing your order.",
  },
  {
    id: 10,
    category: "orders",
    question: "How can I track my order?",
    answer:
      "Once your order has been dispatched, tracking details will be shared through the available contact method. For assistance, you can contact our support team with your order information.",
  },
  {
    id: 11,
    category: "payments",
    question: "Which payment methods do you accept?",
    answer:
      "Available payment options may include bank transfer, UPI or other approved payment methods. The applicable method will be confirmed by our team while processing your order.",
  },
  {
    id: 12,
    category: "payments",
    question: "Is advance payment required for bulk orders?",
    answer:
      "Advance payment requirements may vary depending on the order value, quantity and customisation. Our team will share the payment terms before confirming a bulk or wholesale order.",
  },
];

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFaq, setActiveFaq] = useState(FAQS[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;

      const matchesSearch =
        !normalizedSearch ||
        faq.question.toLowerCase().includes(normalizedSearch) ||
        faq.answer.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveFaq(null);
  };

  const handleToggle = (faqId) => {
    setActiveFaq((currentFaq) => (currentFaq === faqId ? null : faqId));
  };

  return (
    <>

      <main>
        <PageHero
          label="Frequently Asked Questions"
          title="How Can We Help You?"
          subtitle="Find clear answers about our fabrics, materials, orders, delivery and payment process."
          image="/heroPage.jpg"
        />

        <section className="overflow-hidden bg-[#fbf8f2] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                <Sparkles size={14} />
                Helpful Information
              </span>

              <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#241611] md:text-5xl">
                Everything You Need to Know
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6b5f4f]">
                Browse our most frequently asked questions or search for a
                specific topic. Our team is also available if you need more
                personalised assistance.
              </p>
            </div>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8a7c6a]"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search questions, products or delivery..."
                  className="w-full rounded-full border border-[#241611]/10 bg-white py-4 pl-14 pr-6 text-sm text-[#241611] shadow-[0_12px_35px_rgba(36,22,17,0.07)] outline-none transition-all duration-300 placeholder:text-[#8a7c6a]/70 focus:border-[#c9a227]/70 focus:ring-4 focus:ring-[#c9a227]/10"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CATEGORIES.map(({ id, label, icon: Icon }) => {
                const isActive = activeCategory === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleCategoryChange(id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "border-[#241611] bg-[#241611] text-white shadow-lg"
                        : "border-[#241611]/10 bg-white text-[#6b5f4f] hover:-translate-y-0.5 hover:border-[#c9a227]/50 hover:text-[#241611] hover:shadow-md"
                    }`}
                  >
                    <Icon
                      size={17}
                      className={
                        isActive ? "text-[#c9a227]" : "text-[#8a6d2f]"
                      }
                    />

                    {label}
                  </button>
                );
              })}
            </div>

            {/* FAQ Layout */}
            <div className="mt-16 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
              {/* Support Card */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative overflow-hidden rounded-[30px] bg-[#241611] p-7 shadow-[0_25px_70px_rgba(36,22,17,0.18)] sm:p-9">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />

                  <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-[#c9a227]/20" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a227]">
                      <MessageCircle size={25} className="text-[#241611]" />
                    </div>

                    <span className="mt-7 inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c9a227]">
                      Need More Assistance?
                    </span>

                    <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">
                      Still Have a Question?
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-white/65">
                      Our team can help with product recommendations, wholesale
                      enquiries, order details and general assistance.
                    </p>

                    <Link
                      to="/contact"
                      className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition-all duration-200 hover:bg-[#c9a227]"
                    >
                      Contact Our Team
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-[#241611]/10 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                    Quick Support
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#6b5f4f]">
                    For faster assistance, include the product name, required
                    quantity and delivery location in your enquiry.
                  </p>
                </div>
              </aside>

              {/* Accordion */}
              <div>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                      Answers
                    </p>

                    <h2 className="mt-2 font-serif text-3xl font-semibold text-[#241611]">
                      Common Questions
                    </h2>
                  </div>

                  <p className="hidden text-sm text-[#8a7c6a] sm:block">
                    {filteredFaqs.length}{" "}
                    {filteredFaqs.length === 1 ? "question" : "questions"}
                  </p>
                </div>

                {filteredFaqs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => {
                      const isOpen = activeFaq === faq.id;

                      return (
                        <article
                          key={faq.id}
                          className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                            isOpen
                              ? "border-[#c9a227]/50 shadow-[0_18px_45px_rgba(36,22,17,0.1)]"
                              : "border-[#241611]/10 hover:border-[#c9a227]/35 hover:shadow-md"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleToggle(faq.id)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-semibold transition-colors duration-300 ${
                                isOpen
                                  ? "bg-[#c9a227] text-[#241611]"
                                  : "bg-[#f5efe3] text-[#8a6d2f]"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1 font-serif text-lg font-semibold leading-7 text-[#241611] sm:text-xl">
                              {faq.question}
                            </span>

                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                isOpen
                                  ? "rotate-180 bg-[#241611] text-white"
                                  : "bg-[#f5efe3] text-[#241611]"
                              }`}
                            >
                              <ChevronDown size={18} />
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="border-t border-[#241611]/8 px-5 pb-6 pt-5 sm:ml-[72px] sm:px-6">
                                <p className="text-sm leading-7 text-[#6b5f4f] sm:text-base">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-dashed border-[#c9a227]/50 bg-white px-6 py-16 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5efe3]">
                      <Search size={25} className="text-[#8a6d2f]" />
                    </div>

                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#241611]">
                      No Questions Found
                    </h3>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6b5f4f]">
                      Try another keyword or select a different category to find
                      the information you need.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        setActiveCategory("all");
                        setActiveFaq(FAQS[0]?.id || null);
                      }}
                      className="mt-6 rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#c9a227] hover:text-[#111111] hover:text-white"
                    >
                      Reset Search
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="relative mt-24 overflow-hidden rounded-[32px] bg-white px-6 py-14 text-center shadow-[0_20px_60px_rgba(36,22,17,0.09)] sm:px-10 lg:mt-32 lg:px-16 lg:py-20">
              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />

              <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#f5efe3]" />

              <div className="absolute -bottom-20 -right-14 h-52 w-52 rounded-full border border-[#c9a227]/20" />

              <div className="relative mx-auto max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                  Discover Eagle Textile
                </span>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#241611] sm:text-4xl lg:text-5xl">
                  Find the Perfect Fabric for Every Need
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b5f4f]">
                  Explore our range of carefully crafted fabrics created
                  for fashion, home furnishing and everyday comfort.
                </p>

                <Link
                  to="/products"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#111111] px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#c9a227] hover:text-[#111111] hover:text-white"
                >
                  Explore Our Products
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Faq;