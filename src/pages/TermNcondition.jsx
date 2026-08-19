import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardCheck,
  BadgeDollarSign,
  Ship,
  ShieldCheck,
  RotateCcw,
  Palette,
  LockKeyhole,
  CloudLightning,
  Scale,
  RefreshCcw,
  Mail,
  Globe2,
  MapPin,
  Phone,
  ChevronDown,
  ArrowRight,
  PackageCheck,
  Clock3,
  AlertTriangle,
  Building2,
  Landmark,
} from "lucide-react";

import Header from "../components/Header/Header";
import PageHero from "../components/PageHero/PageHero";
import "../components/PageHero/PageSections.css";

/* =====================================================
   COMPANY DETAILS
===================================================== */

const COMPANY_NAME = "Eagle Incense Sticks";
const WEBSITE = "https://eagleincensesticks.com";
const LEGAL_EMAIL = "info@eagleincensesticks.com";
const PHONE_NUMBER = "+91 99819 97440";
const PHONE_LINK = "+919981997440";

const BUSINESS_ADDRESS =
  "A-182 English Villas, Kolar Road, Bhopal - 462042";

const LAST_UPDATED = "January 2025";

/* =====================================================
   HELPER COMPONENTS
===================================================== */

const TermsSubheading = ({ title }) => {
  return (
    <h3 className="pt-2 font-serif text-xl font-semibold text-[#241611]">
      {title}
    </h3>
  );
};

const TermsList = ({ items }) => {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-start gap-3"
        >
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c9a227]" />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const TermsMeta = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
};

const InformationCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-[#241611]/10 bg-[#fbf8f2] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e8d9]">
        <Icon size={19} className="text-[#8a6d2f]" />
      </div>

      <h4 className="mt-4 font-serif text-lg font-semibold text-[#241611]">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-7 text-[#6b5f4f]">
        {description}
      </p>
    </div>
  );
};

const TermsNavigationButton = ({ section, onClick }) => {
  const Icon = section.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-[#f5efe3]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f8f3ea] transition-colors group-hover:bg-[#c9a227]">
        <Icon
          size={15}
          className="text-[#8a6d2f] transition-colors group-hover:text-[#241611]"
        />
      </span>

      <span className="text-xs font-medium leading-5 text-[#6b5f4f] transition-colors group-hover:text-[#241611]">
        {section.title}
      </span>
    </button>
  );
};

