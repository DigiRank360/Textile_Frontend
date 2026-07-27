import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Database,
  ClipboardList,
  Cookie,
  Share2,
  LockKeyhole,
  Globe2,
  ExternalLink,
  UserRoundCheck,
  Clock3,
  RefreshCcw,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  FileText,
  Truck,
  Scale,
  AlertCircle,
} from "lucide-react";

import Header from "../components/Header/Header";
import PageHero from "../components/PageHero/PageHero";
import "../components/PageHero/PageSections.css";

const COMPANY_NAME = "Eagle Incense Sticks";
const WEBSITE = "https://eagleincensesticks.com";
const PRIVACY_EMAIL = "privacy@eagleincensesticks.com";

const BUSINESS_ADDRESS =
  "Add your registered business address, city, state, postal code, India";

const EFFECTIVE_DATE = "May 7, 2026";
const LAST_UPDATED = "May 7, 2026";

/* =====================================================
   HELPER COMPONENTS
===================================================== */

const PolicySubheading = ({ title }) => {
  return (
    <h3 className="pt-2 font-serif text-xl font-semibold text-[#241611]">
      {title}
    </h3>
  );
};

const PolicyList = ({ items }) => {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c9a227]" />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const LegalBasisCard = ({ title, description }) => {
  return (
    <div className="rounded-2xl border border-[#241611]/10 bg-[#fbf8f2] p-5">
      <h4 className="font-serif text-lg font-semibold text-[#241611]">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-7 text-[#6b5f4f]">
        {description}
      </p>
    </div>
  );
};

const PolicyMeta = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-white">{value}</p>
    </div>
  );
};