const ContactDetail = ({
  icon: Icon,
  label,
  value,
  href,
  fullWidth = false,
}) => {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5efe3]">
        <Icon size={18} className="text-[#8a6d2f]" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c9a227]">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium leading-6 text-[#241611]">
          {value}
        </p>
      </div>
    </>
  );

  const className = `flex items-start gap-3 rounded-2xl border border-[#241611]/10 bg-[#fbf8f2] p-4 ${
    fullWidth ? "sm:col-span-2" : ""
  }`;

  if (href) {
    const isExternalLink = href.startsWith("http");

    return (
      <a
        href={href}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noreferrer" : undefined}
        className={`${className} transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a227]/40 hover:shadow-md`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

/* =====================================================
   TERMS AND CONDITIONS CONTENT
===================================================== */

const TERMS_SECTIONS = [
  {
    id: "parties-and-scope",
    number: "01",
    title: "Parties and Scope",
    icon: Building2,
    content: (
      <>
        <p>
          These Terms of Service (“Terms”) govern all quotations,
          purchase orders, domestic and export sales, product enquiries
          and commercial transactions between {COMPANY_NAME} (“Eagle
          Incense Sticks”, “we”, “us” or “our”) and any customer, buyer,
          importer, distributor, wholesaler, retailer or trading entity
          purchasing or requesting our incense sticks, agarbatti, dhoop
          products, fragrances, packaging or related products (“Buyer”,
          “you” or “your”).
        </p>

        <p>
          By submitting an enquiry, requesting a quotation, confirming a
          purchase order, accepting a Proforma Invoice, making a payment
          or purchasing products from {COMPANY_NAME}, the Buyer confirms
          that they have read, understood and agreed to these Terms.
        </p>

        <div className="rounded-2xl border border-[#c9a227]/25 bg-[#f8f3ea] p-5">
          <p className="text-sm leading-7 text-[#5f5145]">
            These Terms apply unless alternative conditions are expressly
            agreed to by {COMPANY_NAME} in writing.
          </p>
        </div>
      </>
    ),
  },

  {
    id: "orders-and-acceptance",
    number: "02",
    title: "Orders and Acceptance",
    icon: ClipboardCheck,
    content: (
      <>
        <p>
          All wholesale, private-label, domestic and export orders must
          be submitted in writing through email, an official purchase
          order or another communication method approved by{" "}
          {COMPANY_NAME}.
        </p>

        <TermsList
          items={[
            "An order is confirmed only after written acceptance by Eagle Incense Sticks and, where applicable, issuance of a quotation or Proforma Invoice.",
            "Product names, fragrances, quantities, sizes, packaging details, delivery details and product codes must match the accepted quotation or Proforma Invoice.",
            "Any discrepancy in a quotation or Proforma Invoice must be reported within 48 hours of issuance.",
            "Minimum order quantities may vary depending on the product, fragrance, packaging, private-labelling requirement and destination.",
            "Mixed products or fragrances may be permitted subject to production, packaging and availability.",
            "Eagle Incense Sticks reserves the right to decline or cancel an unconfirmed order without liability.",
          ]}
        />

        <p>
          Any change requested after confirmation may result in revised
          pricing, production schedules, packaging charges or delivery
          dates.
        </p>
      </>
    ),
  },

  {
    id: "pricing-and-payment",
    number: "03",
    title: "Pricing and Payment",
    icon: BadgeDollarSign,
    content: (
      <>
        <p>
          Prices will be quoted in Indian Rupees, United States Dollars
          or another currency expressly stated in the applicable
          quotation or Proforma Invoice.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <InformationCard
            icon={Clock3}
            title="Quotation Validity"
            description="Unless otherwise stated, quotations remain valid for 15 days from the date of issue."
          />

          <InformationCard
            icon={Landmark}
            title="Payment Terms"
            description="Advance and balance payment requirements will be specified in the applicable quotation or Proforma Invoice."
          />
        </div>

        <TermsSubheading title="Payment Conditions" />

        <TermsList
          items={[
            "Payments must be made only to the bank account or authorised payment method specified by Eagle Incense Sticks.",
            "Production may begin only after the required advance payment has been received, cleared and verified.",
            "Any remaining balance must be paid according to the terms stated in the quotation or Proforma Invoice.",
            "All bank charges, transfer charges, transaction fees, intermediary-bank fees and currency-conversion costs are borne by the Buyer unless agreed otherwise.",
            "Eagle Incense Sticks is not responsible for production or delivery delays caused by incomplete, withheld, failed or incorrectly transferred payments.",
          ]}
        />

        <div className="rounded-2xl border border-amber-700/15 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-1 shrink-0 text-amber-700"
            />

            <p className="text-sm leading-7 text-amber-900/80">
              Buyers should verify banking details directly with Eagle
              Incense Sticks before transferring funds. We are not
              responsible for payments sent to fraudulent, incorrect or
              unauthorised accounts.
            </p>
          </div>
        </div>
      </>
    ),
  },

  {
    id: "production-and-delivery",
    number: "04",
    title: "Production, Delivery and Shipping",
    icon: Ship,
    content: (
      <>
        <p>
          Production and delivery schedules depend on product quantity,
          fragrance, packaging, raw-material availability, customisation
          requirements and the delivery destination.
        </p>

        <TermsSubheading title="Production and Lead Time" />

        <TermsList
          items={[
            "Estimated production or dispatch dates are provided in good faith and are not guaranteed unless expressly confirmed in writing.",
            "Custom fragrances, private-label packaging and OEM orders may require additional production time.",
            "Production timelines begin after the required advance payment and final artwork, packaging or product approval have been received.",
            "Changes requested after production begins may result in additional charges and revised delivery dates.",
          ]}
        />

        <TermsSubheading title="Domestic and Export Shipping" />

        <TermsList
          items={[
            "Domestic orders may be dispatched through approved courier, transport or logistics providers.",
            "Export orders may be supplied on FOB, CIF, EXW or other agreed shipping terms stated in the Proforma Invoice.",
            "Applicable international shipping terms will be interpreted according to Incoterms 2020.",
            "The Buyer is responsible for obtaining all required import licences, registrations, customs approvals and destination-country permissions.",
            "Shipping, insurance, customs, taxes and related charges will be allocated according to the agreed commercial terms.",
          ]}
        />

        <p>
          {COMPANY_NAME} will not be liable for delays caused by courier
          companies, transport providers, shipping lines, customs
          authorities, port congestion, government restrictions or
          circumstances outside our reasonable control.
        </p>
      </>
    ),
  },

  {
    id: "product-quality",
    number: "05",
    title: "Product Quality and Inspection",
    icon: PackageCheck,
    content: (
      <>
        <p>
          Our products are manufactured and packed according to
          applicable internal quality-control procedures and are
          inspected before dispatch.
        </p>

        <TermsList
          items={[
            "The Buyer must review product specifications, fragrance, colour, quantity, size and packaging information before confirming an order.",
            "Pre-shipment inspection may be arranged for qualifying wholesale or export orders where mutually agreed.",
            "Any third-party inspection cost will be borne by the Buyer unless agreed otherwise.",
            "Acceptance during pre-shipment inspection does not remove the Buyer’s obligation to inspect goods promptly after delivery.",
            "Product appearance may vary slightly between batches because of natural ingredients, fragrance oils, raw materials and manufacturing conditions.",
          ]}
        />

        <TermsSubheading title="Fragrance and Appearance Variations" />

        <p>
          Incense sticks, agarbatti and dhoop products may exhibit minor
          differences in fragrance intensity, shade, texture, thickness,
          burning duration or surface appearance between production
          batches.
        </p>

        <p>
          Reasonable variations arising from natural ingredients or
          normal manufacturing processes do not constitute product
          defects.
        </p>

        <div className="rounded-2xl border border-[#c9a227]/25 bg-[#f8f3ea] p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-1 shrink-0 text-[#9a7820]"
            />

            <p className="text-sm leading-7 text-[#5f5145]">
              Product performance may also be affected by storage,
              humidity, temperature, handling and environmental
              conditions after delivery.
            </p>
          </div>
        </div>
      </>
    ),
  },

  {
    id: "claims-and-returns",
    number: "06",
    title: "Claims, Returns and Replacements",
    icon: RotateCcw,
    content: (
      <>
        <p>
          The Buyer must inspect all products promptly upon delivery and
          notify {COMPANY_NAME} in writing of any shortage, transit
          damage, incorrect product or material quality concern.
        </p>

        <TermsList
          items={[
            "Claims must be submitted within 14 days of receiving the products unless a different period is stated in writing.",
            "Every claim must include clear photographs, videos where applicable, product details, batch details, affected quantity and a description of the issue.",
            "Claims submitted after the applicable claim period may not be accepted.",
            "The Buyer must preserve the affected products, cartons, labels and packaging until the claim has been reviewed.",
            "Products must not be destroyed, altered, repacked, used or disposed of without prior written approval.",
          ]}
        />

        <TermsSubheading title="Available Remedies" />

        <p>
          Where a claim is investigated and accepted, our liability will
          be limited, at our discretion, to one of the following:
        </p>

        <TermsList
          items={[
            "Replacement of the accepted defective or missing quantity.",
            "A credit note equal to the accepted invoice value of the affected products.",
            "Another commercially reasonable resolution agreed to in writing.",
          ]}
        />

        <p>
          Returns are not accepted without prior written authorisation
          from {COMPANY_NAME}. We are not liable for indirect,
          consequential, incidental, punitive or special damages arising
          from product use, delayed delivery or rejected goods.
        </p>
      </>
    ),
  },

  {
    id: "product-use-and-storage",
    number: "07",
    title: "Product Use and Storage",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          Buyers and end users are responsible for using and storing
          incense products safely and according to the instructions
          provided on the packaging.
        </p>

        <TermsList
          items={[
            "Incense products must be kept away from children, pets and flammable materials.",
            "Products must be burned only in a suitable incense holder on a stable, heat-resistant surface.",
            "Burning incense must never be left unattended.",
            "Products should be used in a properly ventilated area.",
            "Products must be stored in a cool, dry location away from direct sunlight, moisture and excessive heat.",
            "The Buyer must ensure that any resale packaging includes applicable safety, product-use and regulatory information.",
          ]}
        />

        <p>
          {COMPANY_NAME} is not responsible for damage, fire, injury,
          fragrance deterioration or reduced product performance caused
          by improper use, storage, handling or resale.
        </p>
      </>
    ),
  },

  {
    id: "intellectual-property",
    number: "08",
    title: "Intellectual Property and Private Labelling",
    icon: Palette,
    content: (
      <>
        <p>
          All product photographs, fragrance concepts, designs,
          catalogues, website content, packaging concepts, trademarks,
          logos, graphics and commercial materials belonging to{" "}
          {COMPANY_NAME} remain our intellectual property unless
          otherwise agreed in writing.
        </p>

        <TermsList
          items={[
            "Buyers may not copy, reproduce, distribute or commercially use our designs, photographs or content without written permission.",
            "Custom packaging, printing plates, dies, moulds, samples and development charges may be quoted separately.",
            "Custom development and artwork charges are non-refundable after the relevant work has commenced.",
            "Payment of development charges does not automatically transfer ownership of tooling, designs or intellectual property.",
          ]}
        />

        <TermsSubheading title="Buyer-Supplied Branding" />

        <p>
          For OEM or private-label orders, the Buyer warrants that all
          names, trademarks, logos, labels, artwork and packaging
          materials supplied by the Buyer are legally owned or properly
          authorised.
        </p>

        <p>
          The Buyer agrees to indemnify {COMPANY_NAME} against any claim,
          penalty, loss or expense arising from infringement connected
          with Buyer-supplied branding, packaging or artwork.
        </p>
      </>
    ),
  },

  {
    id: "confidentiality",
    number: "09",
    title: "Confidentiality",
    icon: LockKeyhole,
    content: (
      <>
        <p>
          Both parties agree to keep confidential all non-public
          commercial, technical, financial and business information
          exchanged during their commercial relationship.
        </p>

        <TermsList
          items={[
            "Pricing, quotations and discount structures",
            "Product formulations, fragrances and specifications",
            "Samples and production information",
            "Packaging and private-labelling requirements",
            "Customer, supplier and distributor information",
            "Payment terms and commercial arrangements",
            "Business plans and market information",
          ]}
        />

        <p>
          Confidential information may be disclosed only to employees,
          professional advisers, banks, logistics providers or
          authorities who reasonably require access and are subject to
          appropriate confidentiality obligations.
        </p>

        <p>
          This obligation continues for three years after completion,
          cancellation or termination of the applicable transaction or
          business relationship.
        </p>
      </>
    ),
  },

  {
    id: "force-majeure",
    number: "10",
    title: "Force Majeure",
    icon: CloudLightning,
    content: (
      <>
        <p>
          {COMPANY_NAME} shall not be liable for any delay,
          interruption or failure to perform an obligation caused by
          circumstances beyond our reasonable control.
        </p>

        <TermsList
          items={[
            "Natural disasters, floods, fires, earthquakes or extreme weather",
            "War, terrorism, civil unrest or political instability",
            "Government restrictions, sanctions, lockdowns or export prohibitions",
            "Labour disputes, strikes or factory shutdowns",
            "Raw-material, packaging, electricity or utility shortages",
            "Courier, transport, port, shipping or container disruptions",
            "Epidemics, pandemics or public-health emergencies",
            "Failure or delay by carriers, suppliers or government authorities",
          ]}
        />

        <p>
          Where such an event occurs, we will take commercially
          reasonable steps to resume performance as soon as reasonably
          practicable. Applicable production and delivery periods may be
          extended for the duration of the event.
        </p>
      </>
    ),
  },

  {
    id: "limitation-of-liability",
    number: "11",
    title: "Limitation of Liability",
    icon: AlertTriangle,
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, the total
          liability of {COMPANY_NAME} arising from an order, product or
          commercial transaction will not exceed the invoice value of
          the products directly giving rise to the accepted claim.
        </p>

        <TermsList
          items={[
            "We are not liable for loss of profit, business interruption, reputational loss or lost business opportunities.",
            "We are not responsible for damage caused by misuse, incorrect storage, unauthorised alteration or non-compliant resale.",
            "We are not responsible for delays or losses caused by logistics providers, customs authorities or other independent third parties.",
            "Product descriptions and photographs are provided for general representation, and minor variations may occur.",
          ]}
        />

        <p>
          Nothing in these Terms excludes liability that cannot lawfully
          be excluded under applicable law.
        </p>
      </>
    ),
  },

  {
    id: "governing-law",
    number: "12",
    title: "Governing Law and Dispute Resolution",
    icon: Scale,
    content: (
      <>
        <p>
          These Terms and all transactions involving{" "}
          {COMPANY_NAME} shall be governed by and interpreted according
          to the laws of India.
        </p>

        <TermsSubheading title="Good-Faith Negotiation" />

        <p>
          Any dispute arising from these Terms, an order, payment,
          shipment or product claim shall first be referred to
          authorised representatives of both parties for good-faith
          negotiation.
        </p>

        <TermsSubheading title="Jurisdiction and Resolution" />

        <TermsList
          items={[
            "The parties will first attempt to resolve the dispute through written communication and good-faith negotiation.",
            "If the dispute remains unresolved, the parties may refer it to mediation or arbitration where mutually agreed in writing.",
            "Subject to any agreed arbitration arrangement, courts having jurisdiction in Bhopal, Madhya Pradesh, India will have jurisdiction over the dispute.",
            "The language of formal dispute proceedings will be English unless otherwise agreed.",
          ]}
        />

        <p>
          Nothing prevents {COMPANY_NAME} from seeking urgent interim or
          protective relief from a court of competent jurisdiction to
          protect payment rights, confidential information or
          intellectual property.
        </p>
      </>
    ),
  },

  {
    id: "amendments",
    number: "13",
    title: "Changes to These Terms",
    icon: RefreshCcw,
    content: (
      <>
        <p>
          {COMPANY_NAME} may revise these Terms to reflect changes in
          products, business operations, payment processes, shipping
          arrangements or applicable legal requirements.
        </p>

        <p>
          The version in effect when an order is confirmed will govern
          that transaction unless different terms are expressly accepted
          in writing.
        </p>

        <p>
          Updated Terms will be published on our website with a revised
          last-updated date. Buyers are encouraged to review these Terms
          before submitting each new order.
        </p>
      </>
    ),
  },

  {
    id: "legal-contact",
    number: "14",
    title: "Contact Us",
    icon: Mail,
    content: (
      <>
        <p>
          For questions, legal notices, order concerns or enquiries
          relating to these Terms and Conditions, contact Eagle Incense
          Sticks using the following details:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactDetail
            icon={Mail}
            label="Email Address"
            value={LEGAL_EMAIL}
            href={`mailto:${LEGAL_EMAIL}`}
          />

          <ContactDetail
            icon={Phone}
            label="Phone Number"
            value={PHONE_NUMBER}
            href={`tel:${PHONE_LINK}`}
          />

          <ContactDetail
            icon={MapPin}
            label="Registered Address"
            value={BUSINESS_ADDRESS}
            fullWidth
          />

          <ContactDetail
            icon={Globe2}
            label="Website"
            value="eagleincensesticks.com"
            href={WEBSITE}
          />

          <ContactDetail
          
            icon={Building2}
            label="Company"
            value={COMPANY_NAME}
          />
        </div>
      </>
    ),
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

const TermNcondition = () => {
  const [openMobileNavigation, setOpenMobileNavigation] =
    useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpenMobileNavigation(false);
  };

  return (
    <>
      <Header disableScrollColor />

      <main>
        <PageHero
          label="Legal Information"
          title="Terms & Conditions"
          subtitle="Review the terms governing product enquiries, quotations, payments, orders, production, delivery and commercial transactions with Eagle Incense Sticks."
          image="/heroPage.png"
        />

        {/*
          overflow-hidden sticky ko break kar sakta hai.
          Isliye yahan overflow-x-clip use kiya gaya hai.
        */}
        <section className="bg-[#fbf8f2] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Terms Introduction */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#241611] px-6 py-10 shadow-[0_25px_70px_rgba(36,22,17,0.18)] sm:px-10 lg:px-14 lg:py-14">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />

              <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#c9a227]/20" />

              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a227]">
                    <FileText size={27} className="text-[#241611]" />
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Terms of Service
                  </p>

                  <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
                    Terms & Conditions of Sale
                  </h1>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                    These Terms govern quotations, purchase orders,
                    payments, production, quality, delivery and
                    commercial transactions between Eagle Incense Sticks
                    and its customers, wholesalers, importers and
                    distributors.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[250px] lg:grid-cols-1">
                  <TermsMeta
                    label="Last Updated"
                    value={LAST_UPDATED}
                  />

                  <TermsMeta
                    label="Company"
                    value={COMPANY_NAME}
                  />

                  <TermsMeta
                    label="Governing Law"
                    value="Laws of India"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="mt-8 lg:hidden">
              <button
                type="button"
                onClick={() =>
                  setOpenMobileNavigation((current) => !current)
                }
                aria-expanded={openMobileNavigation}
                className="flex w-full items-center justify-between rounded-2xl border border-[#241611]/10 bg-white px-5 py-4 text-left shadow-sm"
              >
                <span className="flex items-center gap-3 font-semibold text-[#241611]">
                  <FileText size={19} className="text-[#9a7820]" />
                  Terms Contents
                </span>

                <ChevronDown
                  size={19}
                  className={`transition-transform duration-300 ${
                    openMobileNavigation ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openMobileNavigation
                    ? "mt-3 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="rounded-2xl border border-[#241611]/10 bg-white p-3">
                    {TERMS_SECTIONS.map((section) => (
                      <TermsNavigationButton
                        key={section.id}
                        section={section}
                        onClick={() => scrollToSection(section.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Layout */}
            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
  {/* Sticky Desktop Sidebar */}
  <aside className="hidden h-fit self-start lg:sticky lg:top-[110px] lg:block">
    <div className="sticky top-28 max-h-[calc(100vh-8rem)]">
      <div className="rounded-[28px] border border-[#241611]/10 bg-white p-5 shadow-[0_20px_55px_rgba(36,22,17,0.08)]">
        <div className="border-b border-[#241611]/10 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]">
            Terms of Service
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold text-[#241611]">
            Terms Contents
          </h2>
        </div>

        <nav className="mt-4 max-h-[48vh] space-y-1 overflow-y-auto overscroll-contain pr-2">
          {TERMS_SECTIONS.map((section) => (
            <TermsNavigationButton
              key={section.id}
              section={section}
              onClick={() => scrollToSection(section.id)}
            />
          ))}
        </nav>
      </div>

      
    </div>
  </aside>

  {/* Terms Sections */}
  <div className="min-w-0 space-y-6">
    {TERMS_SECTIONS.map(
      ({ id, number, title, icon: Icon, content }) => (
        <article
          key={id}
          id={id}
          className="scroll-mt-32 rounded-[28px] border border-[#241611]/10 bg-white p-6 shadow-[0_14px_45px_rgba(36,22,17,0.06)] sm:p-8 lg:p-10"
        >
          <div className="flex items-start gap-4 border-b border-[#241611]/10 pb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5efe3]">
              <Icon size={22} className="text-[#8a6d2f]" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                Section {number}
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#241611] sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-5 text-sm leading-7 text-[#6b5f4f] sm:text-base sm:leading-8">
            {content}
          </div>
        </article>
      ),
    )}
  </div>
</div>


            {/* Acceptance Notice */}
            <div className="mt-12 rounded-[28px] border border-[#c9a227]/25 bg-[#f8f3ea] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9a227]">
                  <Scale size={20} className="text-[#241611]" />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#241611]">
                    Acceptance of Terms
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6b5f4f]">
                    By submitting an order, approving a quotation,
                    confirming a Proforma Invoice or making payment, the
                    Buyer confirms acceptance of these Terms and
                    Conditions. Conflicting Buyer terms will not apply
                    unless expressly accepted by Eagle Incense Sticks in
                    writing.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Legal Notice */}
            <div className="mt-6 rounded-[28px] border border-amber-700/15 bg-amber-50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <AlertTriangle
                    size={20}
                    className="text-amber-700"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-amber-950">
                    Important Legal Notice
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-amber-900/75">
                    Commercial, export, product and dispute-resolution
                    requirements may vary depending on the destination
                    and transaction. These Terms should be reviewed by a
                    qualified legal professional before being relied upon
                    for binding commercial transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="relative mt-16 overflow-hidden rounded-[32px] bg-[#241611] px-6 py-14 text-center sm:px-10 lg:mt-20 lg:px-16 lg:py-16">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full border border-white/10" />

              <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full border border-[#c9a227]/20" />

              <div className="relative mx-auto max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                  Need Clarification?
                </span>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Contact Eagle Incense Sticks
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  Our team can assist with quotations, wholesale orders,
                  private labelling, payment terms, production schedules
                  and domestic or international shipping.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-7 py-4 text-sm font-semibold text-[#241611] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                  >
                    Contact Our Team
                    <ArrowRight size={18} />
                  </Link>

                  <a
                    href={`mailto:${LEGAL_EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#241611]"
                  >
                    <Mail size={18} />
                    Email Us
                  </a>

                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#241611]"
                  >
                    <Phone size={18} />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TermNcondition;