const PolicyNavigationButton = ({ section, onClick }) => {
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
   PRIVACY POLICY CONTENT
===================================================== */

const POLICY_SECTIONS = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          Welcome to {COMPANY_NAME}. We respect your privacy and are committed
          to handling personal information responsibly, transparently and
          securely.
        </p>

        <p>
          This Privacy Policy explains how we collect, use, store, disclose and
          protect personal information when you visit our website, contact us,
          submit an enquiry, request an export quotation, place an order,
          subscribe to updates or otherwise interact with our products and
          services.
        </p>

        <p>
          This policy applies to domestic and international visitors,
          customers, importers, distributors, wholesalers, retailers, business
          partners and other persons who interact with us.
        </p>

        <div className="rounded-2xl border border-[#c9a227]/25 bg-[#f8f3ea] p-5">
          <p className="text-sm leading-7 text-[#5f5145]">
            By accessing or using our website and voluntarily providing your
            information, you acknowledge the practices described in this
            Privacy Policy.
          </p>
        </div>
      </>
    ),
  },

  {
    id: "information-collected",
    number: "02",
    title: "Information We Collect",
    icon: Database,
    content: (
      <>
        <p>
          We may collect information directly from you, automatically through
          our website or from service providers involved in processing your
          enquiry, order or shipment.
        </p>

        <PolicySubheading title="Personal and Business Information" />

        <PolicyList
          items={[
            "Full name and job designation",
            "Email address and telephone or WhatsApp number",
            "Company, importer, distributor or organisation name",
            "Billing, shipping and business address",
            "Country, state, city and postal code",
            "Tax, customs, importer or business-identification details where required",
            "Product requirements, quantity, packaging and private-labelling requirements",
            "Messages, enquiries, feedback and customer-support communications",
          ]}
        />

        <PolicySubheading title="Order and Export Information" />

        <PolicyList
          items={[
            "Products ordered or requested",
            "Order quantity and commercial requirements",
            "Destination country and delivery location",
            "Shipping, logistics and freight information",
            "Customs, invoice and export-document information",
            "Order status, dispatch details and delivery records",
            "Payment status and transaction references",
          ]}
        />

        <PolicySubheading title="Payment Information" />

        <p>
          Payments may be processed through banks, payment gateways or other
          authorised payment providers. We generally do not directly store
          complete debit-card, credit-card or banking credentials. Payment
          providers process such information according to their own privacy and
          security practices.
        </p>

        <PolicySubheading title="Automatically Collected Information" />

        <PolicyList
          items={[
            "IP address and approximate location",
            "Device type and operating system",
            "Browser type and language settings",
            "Pages viewed and time spent on the website",
            "Referral source and website interactions",
            "Cookie identifiers and analytics information",
            "Date and time of website access",
          ]}
        />
      </>
    ),
  },

  {
    id: "information-use",
    number: "03",
    title: "How We Use Your Information",
    icon: ClipboardList,
    content: (
      <>
        <p>
          We use personal information only for legitimate business,
          contractual, operational, security and legal purposes.
        </p>

        <PolicyList
          items={[
            "Responding to product, wholesale, distribution and export enquiries",
            "Preparing quotations, pro-forma invoices and commercial documents",
            "Processing, confirming and fulfilling customer orders",
            "Coordinating shipping, freight forwarding, customs and delivery",
            "Communicating order status and responding to support requests",
            "Managing importer, distributor and business relationships",
            "Processing payments and verifying transactions",
            "Providing requested catalogues, samples and product information",
            "Improving our website, products and customer experience",
            "Preventing fraud, misuse and unauthorised activity",
            "Maintaining business records and resolving disputes",
            "Complying with tax, customs, export, sanctions and legal obligations",
            "Sending marketing communications where permitted or consented to",
          ]}
        />
      </>
    ),
  },

  {
    id: "legal-basis",
    number: "04",
    title: "Legal Basis for Processing",
    icon: Scale,
    content: (
      <>
        <p>
          Where applicable data-protection laws require a lawful basis, we may
          process your information on one or more of the following grounds:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <LegalBasisCard
            title="Consent"
            description="When you voluntarily agree to receive marketing communications or provide information for a specific purpose."
          />

          <LegalBasisCard
            title="Contract"
            description="When processing is necessary to provide a quotation, process an order, arrange delivery or perform an agreement."
          />

          <LegalBasisCard
            title="Legal Obligation"
            description="When we must retain or disclose information for tax, customs, export-control, accounting or regulatory requirements."
          />

          <LegalBasisCard
            title="Legitimate Interests"
            description="When processing supports our business operations, security, fraud prevention and service improvement without overriding your rights."
          />
        </div>
      </>
    ),
  },

  {
    id: "export-information",
    number: "05",
    title: "International Orders and Export Processing",
    icon: Truck,
    content: (
      <>
        <p>
          When you submit an international enquiry or place an export order, we
          may process additional information necessary to fulfil the commercial
          transaction.
        </p>

        <PolicyList
          items={[
            "Importer or consignee details",
            "Company-registration and tax information",
            "Destination-country information",
            "Shipping and freight preferences",
            "Customs declarations and shipment documentation",
            "Commercial invoices and packing lists",
            "Banking or transaction references",
            "Regulatory, certification or product-compliance requirements",
          ]}
        />

        <p>
          We may share relevant information with freight forwarders, customs
          brokers, shipping carriers, banks, insurers, inspection agencies,
          certification bodies and government authorities where necessary to
          process and complete an international shipment.
        </p>
      </>
    ),
  },

  {
    id: "cookies",
    number: "06",
    title: "Cookies and Tracking Technologies",
    icon: Cookie,
    content: (
      <>
        <p>
          We may use cookies and similar technologies to operate our website,
          remember preferences, understand website usage and improve
          functionality.
        </p>

        <PolicySubheading title="Types of Cookies We May Use" />

        <PolicyList
          items={[
            "Essential cookies required for core website functionality",
            "Preference cookies that remember selected settings",
            "Analytics cookies that help us understand website performance",
            "Security cookies used to identify suspicious or fraudulent activity",
            "Marketing cookies where permitted and where consent is obtained",
          ]}
        />

        <p>
          You can control or disable cookies through your browser settings.
          Disabling certain cookies may affect the availability or performance
          of some website features.
        </p>
      </>
    ),
  },

  {
    id: "sharing",
    number: "07",
    title: "How We Share Information",
    icon: Share2,
    content: (
      <>
        <p>
          We do not sell or rent personal information. We may disclose limited
          information to trusted third parties only where it is reasonably
          necessary for legitimate business or legal purposes.
        </p>

        <PolicyList
          items={[
            "Payment gateways, banks and financial-service providers",
            "Shipping companies, freight forwarders and logistics partners",
            "Customs brokers and export-documentation providers",
            "Cloud hosting, website and email-service providers",
            "Analytics and website-performance providers",
            "Professional advisers, accountants and auditors",
            "Insurance, inspection and certification providers",
            "Government, customs, regulatory or law-enforcement authorities",
            "Business successors in connection with a merger, acquisition or restructuring",
          ]}
        />

        <p>
          Service providers are expected to process information only for the
          authorised purpose and to maintain appropriate confidentiality and
          security protections.
        </p>
      </>
    ),
  },

  {
    id: "international-transfers",
    number: "08",
    title: "International Data Transfers",
    icon: Globe2,
    content: (
      <>
        <p>
          Because we serve international customers and use technology, payment,
          communication and logistics providers, personal information may be
          transferred to, stored in or accessed from countries other than the
          country in which you are located.
        </p>

        <p>
          These countries may have different data-protection laws. Where
          required, we take reasonable steps to ensure that international
          transfers are supported by appropriate safeguards, contractual
          protections, recognised transfer mechanisms or another lawful basis.
        </p>

        <p>
          Such safeguards may include contractual data-protection obligations,
          access controls, confidentiality requirements and recognised standard
          contractual clauses where applicable.
        </p>

        <div className="rounded-2xl border border-[#c9a227]/25 bg-[#f8f3ea] p-5">
          <div className="flex items-start gap-3">
            <Globe2 size={20} className="mt-1 shrink-0 text-[#9a7820]" />

            <p className="text-sm leading-7 text-[#5f5145]">
              International customers may contact us to request additional
              information about how their personal data is transferred and
              protected.
            </p>
          </div>
        </div>
      </>
    ),
  },

  {
    id: "security",
    number: "09",
    title: "Data Security",
    icon: LockKeyhole,
    content: (
      <>
        <p>
          We use reasonable technical, administrative and organisational
          measures intended to protect personal information against
          unauthorised access, misuse, alteration, disclosure, destruction or
          accidental loss.
        </p>

        <PolicyList
          items={[
            "Access restrictions and authentication controls",
            "Secure hosting and encrypted connections where supported",
            "Limited access based on business requirements",
            "Regular software and security updates",
            "Service-provider confidentiality requirements",
            "Internal procedures for handling personal information",
            "Incident assessment and response measures",
          ]}
        />

        <div className="rounded-2xl border border-amber-700/15 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={20}
              className="mt-1 shrink-0 text-amber-700"
            />

            <p className="text-sm leading-7 text-amber-900/80">
              No internet transmission, email communication or electronic
              storage system is completely secure. Therefore, we cannot
              guarantee absolute security.
            </p>
          </div>
        </div>
      </>
    ),
  },

  {
    id: "retention",
    number: "10",
    title: "Data Retention",
    icon: Clock3,
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary for the purpose for which it was collected, including:
        </p>

        <PolicyList
          items={[
            "Completing enquiries, quotations and orders",
            "Maintaining commercial and customer-service records",
            "Managing international shipping and customs requirements",
            "Complying with tax, accounting and legal obligations",
            "Preventing fraud and resolving complaints or disputes",
            "Establishing, exercising or defending legal claims",
          ]}
        />

        <p>
          Retention periods may vary depending on the type of information,
          transaction, applicable law and business requirement. When
          information is no longer required, we may securely delete, anonymise
          or archive it as legally permitted.
        </p>
      </>
    ),
  },

  {
    id: "rights",
    number: "11",
    title: "Your Privacy Rights",
    icon: UserRoundCheck,
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have certain
          rights regarding your personal information.
        </p>

        <PolicyList
          items={[
            "Request access to personal information held about you",
            "Request correction of inaccurate or incomplete information",
            "Request deletion of information in applicable circumstances",
            "Withdraw consent where processing is based on consent",
            "Object to or restrict certain types of processing",
            "Request a copy of eligible information in a portable format",
            "Opt out of promotional and marketing communications",
            "Lodge a complaint with an appropriate data-protection authority",
            "Nominate or authorise another person where permitted by applicable law",
          ]}
        />

        <p>
          These rights are not absolute and may be subject to legal exceptions.
          We may request information to verify your identity before acting on a
          privacy request.
        </p>

        <a
          href={`mailto:${PRIVACY_EMAIL}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#241611] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#c9a227] hover:text-[#241611]"
        >
          Submit a Privacy Request
          <ArrowRight size={17} />
        </a>
      </>
    ),
  },

  {
    id: "marketing",
    number: "12",
    title: "Marketing Communications",
    icon: Mail,
    content: (
      <>
        <p>
          We may send product updates, catalogues, offers, industry information
          or promotional communications where you have requested them or where
          otherwise permitted by law.
        </p>

        <p>
          You may unsubscribe at any time by using the unsubscribe option
          included in the communication or by contacting us. Even after you opt
          out of marketing, we may still send necessary transactional messages
          relating to enquiries, orders, payments or shipments.
        </p>
      </>
    ),
  },

  {
    id: "third-party",
    number: "13",
    title: "Third-Party Links and Services",
    icon: ExternalLink,
    content: (
      <>
        <p>
          Our website may include links to third-party websites, marketplaces,
          payment services, logistics providers, social-media platforms or
          other external services.
        </p>

        <p>
          We do not control and are not responsible for the privacy practices,
          security or content of external websites. We recommend reviewing the
          privacy policy of each third-party service before providing personal
          information.
        </p>
      </>
    ),
  },

  {
    id: "policy-updates",
    number: "14",
    title: "Changes to This Privacy Policy",
    icon: RefreshCcw,
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our business operations, website features, service providers or
          applicable legal requirements.
        </p>

        <p>
          Any updated version will be published on this page with a revised
          effective or last-updated date. We encourage you to review this page
          periodically.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    number: "15",
    title: "Contact Us",
    icon: Mail,
    content: (
      <>
        <p>
          For questions, concerns or requests regarding this Privacy Policy or
          our handling of personal information, contact us using the following
          details:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactDetail
            icon={Mail}
            label="Privacy Email"
            value={PRIVACY_EMAIL}
            href={`mailto:${PRIVACY_EMAIL}`}
          />

          <ContactDetail
            icon={Globe2}
            label="Website"
            value="eagleincensesticks.com"
            href={WEBSITE}
          />

          <ContactDetail
            icon={MapPin}
            label="Registered Address"
            value={BUSINESS_ADDRESS}
            fullWidth
          />

          <ContactDetail
            icon={FileText}
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

const PrivacyAndPolicy = () => {
  const [openMobileNavigation, setOpenMobileNavigation] = useState(false);

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
          label="Legal & Privacy"
          title="Privacy Policy"
          subtitle="Learn how Eagle Incense Sticks collects, uses and protects personal information across domestic and international business interactions."
          image="/heroPage.png"
        />

        <section className="bg-[#fbf8f2] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Policy Introduction */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#241611] px-6 py-10 shadow-[0_25px_70px_rgba(36,22,17,0.18)] sm:px-10 lg:px-14 lg:py-14">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />

              <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#c9a227]/20" />

              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a227]">
                    <ShieldCheck size={27} className="text-[#241611]" />
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Your Privacy Matters
                  </p>

                  <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
                    Privacy Policy for Global Customers
                  </h1>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                    This policy describes how we handle personal information
                    belonging to website visitors, retail customers,
                    wholesalers, importers, distributors and international
                    business partners.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[250px] lg:grid-cols-1">
                  <PolicyMeta
                    label="Effective Date"
                    value={EFFECTIVE_DATE}
                  />

                  <PolicyMeta
                    label="Last Updated"
                    value={LAST_UPDATED}
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
                  Policy Contents
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
                    {POLICY_SECTIONS.map((section) => (
                      <PolicyNavigationButton
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
            <div className="mt-10 grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
              {/* Sidebar */}
              <aside className="hidden h-fit self-start lg:sticky lg:top-[110px] lg:block">
    <div className="sticky top-28 max-h-[calc(100vh-8rem)]">
                  <div className="rounded-[28px] border border-[#241611]/10 bg-white p-5 shadow-[0_20px_55px_rgba(36,22,17,0.08)]">
                    <div className="border-b border-[#241611]/10 pb-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]">
                        Privacy Policy
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-semibold text-[#241611]">
                        Policy Contents
                      </h2>
                    </div>

                    <nav className="mt-4 max-h-[62vh] space-y-1 overflow-y-auto pr-1">
                      {POLICY_SECTIONS.map((section) => (
                        <PolicyNavigationButton
                          key={section.id}
                          section={section}
                          onClick={() => scrollToSection(section.id)}
                        />
                      ))}
                    </nav>
                  </div>

                  
                </div>
              </aside>

              {/* Sections */}
              <div className="space-y-6">
                {POLICY_SECTIONS.map(
                  ({ id, number, title, icon: Icon, content }) => (
                    <article
                      key={id}
                      id={id}
                      className="scroll-mt-28 rounded-[28px] border border-[#241611]/10 bg-white p-6 shadow-[0_14px_45px_rgba(36,22,17,0.06)] sm:p-8 lg:p-10"
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

            {/* Legal Notice */}
            <div className="mt-10 rounded-[28px] border border-[#c9a227]/25 bg-[#f8f3ea] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9a227]">
                  <Scale size={20} className="text-[#241611]" />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#241611]">
                    Important Legal Notice
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6b5f4f]">
                    Privacy requirements vary by country and depend on your
                    actual data-processing practices. This policy should be
                    reviewed against the services, analytics tools, payment
                    providers, shipping partners and marketing systems your
                    business actually uses.
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
                  Need More Information?
                </span>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Contact Our Team About Privacy or Export Enquiries
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  We are available to assist customers, importers, wholesalers
                  and distributors with product, export and personal-data
                  enquiries.
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
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#241611]"
                  >
                    <Mail size={18} />
                    Privacy Enquiry
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

export default PrivacyAndPolicy;
