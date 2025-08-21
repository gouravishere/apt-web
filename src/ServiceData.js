import TaxBannerIcon from "./assets/icons/taxBanner.svg";
import FemaBannerIcon from "./assets/icons/FemaBanner.svg";
import GstBannerIcon from "./assets/icons/GstBanner.svg";
import RocBannerIcon from "./assets/icons/RocBanner.svg";
import taxFilingBanner from "./assets/icons/taxFilingBanner.svg";
// Import all Who icons
import TaxWhoWeAre1 from "./assets/icons/tax-whoAndWhen1.svg";
import TaxWhoWeAre2 from "./assets/icons/tax-whoAndWhen2.svg";
import TaxWhoWeAre3 from "./assets/icons/tax-whoAndWhen3.svg";
import TaxWhoWeAre4 from "./assets/icons/tax-whoAndWhen4.svg";
import FemaWho1 from "./assets/icons/FemaWho1.svg";
import FemaWho2 from "./assets/icons/FemaWho2.svg";
import FemaWho3 from "./assets/icons/FemaWho3.svg";
import FemaWho4 from "./assets/icons/FemaWho4.svg";
import GstWho1 from "./assets/icons/GstWho1.svg";
import GstWho2 from "./assets/icons/GstWho2.svg";
import GstWho3 from "./assets/icons/GstWho3.svg";
import GstWho4 from "./assets/icons/GstWho4.svg";
import RocWho1 from "./assets/icons/RocWho1.svg";
import RocWho2 from "./assets/icons/RocWho2.svg";
import RocWho3 from "./assets/icons/RocWho3.svg";
import RocWho4 from "./assets/icons/RocWho4.svg";
import SetupCard1 from "./assets/icons/SetupCard1.svg";
import SetupCard2 from "./assets/icons/SetupCard2.svg";
import SetupCard3 from "./assets/icons/SetupCard3.svg";
import SetupCard4 from "./assets/icons/SetupCard4.svg";
import SetupCard5 from "./assets/icons/SetupCard5.svg";
import SetupCard6 from "./assets/icons/SetupCard6.svg";
import ConsCard1 from "./assets/icons/ConsCard1.svg";
import ConsCard2 from "./assets/icons/ConsCard2.svg";
import ConsCard3 from "./assets/icons/ConsCard3.svg";
import ConsCard4 from "./assets/icons/ConsCard4.svg";
import ConsCard5 from "./assets/icons/ConsCard5.svg";
import ConsCard6 from "./assets/icons/ConsCard6.svg";
import SetupBanner from "./assets/icons/SetupBanner.svg";
import ConsBanner from "./assets/icons/ConsBanner.svg";
import ConsWho1 from "./assets/icons/ConsWho1.svg";
import ConsWho2 from "./assets/icons/ConsWho2.svg";
import ConsWho3 from "./assets/icons/ConsWho3.svg";
import ConsWho4 from "./assets/icons/ConsWho4.svg";
import ConsWho5 from "./assets/icons/ConsWho5.svg";
import ConsWho6 from "./assets/icons/ConsWho6.svg";
import SetupWho1 from "./assets/icons/SetupWho1.svg";
import SetupWho2 from "./assets/icons/SetupWho2.svg";
import SetupWho3 from "./assets/icons/SetupWho3.svg";
import SetupWho4 from "./assets/icons/SetupWho4.svg";
import SetupWho5 from "./assets/icons/SetupWho5.svg";
import SetupWho6 from "./assets/icons/SetupWho6.svg";
import GstCard1 from "./assets/icons/GstCard1.svg";
import GstCard2 from "./assets/icons/GstCard2.svg";
import GstCard3 from "./assets/icons/GstCard3.svg";
import TaxCard1 from "./assets/icons/TaxCard1.svg";
import TaxCard2 from "./assets/icons/TaxCard2.svg";
import TaxCard3 from "./assets/icons/TaxCard3.svg";
import FemaCard1 from "./assets/icons/FemaCard1.svg";
import FemaCard2 from "./assets/icons/FemaCard2.svg";
import FemaCard3 from "./assets/icons/FemaCard3.svg";
import RocCard1 from "./assets/icons/RocCard1.svg";
import RocCard2 from "./assets/icons/RocCard2.svg";
import RocCard3 from "./assets/icons/RocCard3.svg";
import ServiceTax from "./assets/icons/ServiceTaxIcon.svg";
import GstTax from "./assets/icons/GstServiceIcon.svg";
import RocTax from "./assets/icons/RocServiceIcon.svg";
import FemaTax from "./assets/icons/FemaServiceIcon.svg";
import SetupTax from "./assets/icons/SetupServiceIcon.svg";
import IndiaFlag from "./assets/icons/indiaFlag.svg";
import UaeFlag from "./assets/icons/uaeFlag.svg";
import SaudiFlag from "./assets/icons/arabiaFlag.svg";
import QatarFlag from "./assets/icons/qatarFlag.svg";
import SingaporeFlag from "./assets/icons/singaporeFlag.svg";
import OmanFlag from "./assets/icons/oman-flag-round-icon.svg";
import KuwaitFlag from "./assets/icons/kuwait-flag-round-circle-icon.svg";
// import HKFlag from "./assets/icons/hongkongFlag.svg";

export const SERVICE_PATHS = {
  "tax-filing": "taxFiling",
  "fema-compliance": "femaCompliance",
  "gst-services": "gstServices",
  "roc-services": "rocServices",
  "business-setup": "businessSetup",
  "business-consultancy": "businessConsultancy",
  "company-setup": "companySetup",
  "accounting-management": "accountingManagement",
};

export const CountryServices = {
  india: {
    countryIcon: IndiaFlag,
    services: [
      {
        serviceId: "serIn1",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: ServiceTax,
        path: "service/india/tax-filing",
        description:
          "Simplify your tax filing process with our accurate and efficient solutions tailored to your needs.",
      },
      {
        serviceId: "serIn2",
        serviceName: "GST Services",
        service: "gst-services",
        icon: GstTax,
        path: "service/india/gst-services",
        description:
          "Streamline your GST returns with precision and expert guidance every step of the way.",
      },
      {
        serviceId: "serIn3",
        serviceName: "ROC Filing",
        service: "roc-services",
        icon: RocTax,
        path: "service/india/roc-services",
        description:
          "Comprehensive ROC Filing support to ensure your company stays legally compliant and updated.",
      },
      {
        serviceId: "serIn4",
        serviceName: "FEMA",
        service: "fema-compliance",
        icon: FemaTax,
        path: "service/india/fema-compliance",
        description:
          "Expert solutions for FEMA compliance, helping you manage cross-border transactions with ease.",
      },
      {
        serviceId: "serIn5",
        serviceName: "Business Setup",
        service: "business-setup",
        icon: SetupTax,
        path: "service/india/business-setup",
        description:
          "From company incorporation to GST registration, our expert-driven solutions ensure a seamless setup process tailored to your goals.",
      },
      {
        serviceId: "serIn6",
        serviceName: "Business Consultancy",
        service: "business-consultancy",
        icon: ConsWho1,
        path: "service/india/business-consultancy",
        description:
          "From professional consultations to Virtual CFO services, our tailored solutions empower your business to thrive.",
      },
    ],
  },
  uae: {
    countryIcon: UaeFlag,
    services: [
      {
        serviceId: "serUae1",
        serviceName: "Company Setup",
        service: "company-setup",
        icon: SetupWho1,
        description:
          "Comprehensive ROC Filing support to ensure your company stays legally compliant and updated",
        path: "service/uae/company-setup",
      },
      {
        serviceId: "serUae2",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: TaxWhoWeAre1,
        description:
          "Simplify your tax filing process with our accurate and efficient solutions tailored to your needs.",
        path: "service/uae/tax-filing",
      },
      {
        serviceId: "serUae3",
        serviceName: "Accounting and Management",
        service: "accounting-management",
        icon: ConsWho1,
        description:
          "Comprehensive ROC Filing support to ensure your company stays legally compliant and updated",
        path: "service/uae/accounting-management",
      },
    ],
  },
  saudi: {
    countryIcon: SaudiFlag,
    services: [
      {
        serviceId: "serSa1",
        serviceName: "Company Setup",
        service: "company-setup",
        icon: SetupWho1,
        description:
          "Complete setup solutions for starting your business in Saudi Arabia with legal and regulatory compliance.",
        path: "service/saudi/company-setup",
      },
      {
        serviceId: "serSa2",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: TaxWhoWeAre1,
        description:
          "Streamlined tax filing services to ensure timely and accurate submissions according to Saudi regulations.",
        path: "service/saudi/tax-filing",
      },
      {
        serviceId: "serSa3",
        serviceName: "Accounting and Management",
        service: "accounting-management",
        icon: ConsWho1,
        description:
          "Expert accounting and management services to keep your business operations smooth and compliant.",
        path: "service/saudi/accounting-management",
      },
    ],
  },
  oman: {
    countryIcon: OmanFlag,
    services: [
      {
        serviceId: "serOm1",
        serviceName: "Company Setup",
        service: "company-setup",
        description:
          "Establish your business in Oman with complete support for company registration and compliance.",
        icon: SetupWho1,
        path: "service/oman/company-setup",
      },
      {
        serviceId: "serOm2",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: TaxWhoWeAre1,
        description:
          "Efficient tax filing services ensuring accurate and timely tax submissions as per Omani laws.",
        path: "service/oman/tax-filing",
      },
      {
        serviceId: "serOm3",
        serviceName: "Accounting and Management",
        service: "accounting-management",
        icon: ConsWho1,
        description:
          "Professional accounting and management services tailored to keep your Omani business compliant.",
        path: "service/oman/accounting-management",
      },
    ],
  },
  qatar: {
    countryIcon: QatarFlag,
    services: [
      {
        serviceId: "serQa1",
        serviceName: "Company Setup",
        service: "company-setup",
        icon: SetupWho1,
        description:
          "Expert assistance for setting up your company in Qatar with full regulatory and legal support.",
        path: "service/qatar/company-setup",
      },
      {
        serviceId: "serQa2",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: TaxWhoWeAre1,
        description:
          "Hassle-free tax filing services that ensure compliance with Qatar’s tax regulations.",
        path: "service/qatar/tax-filing",
      },
      {
        serviceId: "serQa3",
        serviceName: "Accounting and Management",
        service: "accounting-management",
        icon: ConsWho1,
        description:
          "Comprehensive accounting and management services to help your Qatari business stay on track.",
        path: "service/qatar/accounting-management",
      },
    ],
  },
  kuwait: {
    countryIcon: KuwaitFlag,
    services: [
      {
        serviceId: "serKu1",
        serviceName: "Company Setup",
        service: "company-setup",
        icon: SetupWho1,
        description:
          "We offer full support for setting up your company in Kuwait, ensuring compliance with all legal requirements.",
        path: "service/kuwait/company-setup",
      },
      {
        serviceId: "serKu2",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: TaxWhoWeAre1,
        description:
          "Accurate and timely tax filing services tailored to Kuwait's tax policies and regulations.",
        path: "service/kuwait/tax-filing",
      },
      {
        serviceId: "serKu3",
        serviceName: "Accounting and Management",
        service: "accounting-management",
        icon: ConsWho1,
        description:
          "Reliable accounting and business management services to keep your Kuwait-based company compliant.",
        path: "service/kuwait/accounting-management",
      },
    ],
  },
  singapore: {
    countryIcon: SingaporeFlag,
    services: [
      {
        serviceId: "serSi1",
        serviceName: "Company Setup",
        service: "company-setup",
        icon: SetupWho1,
        description:
          "Complete guidance for establishing your business in Singapore with legal, financial, and regulatory support.",
        path: "service/singapore/company-setup",
      },
      {
        serviceId: "serSi2",
        serviceName: "Tax Filing",
        service: "tax-filing",
        icon: TaxWhoWeAre1,
        description:
          "Efficient tax filing services that ensure compliance with Singapore's tax laws and deadlines.",
        path: "service/singapore/tax-filing",
      },
      {
        serviceId: "serSi3",
        serviceName: "Accounting and Management",
        service: "accounting-management",
        icon: ConsWho1,
        description:
          "Professional accounting and management solutions to maintain your Singapore business’s legal standing.",
        path: "service/singapore/accounting-management",
      },
    ],
  },
};

export const IndiaServices = {
  taxFiling: {
    bannerIcon: taxFilingBanner,
    enum: "ITR_SERVICE",
    bannerHeading:
      "File Your Taxes with Confidence: Fast, Accurate, Hassle-Free",
    bannerDescription:
      "Our expert-driven, tech-powered solutions ensure accurate tax filings, timely submissions, and maximum savings—making us your best partner for stress-free compliance.",
    heading: "Tax Filing Services",
    benefitHeading: "Benefits of Tax Filing Services",
    benefitDescription:
      "Tax filing is a crucial aspect of financial compliance, ensuring individuals and businesses declare their income and pay taxes to the government accurately. It involves calculating income, identifying eligible deductions, and submitting tax returns within prescribed deadlines. Tax filing is not just about fulfilling a legal obligation; it also helps taxpayers avoid penalties, secure loans, and claim refunds. For businesses, it ensures credibility and smooth operations. Accurate tax filing builds a foundation for financial planning, allowing individuals and companies to maximize savings and minimize liabilities.\n\n" +
      "Tax filing is important because non-compliance can result in hefty penalties and interest. Filing taxes on time allows you to avail of deductions under various sections of the Income Tax Act, such as 80C, 80D, and more. It also helps in maintaining accurate financial records, which are crucial for audits and future financial planning. Additionally, timely tax filing ensures quicker refunds, contributing to better cash flow management.\n\n" +
      "We stand out in the tax filing landscape with our expert-driven and technology-powered solutions. Our team ensures accuracy in calculations, helps identify eligible deductions, and files returns well within deadlines. With a user-friendly platform and 24/7 support, we make tax filing a hassle-free experience. Whether you're an individual, freelancer, or business, we tailor our services to your unique needs. Our commitment to precision, timeliness, and customer satisfaction makes us the best choice for tax filing services.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "Salaried Individuals",
        description:
          "Employees earning regular income need to file tax returns to report their salary, investments, and claim deductions.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Business Owners",
        description:
          "Entrepreneurs and business owners must file returns to declare business income and maintain compliance.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Freelancers and Consultants",
        description:
          "Self-employed professionals need to report their income and pay advance tax as applicable.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Investment Income Earners",
        description:
          "Individuals with significant investment income must declare capital gains and other investment returns.",
      },
    ],
    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Accurate and Error-Free Filing",
        description:
          "Our team ensures that your tax returns are filed with precision, avoiding common errors that could lead to penalties or audits. We leverage advanced technology to cross-verify data for 100% accuracy.",
      },
      {
        img: TaxCard2,
        heading: "Maximized Deductions and Savings",
        description:
          "With our expertise, we help you identify every eligible deduction under the Income Tax Act, ensuring you save the maximum amount on your taxes while staying compliant.",
      },
      {
        img: TaxCard3,
        heading: "Timely Submissions, Zero Stress",
        description:
          "Never worry about missing deadlines again. Our proactive reminders and streamlined processes ensure your returns are submitted on time, saving you from penalties.",
      },
    ],
  },

  femaCompliance: {
    bannerIcon: FemaBannerIcon,
    enum: "FEMA_COMPLIANCE_SERVICE",
    bannerHeading:
      "Master Cross-Border Transactions: FEMA Compliance Made Simple",
    bannerDescription:
      "With in-depth expertise and personalized guidance, we simplify complex FEMA regulations, saving you time, money, and penalties.",
    heading: "FEMA Compliance Services",
    benefitHeading: "Benefits of FEMA Compliance Services",
    benefitDescription:
      "The Foreign Exchange Management Act (FEMA) governs foreign exchange transactions in India, ensuring smooth cross-border financial activities. FEMA compliance includes managing foreign investments, remittances, property transactions, and overseas investments. For businesses and individuals involved in international transactions, FEMA compliance is essential to avoid penalties and ensure seamless operations.\n\n" +
      "FEMA compliance is critical as it promotes orderly development of the foreign exchange market. Non-compliance can lead to penalties and legal complications, hindering international business growth. It ensures all transactions adhere to RBI guidelines, safeguarding your business from potential risks. FEMA compliance also enables smooth foreign investments and remittances, crucial for businesses operating globally.\n\n" +
      "We specialize in FEMA compliance with tailored solutions for individuals and businesses. Our team of experts ensures all your transactions comply with RBI and FEMA guidelines. From advisory services to documentation and reporting, we provide end-to-end support. By simplifying the complexities of FEMA regulations, we help you focus on your core business while staying compliant with international financial laws.",
    cardData: [
      {
        icon: FemaWho1,
        title: "International Businesses",
        description:
          "Companies engaged in cross-border trade need FEMA compliance for smooth operations.",
      },
      {
        icon: FemaWho2,
        title: "Foreign Investors",
        description:
          "Individuals and entities investing in India must comply with FEMA regulations.",
      },
      {
        icon: FemaWho3,
        title: "NRIs with Indian Assets",
        description:
          "Non-resident Indians managing assets in India require FEMA compliance.",
      },
      {
        icon: FemaWho4,
        title: "Startups Seeking Foreign Investment",
        description:
          "New businesses looking for foreign funding must ensure FEMA compliance.",
      },
    ],
    bannerCardData: [
      {
        img: FemaCard1,
        heading: "Seamless Cross-Border Transactions",
        description:
          "We simplify the complexities of FEMA regulations, enabling smooth international financial transactions without any compliance hurdles, whether it’s for investments or remittances.",
      },
      {
        img: FemaCard2,
        heading: "Expert Guidance on FEMA Laws",
        description:
          "Our team has deep expertise in FEMA guidelines, offering tailored advice to ensure your transactions are fully compliant with RBI requirements, avoiding fines and legal issues.",
      },
      {
        img: FemaCard3,
        heading: "End-to-End Compliance Support",
        description:
          "From documentation to approvals and reporting, we provide comprehensive support for all FEMA-related processes, making compliance effortless for you.",
      },
    ],
  },

  gstServices: {
    bannerIcon: GstBannerIcon,
    enum: "GST_FILING",
    bannerHeading:
      "GST Compliance Simplified: From Filing to Refunds, We've Got You Covered",
    bannerDescription:
      "Trust our streamlined processes and expert support to handle GST registration, filings, and audits effortlessly—saving you time and ensuring accuracy.",
    heading: "GST Compliance Services",
    benefitHeading: "Benefits of GST Compliance Services",
    benefitDescription:
      "Goods and Services Tax (GST) is an indirect tax applied to the supply of goods and services in India. GST compliance includes registering for GST, filing monthly and annual returns, and maintaining proper records. It is a unified tax that has replaced multiple indirect taxes, streamlining the tax structure and reducing the cascading effect of taxes.\n\n" +
      "GST compliance is essential for businesses to operate legally and maintain smooth supply chain operations. Non-compliance can lead to penalties, disrupted operations, and loss of reputation. Timely GST filings ensure businesses can claim input tax credits, reducing their overall tax liability. It also enables businesses to stay competitive by maintaining transparent and compliant operations.\n\n" +
      "We excel in providing GST compliance services with a focus on accuracy and efficiency. From GST registration to return filing and refunds, we offer end-to-end solutions. Our platform ensures easy access to data, real-time tracking, and timely reminders for filing deadlines. With our expertise in GST laws and procedures, we help businesses maintain compliance effortlessly, saving time and avoiding penalties.",
    cardData: [
      {
        icon: GstWho1,
        title: "Businesses Crossing GST Thresholds",
        description:
          "Entities with turnover exceeding ₹20 lakhs (₹10 lakhs for special category states) must register for GST and file returns regularly.",
      },
      {
        icon: GstWho2,
        title: "Startups and SMEs",
        description:
          "Small businesses and startups selling goods or services need GST registration and compliance to operate legally and claim input tax credits.",
      },
      {
        icon: GstWho3,
        title: "Exporters and Importers",
        description:
          "Companies involved in the export or import of goods and services require GST compliance to benefit from tax exemptions and refunds.",
      },
      {
        icon: GstWho4,
        title: "E-Commerce Businesses",
        description:
          "Online sellers and marketplace operators must comply with GST regulations, including tax collection at source (TCS) and filing GST returns.",
      },
    ],

    bannerCardData: [
      {
        img: GstCard1,
        heading: "Hassle-Free GST Filings",
        description:
          "We take the stress out of GST compliance with easy-to-use tools and expert assistance, ensuring timely and accurate filing of monthly, quarterly, and annual returns.",
      },
      {
        img: GstCard2,
        heading: "Maximized Input Tax Credits",
        description:
          "Our in-depth analysis helps you claim all eligible input tax credits, reducing your overall tax liability and boosting your business’s profitability.",
      },
      {
        img: GstCard3,
        heading: "Real-Time Compliance Tracking",
        description:
          "Our technology-driven platform offers real-time tracking and reminders, ensuring you never miss a GST filing deadline and remain compliant at all times.",
      },
    ],
  },

  rocServices: {
    bannerIcon: RocBannerIcon,
    enum: "ROC_SERVICE",
    bannerHeading: "Stay Ahead with Seamless ROC Filing Compliance for Your Business",
    bannerDescription:
      "From registrations to annual filings, we provide end-to-end ROC Filing services tailored to keep your business legally compliant and thriving.",
    heading: "ROC Filing Services",
    benefitHeading: "Benefits of ROC Filing Services",
    benefitDescription:
      "The Registrar of Companies (ROC Filing) is a regulatory authority overseeing company incorporation, compliance, and annual filings in India. ROC Filing compliance involves maintaining updated records of your company's structure, financial performance, and operational details. Key services include company registration, filing annual returns, and updating changes in company details such as directors, address, or shareholding.\n\n" +
      "ROC Filing compliance is vital for maintaining a company's legal standing and credibility. Non-compliance can result in penalties, disqualification of directors, and even the company's dissolution. Filing timely and accurate returns ensures transparency, attracts investors, and avoids legal hurdles. For startups and established businesses alike, ROC Filing compliance builds trust with stakeholders and fosters growth.\n\n" +
      "Our ROC Filing services are designed to simplify your compliance journey. From company incorporation to annual filings, we provide comprehensive support tailored to your business needs. Our team ensures timely and error-free submissions, helping you avoid penalties. With deep knowledge of company law and regulatory requirements, we ensure your business stays compliant and operates seamlessly.",
    cardData: [
      {
        icon: RocWho1,
        title: "New Business Incorporation",
        description:
          "Entrepreneurs and startups need ROC Filing services to legally register their business entities with the Ministry of Corporate Affairs.",
      },
      {
        icon: RocWho2,
        title: "Annual Filing Requirements",
        description:
          "All registered companies and LLPs must file annual returns and financial statements with the ROC Filing to remain compliant.",
      },
      {
        icon: RocWho3,
        title: "Changes in Company Details",
        description:
          "Businesses making changes like adding directors, changing addresses, or altering shareholding structures must notify the ROC Filing.",
      },
      {
        icon: RocWho4,
        title: "Merger, Acquisition, Closure of Companies",
        description:
          "Organizations undergoing mergers, acquisitions, or closures require ROC filings to meet legal obligations.",
      },
    ],
    bannerCardData: [
      {
        img: RocCard1,
        heading: "Comprehensive Compliance Management",
        description:
          "We handle everything from company incorporation to annual filings, ensuring your business complies with ROC Filing regulations seamlessly and accurately.",
      },
      {
        img: RocCard2,
        heading: "Avoid Penalties and Legal Issues",
        description:
          "Our timely and error-free submissions help you avoid hefty penalties, director disqualifications, or disruptions to your company’s operations.",
      },
      {
        img: RocCard3,
        heading: "Expert Support for Complex Processes",
        description:
          "Whether it’s updating company details, registering a new entity, or handling mergers, our team of ROC Filing experts simplifies even the most complex processes for you.",
      },
    ],
  },

  businessSetup: {
    bannerIcon: SetupBanner,
    enum: "BUSINESS_SETUP",
    bannerHeading:
      "Launch Your Business with Ease: Your Trusted Partner in Incorporation and Registrations",
    bannerDescription:
      "From company incorporation to GST registration, our expert-driven solutions ensure a seamless setup process tailored to your goals.",
    heading: "Business Setup Services",
    benefitHeading: "Benefits of Business Setup Services",
    benefitDescription: `Starting a business is an exciting journey, but it also comes with numerous legal, compliance, and operational challenges. From choosing the right business structure to completing mandatory registrations, every step is critical to establishing a solid foundation for long-term success. Our business setup services are designed to simplify this process, ensuring that you can focus on your vision while we handle the complexities.

We provide comprehensive solutions, including company incorporation for Private Limited, Public Limited, and Limited Liability Partnerships (LLP). Our team ensures seamless registration under government initiatives like Start-Up India, enabling you to access valuable benefits. We specialize in statutory registrations, such as GST, PF, and ESIC, ensuring your business remains compliant from day one. Additionally, we assist in acquiring critical certifications like Import Export Code (IEC) and MSME Udyam Registration, unlocking new opportunities for growth. For businesses with global ambitions, we provide end-to-end support in setting up project offices, liaison offices, and branch offices, as well as structuring entities in GIFT City, India’s financial hub. Our expertise in navigating complex compliance frameworks ensures that your setup process is smooth and hassle-free.

By partnering with us, you gain access to industry expertise, cutting-edge tools, and a dedicated support team that prioritizes accuracy, efficiency, and cost-effectiveness. Whether you are a startup, SME, or multinational corporation, we tailor our services to meet your unique requirements, ensuring a seamless and stress-free experience. From legal documentation to regulatory filings, we manage every aspect of your business setup journey. With our reliable support, you can confidently launch your business, stay compliant, and achieve your goals faster. Let us help you transform your entrepreneurial dreams into reality.
`,
    cardData: [
      {
        icon: SetupWho1,
        title: "Entrepreneurs and Startups",
        description:
          "Individuals looking to start their own business need support with company incorporation, legal registrations, and compliance setup.",
      },
      {
        icon: SetupWho2,
        title: "Businesses Expanding to New Markets",
        description:
          "Companies entering new regions, whether domestically or internationally, require guidance in setting up branch, liaison, or project offices.",
      },
      {
        icon: SetupWho3,
        title: "Small and Medium Enterprises (SMEs)",
        description:
          "SMEs seeking formal registration, such as GST, MSME Udyam, PF, and ESIC, to unlock growth opportunities and government benefits.",
      },
      {
        icon: SetupWho4,
        title: "Importers and Exporters",
        description:
          "Businesses involved in international trade need Import Export Code (IEC) registration to comply with trade regulations.",
      },
      {
        icon: SetupWho5,
        title: "Global Companies Setting Up in India",
        description:
          "Multinational corporations planning to establish a presence in India require expert assistance with compliance, including GIFT City structuring.",
      },
      {
        icon: SetupWho6,
        title: "Businesses Seeking Government Incentives",
        description:
          "Startups and SMEs interested in schemes like Start-Up India or MSME benefits need professional help with timely and accurate registrations.",
      },
    ],    
    bannerCardData: [
      {
        img: SetupCard1,
        heading: "Comprehensive Support Across All Registrations",
        description:
          "From company incorporation to GST and MSME registration, we provide end-to-end services for a seamless business setup experience.",
      },
      {
        img: SetupCard2,
        heading: "Tailored Solutions for Every Business Type",
        description:
          "Whether you are a startup, SME, or multinational, our services are customized to meet the unique requirements of your business structure and industry.",
      },
      {
        img: SetupCard3,
        heading: "Expert Guidance for Regulatory Compliance",
        description:
          "Our team ensures that all legal and statutory obligations are met, avoiding costly penalties and ensuring peace of mind.",
      },
      {
        img: SetupCard4,
        heading: "Time-Saving and Cost-Effective Processes",
        description:
          "By leveraging our expertise and efficient workflows, we save you valuable time and resources during the business setup process.",
      },
      {
        img: SetupCard5,
        heading: "Global Expansion Support",
        description:
          "Specialized assistance for setting up project offices, liaison offices, and branch offices, including structuring entities in GIFT City",
      },
      {
        img: SetupCard6,
        heading: "Access to Government Incentives",
        description:
          "Smooth registration under initiatives like Start-Up India and MSME Udyam to unlock benefits and opportunities for growth.",
      },
    ],
  },

  businessConsultancy: {
    bannerIcon: ConsBanner,
    enum: "BUSINESS_CONSULTING_SERVICES",
    bannerHeading:
      "Drive Growth with Expert Business Consultancy: Strategies for Success",
    bannerDescription:
      "From professional consultations to Virtual CFO services, our tailored solutions empower your business to thrive.",
    heading: "Business Consultancy Services",
    benefitHeading: "Benefits of Business Consultancy Services",
    benefitDescription: `Running a business in today’s competitive environment requires more than just a great product or service. It demands strategic planning, financial management, operational efficiency, and a proactive approach to compliance. Our business consultancy services are designed to provide the insights, tools, and support you need to tackle these challenges and unlock your organization’s true potential.

We offer a wide range of services, starting with professional consultations available online for your convenience. Whether you need advice on regulatory compliance, organizational structuring, or market entry strategies, our experts are here to guide you. We also provide robust accounting and bookkeeping services to maintain accurate financial records and ensure smooth audits.

For businesses seeking financial leadership, our Virtual CFO services offer on-demand expertise to manage budgets, optimize cash flows, and ensure compliance. Our team also specializes in structuring project, liaison, and branch offices for local and international expansion, as well as setting up entities in GIFT City, India’s financial hub. Our consultancy doesn’t just focus on compliance—it’s also about driving growth. We help you identify opportunities, implement efficient processes, and adapt to changing market conditions. Our approach combines industry knowledge, data-driven insights, and personalized strategies to deliver measurable results.

With a commitment to precision, reliability, and excellence, we empower businesses to navigate complexities confidently and achieve sustainable growth. Whether you’re a startup looking to establish yourself or an established enterprise aiming to scale, our consultancy services are tailored to meet your needs. Partner with us to unlock smarter, faster, and more effective solutions for your business.
`,
    cardData: [
      {
        icon: ConsWho1,
        title: "Startups Needing Strategic Guidance",
        description:
          "New businesses requiring advice on market entry, structuring, and regulatory compliance.",
      },
      {
        icon: ConsWho2,
        title: "Firms Seeking Compliance and Regulatory Support",
        description:
          "Organizations that need to navigate complex legal requirements for smooth operations and avoid penalties.",
      },
      {
        icon: ConsWho3,
        title: "Companies Planning Global Expansion",
        description:
          "Businesses expanding internationally or into special economic zones like GIFT City need expert consultancy on structuring and compliance.",
      },
      {
        icon: ConsWho4,
        title: "Time-Constrained Entrepreneurs",
        description:
          "Business owners needing expert support to manage critical aspects like bookkeeping, professional consultation, and compliance while focusing on growth.",
      },
      {
        icon: ConsWho5,
        title: "Established Businesses Facing Operational Challenges",
        description:
          "Organizations looking to streamline operations, improve accounting practices, or ensure financial stability through Virtual CFO services.",
      },
      {
        icon: ConsWho6,
        title: "Businesses Undergoing Restructuring or Mergers",
        description:
          "Companies in the midst of acquisitions, mergers, or organizational changes requiring legal and financial guidance.",
      },
    ],
    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Strategic Insights for Informed Decisions",
        description:
          "Receive expert advice on business structuring, market entry strategies, and growth plans tailored to your goals.",
      },
      {
        img: ConsCard2,
        heading: "Proactive Compliance Management",
        description:
          "Stay ahead of regulatory requirements with our end-to-end support, ensuring smooth operations and legal adherence.",
      },
      {
        img: ConsCard3,
        heading: "Enhanced Financial Oversight",
        description:
          "Leverage Virtual CFO services for professional financial management, including budgeting, cash flow optimization, and audits.",
      },
      {
        img: ConsCard4,
        heading: "Streamlined Operations",
        description:
          "Efficient accounting and bookkeeping services help maintain accurate records and enable operational clarity.",
      },
      {
        img: ConsCard5,
        heading: "Expansion-Focused Solutions",
        description:
          "Expertise in setting up local and international offices, including assistance for businesses entering GIFT City.",
      },
      {
        img: ConsCard6,
        heading: "Convenience with Online Consultations",
        description:
          "Professional advice is just a click away, ensuring timely support no matter where you are.",
      },
    ],
  },
};

export const UaeServices = {
  // UAE Services
  companySetup: {
    bannerIcon: SetupBanner,
    bannerHeading:
      "Seamless Company Setup in UAE – Your Business, Our Expertise",
    bannerDescription:
      "Experience hassle-free business incorporation in Dubai with our expert guidance, tailored solutions, and unmatched support.",
    heading: "Company Setup Services in Dubai",
    benefitHeading: "Benefits of Company Setup Services in Dubai",
    benefitDescription:
      "Dubai is a global business hub, offering unmatched opportunities for entrepreneurs and established businesses alike. We simplify the process of setting up your business in Dubai, ensuring a smooth and efficient journey. Whether you're looking to start in a Free Zone, Mainland, or as a Foundation, we handle everything—from legal compliance to operational support.",
    cardData: [
      {
        icon: SetupWho1,
        title: "Entrepreneurs and Startups",
        description:
          "Seeking a business-friendly ecosystem with full ownership opportunities.",
      },
      {
        icon: SetupWho2,
        title: "SMEs",
        description:
          "Looking to expand operations in a tax-free jurisdiction with global reach.",
      },
      {
        icon: SetupWho3,
        title: "Multinational Corporations",
        description:
          "Establishing regional headquarters in the UAE's dynamic market.",
      },
      {
        icon: SetupWho4,
        title: "International Investors",
        description:
          "Exploring investment opportunities in Dubai's thriving economy.",
      },
    ],
    bannerCardData: [
      {
        img: SetupCard1,
        heading: "100% Foreign Ownership",
        description:
          "Set up your business with full ownership in Dubai Free Zones, eliminating the need for a local sponsor.",
      },
      {
        img: SetupCard2,
        heading: "Tax Advantages",
        description:
          "Enjoy zero corporate tax, no personal income tax, and access to double taxation treaties.",
      },
      {
        img: SetupCard3,
        heading: "Strategic Location",
        description:
          "Access global markets through Dubai's strategic position as a gateway to Middle East, Africa, Europe, and Asia.",
      },
    ],
  },

  taxFiling: {
    bannerIcon: TaxBannerIcon,
    bannerHeading:
      "Expert Tax Filing Services in Dubai – Simplifying Compliance for Your Business",
    bannerDescription:
      "Accurate, timely, and hassle-free tax filing solutions to keep your business compliant and focused on growth.",
    heading: "Tax Filing Services in Dubai",
    benefitHeading: "Benefits of Tax Filing Services in Dubai",
    benefitDescription:
      "Tax compliance in Dubai is a critical component of running a successful business. We provide comprehensive tax filing services to help businesses navigate the complexities of Dubai's tax system effortlessly.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "Startups",
        description:
          "New businesses requiring complete tax compliance setup and guidance.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "SMEs",
        description:
          "Growing businesses needing efficient tax management solutions.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Large Corporations",
        description:
          "Established companies seeking comprehensive tax compliance support.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "International Businesses",
        description:
          "Foreign companies requiring UAE tax compliance expertise.",
      },
    ],
    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Accurate Filing",
        description:
          "Ensuring compliance with all FTA regulations and timely submissions.",
      },
      {
        img: TaxCard2,
        heading: "Tax Optimization",
        description:
          "Strategic planning to minimize liabilities and maximize efficiency.",
      },
      {
        img: TaxCard3,
        heading: "Expert Guidance",
        description:
          "Access to experienced tax consultants for strategic advice.",
      },
    ],
  },

  accountingManagement: {
    bannerIcon: ConsBanner,
    bannerHeading: "Streamlined Accounting & Management Services in UAE",
    bannerDescription:
      "Comprehensive financial and administrative solutions to help your business thrive in the UAE.",
    heading: "Accounting & Management Services",
    benefitHeading: "Benefits of Accounting & Management Services",
    benefitDescription:
      "Running a business in the UAE requires accurate financial management and efficient administrative processes. We provide comprehensive support at every stage of your business journey.",
    cardData: [
      {
        icon: ConsWho1,
        title: "Startups",
        description:
          "New businesses needing strong financial and administrative foundations.",
      },
      {
        icon: ConsWho2,
        title: "Growing SMEs",
        description:
          "Companies looking to streamline processes and scale efficiently.",
      },
      {
        icon: ConsWho3,
        title: "Established Businesses",
        description:
          "Organizations seeking growth through mergers, fundraising, or restructuring.",
      },
      {
        icon: ConsWho4,
        title: "International Companies",
        description:
          "Foreign businesses requiring local accounting and management expertise.",
      },
    ],
    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Accurate Financial Management",
        description: "Maintain precise records and ensure audit readiness.",
      },
      {
        img: ConsCard2,
        heading: "Virtual CFO Services",
        description:
          "Expert financial guidance without full-time executive costs.",
      },
      {
        img: ConsCard3,
        heading: "Growth Support",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
    ],
  },
};

export const SaudiServices = {
  companySetup: {
    bannerIcon: SetupBanner,
    bannerHeading:
      "Seamless Company Setup in Saudi Arabia – Your Business, Our Expertise",
    bannerDescription:
      "Experience hassle-free business incorporation in Saudi Arabia with our expert guidance, tailored solutions, and unmatched support.",
    heading: "Company Setup Services in Saudi Arabia",
    benefitHeading: "Benefits of Company Setup Services in Saudi Arabia",
    benefitDescription:
      "Saudi Arabia is a global business hub, offering unmatched opportunities for entrepreneurs and established businesses alike. We simplify the process of setting up your business in Saudi Arabia, ensuring a smooth and efficient journey. Whether you're looking to start in a Free Zone, Mainland, or as a Foundation, we handle everything—from legal compliance to operational support.",
    cardData: [
      {
        icon: SetupWho1,
        title: "Free Zone Setup",
        description:
          "100% foreign ownership with tax benefits and simplified processes.",
      },
      {
        icon: SetupWho2,
        title: "Mainland Setup",
        description:
          "Full market access with the ability to conduct business across Saudi Arabia.",
      },
      {
        icon: SetupWho3,
        title: "Offshore Setup",
        description:
          "International business operations with enhanced privacy and tax benefits.",
      },
      {
        icon: SetupWho4,
        title: "Branch Setup",
        description:
          "Extend your existing business operations into Saudi Arabia's dynamic market.",
      },
    ],
    bannerCardData: [
      {
        img: SetupCard1,
        heading: "Complete Ownership Control",
        description:
          "Establish your business with 100% foreign ownership in Saudi Arabia's strategic free zones.",
      },
      {
        img: SetupCard2,
        heading: "Tax Benefits",
        description:
          "Take advantage of Saudi Arabia's tax-friendly environment and double taxation agreements.",
      },
      {
        img: SetupCard3,
        heading: "Full Support Package",
        description:
          "From licensing to visa processing, bank account opening, and office setup.",
      },
    ],
  },

  taxFiling: {
    bannerIcon: TaxBannerIcon,
    bannerHeading:
      "Expert Tax Filing Services in Saudi Arabia – Simplifying Compliance for Your Business",
    bannerDescription:
      "Accurate, timely, and hassle-free tax filing solutions to keep your business compliant and focused on growth.",
    heading: "Tax Filing Services in Saudi Arabia",
    benefitHeading: "Benefits of Tax Filing Services in Saudi Arabia",
    benefitDescription:
      "Tax compliance in Saudi Arabia requires expert handling of VAT, corporate tax, and excise duties. Our comprehensive services ensure your business stays compliant while maximizing available benefits.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "VAT Services",
        description:
          "Complete VAT registration, filing, and compliance management.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Corporate Tax",
        description:
          "Strategic planning and compliance with Saudi Arabia's corporate tax framework.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Tax Advisory",
        description:
          "Expert guidance on tax optimization and regulatory compliance.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "International Tax",
        description:
          "Managing cross-border tax implications and treaty benefits.",
      },
    ],
    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Comprehensive Tax Solutions",
        description:
          "End-to-end tax services covering VAT, corporate tax, and international tax matters.",
      },
      {
        img: TaxCard2,
        heading: "Risk Management",
        description:
          "Proactive compliance monitoring and risk mitigation strategies.",
      },
      {
        img: TaxCard3,
        heading: "Expert Support",
        description:
          "Dedicated tax professionals with deep knowledge of Saudi Arabia's tax landscape.",
      },
    ],
  },

  accountingManagement: {
    bannerIcon: ConsBanner,
    bannerHeading: "Streamlined Accounting & Management Services in Saudi Arabia",
    bannerDescription:
      "Comprehensive financial and administrative solutions to help your business thrive in Saudi Arabia.",
    heading: "Accounting & Management Services",
    benefitHeading: "Benefits of Accounting & Management Services",
    benefitDescription:
      "Our accounting and management services in Saudi Arabia provide comprehensive financial support, from daily bookkeeping to strategic planning and growth initiatives.",
    cardData: [
      {
        icon: ConsWho1,
        title: "Bookkeeping Services",
        description: "Accurate financial recording and management systems.",
      },
      {
        icon: ConsWho2,
        title: "Virtual CFO Services",
        description:
          "Strategic financial guidance without full-time executive costs.",
      },
      {
        icon: ConsWho3,
        title: "Business Advisory",
        description:
          "Expert consultation for growth and optimization strategies.",
      },
      {
        icon: ConsWho4,
        title: "Audit & Assurance",
        description:
          "Comprehensive audit support and financial assurance services.",
      },
    ],
    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Financial Excellence",
        description:
          "Maintain accurate records and ensure full compliance with UAE regulations.",
      },
      {
        img: ConsCard2,
        heading: "Growth Support",
        description:
          "Strategic planning and execution for business expansion and optimization.",
      },
      {
        img: ConsCard3,
        heading: "Business Intelligence",
        description:
          "Data-driven insights for informed decision-making and performance monitoring.",
      },
    ],
  },
};

export const OmanServices = {
  companySetup: {
    bannerIcon: SetupBanner,
    bannerHeading:
      "Effortless Company Setup in Oman – Unlock and Explore Different Business Opportunities",
    bannerDescription:
      "Expert assistance for establishing your business with Oman’s business licensing authorities which mainly belong to Oman Mainland, Salalah Free Zone, or Sohar Free Zone",
    heading: "Company Setup Services in Oman",
    benefitHeading: "Benefits of Company Setup Services in Oman",
    benefitDescription:
      "Oman is a growing economic hub in the Middle East, offering businesses immense opportunities for expansion and growth. At EZYFILING.COM, we specialize in providing seamless Company Setup Services across the business regions of “Sultanate of Oman” i.e., Oman Mainland, Salalah Free Zone, and Sohar Free Zone. Whether you're an entrepreneur, SME, or multinational corporation, we tailor our services to meet your business needs and objectives.\n\n" +
      "Oman Mainland offers businesses unrestricted access to the local market, allowing you to operate freely and connect with a wide consumer base. Salalah Free Zone provides tax benefits, 100% foreign ownership, and a strategic location for logistics and manufacturing. Sohar Free Zone, a prime industrial and trade hub, offers unparalleled infrastructure and connectivity.\n\n" +
      "Our team of experts handles all aspects of company registration, licensing, compliance, and administrative tasks, making the process smooth and stress-free. With our in-depth knowledge of Oman's regulatory framework, we help you make informed decisions and establish a strong foundation for your business.",
    cardData: [
      {
        icon: SetupWho1,
        title: "Entrepreneurs and Startups",
        description:
          "Entrepreneurs and startups exploring opportunities in Oman.",
      },
      {
        icon: SetupWho2,
        title: "SMEs",
        description:
          "SMEs and corporations looking to expand in the Middle East.",
      },
      {
        icon: SetupWho3,
        title: "Targeting",
        description:
          "Businesses targeting logistics, manufacturing, or trade industries.",
      },
      {
        icon: SetupWho4,
        title: "Market Entry",
        description:
          "When planning to enter Oman's market or expand regional operations.",
      },
      {
        icon: SetupWho1,
        title: "Free Zone Benefits",
        description: "When seeking tax and operational benefits in Free Zones.",
      },
      {
        icon: SetupWho2,
        title: "GCC Market Strategy",
        description:
          "During strategic business planning for accessing the GCC market.",
      },
    ],
    bannerCardData: [
      {
        img: SetupCard1,
        heading: "Hassle-Free Setup",
        description:
          "Streamlined company registration and licensing processes.",
      },
      {
        img: SetupCard2,
        heading: "Tailored Guidance",
        description: "Expert advice to choose the best zone for your business.",
      },
      {
        img: SetupCard3,
        heading: "Cost Efficiency",
        description:
          "Maximize benefits like tax exemptions and reduced operational costs.",
      },
      {
        img: SetupCard2,
        heading: "Comprehensive Support",
        description: "From documentation to ongoing compliance.",
      },
      {
        img: SetupCard3,
        heading: "Local Expertise",
        description: "Deep understanding of Oman's regulatory environment.",
      },
    ],
  },

  taxFiling: {
    bannerIcon: TaxBannerIcon,
    bannerHeading:
      "Comprehensive Tax Filing Services – Simplifying Compliance, Maximizing Growth and Reducing Stress of being Compliant",
    bannerDescription:
      "Corporate Tax Filing, VAT Filing, and Tax Consulting – Expert solutions tailored for your business needs.",
    heading: "Tax Filing Services in Oman",
    benefitHeading: "Benefits of Tax Filing Services in Oman",
    benefitDescription:
      "Navigating tax compliance can be a daunting task for any business. At EZYFILING.COM, we provide seamless Tax Filing Services to help businesses meet regulatory requirements while optimizing their financial strategies. Our expertise spans Corporate Tax Filing, VAT Filing, and Tax Consulting, ensuring that every aspect of your tax obligations is handled efficiently and accurately.\n\n" +
      "With our Corporate Tax Filing services, we ensure your tax returns comply with all legal requirements, helping you to avoid penalties while maximizing deductions. Our VAT Filing solutions cover everything from registration to filing and recovery, ensuring adherence to local tax regulations. Additionally, our Tax Consulting services provide strategic insights to optimize your tax planning, minimize liabilities, and improve overall financial efficiency.\n\n" +
      "Whether you’re a small business or a multinational corporation, our tailored solutions are designed to save you time, reduce risks, and allow you to focus on growing your business. With our team of experienced professionals, you can rest assured that your tax responsibilities are in safe hands.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "Tax Solutions",
        description:
          "Entrepreneurs, startups, and SMEs looking to establish robust tax processes.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Corporate Compliance",
        description:
          "Corporations managing complex tax structures or seeking compliance.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Financial Optimization",
        description:
          "Businesses aiming to optimize financial strategies with tax efficiency.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Tax Filing",
        description: "During annual corporate tax filing deadlines.",
      },
      {
        icon: TaxWhoWeAre1,
        title: "VAT Compliance",
        description: "When VAT submissions or compliance checks are due.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Expansion Planning",
        description:
          "When planning to expand operations or restructure financial systems.",
      },
    ],
    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Accurate Compliance",
        description: "Ensure adherence to all tax regulations.",
      },
      {
        img: TaxCard2,
        heading: "Cost Savings",
        description: "Minimize liabilities and optimize financial performance.",
      },
      {
        img: TaxCard3,
        heading: "Time Efficiency",
        description: "Avoid delays with expert handling of tax processes.",
      },
      {
        img: TaxCard1,
        heading: "Risk Mitigation",
        description: "Reduce the risk of penalties and audits.",
      },
      {
        img: TaxCard2,
        heading: "Strategic Advice",
        description: "Insights to plan and streamline tax obligations.",
      },
    ],
  },

  accountingManagement: {
    bannerIcon: ConsBanner,
    bannerHeading:
      "Expert Accounting & Management Services in Oman – Empower Your Business with Experts Assisted Guidance",
    bannerDescription:
      "Comprehensive solutions for financial management, growth planning, and seamless operations in Oman.",
    heading: "Accounting & Management Services",
    benefitHeading: "Benefits of Accounting & Management Services",
    benefitDescription:
      "Efficient financial management and strategic planning are essential for business success, especially in a dynamic market like Oman. At EZYFILING.COM, we provide end-to-end Accounting & Management Services to help businesses streamline operations, maintain compliance, and achieve growth.\n\n" +
      "Our Accounting & Bookkeeping services ensure your financial records are accurate, transparent, and ready for audits. With Virtual CFO Services, businesses can access expert financial guidance while avoiding the cost of a full-time CFO. For companies seeking expansion, we specialize in M&A and Fundraising, helping secure investments and execute mergers effectively.\n\n" +
      "Our Business Growth Planning & Strategy services are designed to create actionable plans that align with your business goals. Additionally, we provide Visa Services to simplify employee relocation and operational needs, as well as Bank Account Opening Assistance to establish seamless financial operations in Oman.\n\n" +
      "Whether you're a startup or an established company, our customized solutions are tailored to meet your unique business needs, ensuring a smooth and stress-free experience in Oman.",
    cardData: [
      {
        icon: ConsWho1,
        title: "Startups",
        description:
          "Entrepreneurs and startups establishing their presence in Oman.",
      },
      {
        icon: ConsWho2,
        title: "Growing SMEs",
        description:
          "SMEs looking to streamline financial and operational management.",
      },
      {
        icon: ConsWho3,
        title: "Established Businesses",
        description: "Large corporations expanding or restructuring in Oman.",
      },
      {
        icon: ConsWho4,
        title: "International Companies",
        description:
          "During initial business setup to establish robust financial systems.",
      },
      {
        icon: ConsWho1,
        title: "International Companies",
        description: "When planning for growth, fundraising, or mergers.",
      },
      {
        icon: ConsWho3,
        title: "International Companies",
        description:
          "When seeking compliance with Oman's regulations for smooth operations.",
      },
    ],
    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Accurate Financial Management",
        description: "Stay compliant and audit-ready.",
      },
      {
        img: ConsCard2,
        heading: "Strategic Expertise",
        description:
          " Guidance on fundraising, mergers, and business expansion.",
      },
      {
        img: ConsCard3,
        heading: "Cost-Effective Solutions",
        description: "Access professional services without full-time hiring.",
      },
      {
        img: ConsCard1,
        heading: "Seamless Operations",
        description: " Visa and banking services for smooth functionality.",
      },
      {
        img: ConsCard2,
        heading: "Tailored Support",
        description:
          "Solutions designed to fit your specific business requirements.",
      },
    ],
  },
};

export const QatarServices = {
  companySetup: {
    bannerIcon: SetupBanner,
    bannerHeading:
      "Seamless Company Setup Services in Qatar – Unlock Business Potential.",
    bannerDescription:
      "Expert solutions for obtaining business licenses from authorities UAH Umm Al Houl, QFC Qatar Financials, Qatar State System, and RBFZ Ras Bufontas.",
    heading: "Company Setup Services in Qatar",
    benefitHeading: "Benefits of Company Setup Services in Qatar",
    benefitDescription:
      "Qatar, with its rapidly growing economy and business-friendly environment, is an ideal destination for entrepreneurs and global corporations. At EZYFILING.COM, we provide comprehensive Company Setup Services to help you establish your business in Qatar. Whether you’re exploring opportunities to do business with legal authorities of UAH Umm Al Houl, QFC Qatar Financials, Qatar State System, or RBFZ Ras Bufontas, our expertise ensures a smooth and hassle-free setup.\n\n" +
      "UAH Umm Al Houl and RBFZ Ras Bufontas are prime Free Zones offering 100% foreign ownership, tax benefits, and access to world-class infrastructure. QFC Qatar Financials specializes in financial and legal entities, providing a robust regulatory framework. The Qatar State System allows businesses to access the local market with unlimited trade opportunities.\n\n" +
      "From selecting the right jurisdiction to handling legal compliance, licensing, and operational setup, our team ensures you make informed decisions and meet all requirements efficiently. Our tailored services are designed to save you time, reduce complexity, and position your business for success in Qatar.",
    cardData: [
      {
        icon: SetupWho1,
        title: "Market Entry",
        description: "Entrepreneurs and startups entering Qatar’s market.",
      },
      {
        icon: SetupWho2,
        title: "Regional Expansion",
        description:
          "SMEs and multinational corporations seeking regional expansion.",
      },
      {
        icon: SetupWho3,
        title: "Sector Focus",
        description:
          "Businesses targeting financial, trade, logistics, and industrial sectors.",
      },
      {
        icon: SetupWho4,
        title: "Expansion",
        description: "During market entry or expansion planning in Qatar.",
      },
      {
        icon: SetupWho4,
        title: "Free Zone Benefits",
        description:
          "When seeking to leverage the benefits of Free Zones like UAH Umm Al Houl and RBFZ Ras Bufontas.",
      },
      {
        icon: SetupWho1,
        title: "QFC Establishment",
        description:
          "When establishing financial or legal entities through QFC Qatar Financials.",
      },
    ],

    bannerCardData: [
      {
        img: SetupCard1,
        heading: "End-to-End Support",
        description: "From documentation to compliance and operational setup.",
      },
      {
        img: SetupCard2,
        heading: "Customized Solutions",
        description: "Guidance tailored to your business needs and goals.",
      },
      {
        img: SetupCard3,
        heading: "Access to Incentives",
        description:
          "Unlock tax exemptions, foreign ownership, and government benefits.",
      },
      {
        img: SetupCard1,
        heading: "Time Efficiency",
        description: "Streamlined processes to minimize delays.",
      },
      {
        img: SetupCard2,
        heading: "Local Expertise",
        description:
          "Deep knowledge of Qatar’s business environment and regulatory framework.",
      },
    ],
  },

  taxFiling: {
    bannerIcon: TaxBannerIcon,
    bannerHeading:
      "Expert Tax Filing Services in Qatar – Simplifying Compliance, Maximizing Efficiency",
    bannerDescription:
      "Corporate Tax Filing, VAT Filing, and Tax Consulting Services Tailored to Succeed in Qatar's Business Environment.",
    heading: "Tax Filing Services in Qatar",
    benefitHeading: "Benefits of Tax Filing Services in Qatar",
    benefitDescription:
      "Navigating Qatar's tax regulations can be complex, but with the right guidance, your business can thrive while staying compliant. At EZYFILING.COM, we provide end-to-end Tax Filing Services in Qatar, covering Corporate Tax Filing, VAT Filing, and Tax Consulting. Our expertise ensures that all the tax compliances help you to stay efficient, accurate, and stress-free.\n\n" +
      "Our Corporate Tax Filing services help businesses comply with Qatar’s corporate tax regulations while identifying opportunities to minimize liabilities and avoid penalties. For businesses subject to VAT, we manage everything from VAT registration and filing to recovery and compliance, ensuring adherence to Qatar’s VAT framework. Our Tax Consulting services provide strategic advice to optimize your tax planning, structure finances, and reduce risks, aligning with Qatar’s legal and regulatory standards.\n\n" +
      "Whether you're a startup, SME, or multinational corporation, our team of experts ensures you meet all tax obligations while focusing on your core business goals. With our support, you can navigate Qatar’s evolving tax landscape with confidence.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "New Ventures",
        description: "Startups and SMEs establishing operations in Qatar.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Corporate Tax",
        description: "Large corporations managing complex tax structures.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Tax Compliance",
        description:
          "Businesses seeking compliance or optimization of tax processes.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Tax Filing",
        description:
          "During annual corporate tax filings or VAT reporting deadlines.",
      },
      {
        icon: TaxWhoWeAre1,
        title: "Expansion Planning",
        description:
          "When planning financial restructuring or expansion in Qatar.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Risk Management",
        description:
          "When seeking advice on tax audits, compliance, or risk mitigation.",
      },
    ],

    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Accurate Compliance",
        description: "Ensure adherence to Qatar’s tax laws and regulations.",
      },
      {
        img: TaxCard2,
        heading: "Cost Savings",
        description: "Minimize liabilities with strategic tax planning.",
      },
      {
        img: TaxCard3,
        heading: "Time Efficiency",
        description: "Avoid delays with expert handling of tax processes.",
      },
      {
        img: TaxCard1,
        heading: "Risk Mitigation",
        description: "Reduce the risk of penalties or audits.",
      },
      {
        img: TaxCard2,
        heading: "Tailored Solutions",
        description: "Customized tax strategies for businesses of all sizes.",
      },
    ],
  },

  accountingManagement: {
    bannerIcon: ConsBanner,
    bannerHeading:
      "Expert Accounting & Management Services in Qatar – Empower Your Business with Ease",
    bannerDescription:
      "Comprehensive financial and operational solutions tailored to Qatar’s unique business environment.",
    heading: "Accounting & Management Services",
    benefitHeading: "Benefits of Accounting & Management Services",
    benefitDescription:
      "Managing your business's finances and operations efficiently is crucial to success in Qatar’s rapidly growing economy. At EZYFILING.COM, we offer a full range of Accounting & Management Services designed to simplify your operations and accelerate your growth. Our expertise spans Accounting & Bookkeeping, Virtual CFO Services, M&A and Fundraising, Business Growth Planning & Strategy, Visa Services, and Bank Account Opening Assistance.\n\n" +
      "Our Accounting & Bookkeeping services ensure accurate and compliant financial records, while our Virtual CFO Services offer expert financial guidance with avoiding the need for a full-time CFO. If you’re considering growth or investment opportunities, we provide tailored solutions for M&A and Fundraising and help create actionable strategies with our Business Growth Planning services.\n\n" +
      "To support smooth operations, we simplify Visa Services for employees and business owners and provide seamless Bank Account Opening Assistance, ensuring your financial operations are set up efficiently.\n\n" +
      "Whether you're a startup, SME, or multinational corporation, we deliver customized solutions to meet your unique needs, allowing you to focus on growing your business in Qatar.",
    cardData: [
      {
        icon: ConsWho1,
        title: "New Ventures",
        description:
          "Entrepreneurs and startups launching operations in Qatar.",
      },
      {
        icon: ConsWho2,
        title: "Growing SMEs",
        description:
          "SMEs seeking efficient financial and operational management.",
      },
      {
        icon: ConsWho3,
        title: "Business Expansion",
        description:
          "Established corporations planning mergers, acquisitions, or expansion.",
      },
      {
        icon: ConsWho4,
        title: "Financial Systems",
        description:
          "During business setup to establish robust financial systems.",
      },
      {
        icon: ConsWho4,
        title: "Growth Strategies",
        description:
          "When seeking growth, funding, or operational efficiency in Qatar.",
      },
      {
        icon: ConsWho4,
        title: "Operational Support",
        description:
          "When managing visa requirements or banking needs for employees and operations.",
      },
    ],

    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Accurate Financial Management",
        description: "Stay compliant and audit-ready.",
      },
      {
        img: ConsCard2,
        heading: "Cost-Effective Expertise",
        description: "Save on hiring costs with outsourced services.",
      },
      {
        img: ConsCard3,
        heading: "Growth Support",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
      {
        img: ConsCard3,
        heading: "Growth Support",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
      {
        img: ConsCard3,
        heading: "Growth Support",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
    ],
  },
};

export const KuwaitServices = {
  companySetup: {
    bannerIcon: SetupBanner,
    bannerHeading:
      "Effortless Company Setup in Kuwait – Your Gateway to Success in Kuwait’s Financial Landscape",
    bannerDescription:
      "Expert guidance for setting up your business through the Ministry of Commerce and Industry under the Government of Kuwait.",
    heading: "Company Setup Services in kuwait",
    benefitHeading: "Benefits of Company Setup Services in kuwait",
    benefitDescription:
      "Setting up a company in Kuwait offers businesses access to a rapidly growing market and a strategic location in the Middle East. At EZYFILING.COM, we specialize in providing seamless Company Setup Services through the Ministry of Commerce and Industry (MOCI), ensuring your business is established efficiently and in compliance with local regulations.\n\n" +
      "Our services include handling all the necessary documentation, approvals, and licensing required to register your company in Kuwait. We simplify the complexities of the process, ensuring you meet all legal requirements while saving you time and effort. Whether you’re a startup, SME, or multinational corporation, our team of experts provides customized solutions tailored to your specific business goals.\n\n" +
      "With a deep understanding of Kuwait’s regulatory framework and economic environment, we help you make informed decisions and establish a strong foundation for your business. Partner with us to experience a hassle-free company setup journey in Kuwait.",
    cardData: [
      {
        icon: SetupWho1,
        title: "Market Entry",
        description: "Entrepreneurs and startups entering Kuwait’s market.",
      },
      {
        icon: SetupWho2,
        title: "Regional Expansion",
        description:
          "SMEs and corporations looking to expand in the Middle East.",
      },
      {
        icon: SetupWho3,
        title: "Legal Guidance",
        description:
          "Businesses require guidance to navigate Kuwait’s legal and regulatory processes.",
      },
      {
        icon: SetupWho4,
        title: "Expansion Planning",
        description: "During market entry or expansion planning in Kuwait.",
      },
      {
        icon: SetupWho1,
        title: "Compliance Approvals",
        description:
          "When seeking compliance and approvals from the Ministry of Commerce and Industry.",
      },
      {
        icon: SetupWho3,
        title: "Operational Base",
        description:
          "When planning to establish a strong operational base in Kuwait.",
      },
    ],

    bannerCardData: [
      {
        img: SetupCard1,
        heading: "End-to-End Support",
        description: "From documentation to approvals and compliance.",
      },
      {
        img: SetupCard2,
        heading: "Customized Solutions",
        description: "Tailored guidance based on your business needs.",
      },
      {
        img: SetupCard3,
        heading: "Time-Saving Processes",
        description: "Streamlined registration and licensing.",
      },
      {
        img: SetupCard1,
        heading: "Local Expertise",
        description: "In-depth knowledge of Kuwait’s business regulations.",
      },
      {
        img: SetupCard2,
        heading: "Compliance Assurance",
        description: "Ensure adherence to all MOCI requirements.",
      },
    ],
  },

  taxFiling: {
    bannerIcon: TaxBannerIcon,
    bannerHeading:
      "Expert Tax Filing Services in Kuwait – Compliance Made Easy at Anytime from Anywhere",
    bannerDescription:
      "Comprehensive solutions for Corporate Tax Filing, VAT Filing, and Tax Consulting in Kuwait.",
    heading: "Tax Filing Services in Kuwait",
    benefitHeading: "Benefits of Tax Filing Services in Kuwait",
    benefitDescription:
      "Navigating Kuwait's tax regulations can be complex, but with the right support, businesses can ensure compliance while optimizing their financial strategies. At EZYFILING.COM, we offer comprehensive Tax Filing Services, including Corporate Tax Filing, VAT Filing, and Tax Consulting, designed to meet the unique needs of businesses in Kuwait.\n\n" +
      "Our Corporate Tax Filing services ensure that your business adheres to Kuwait's tax regulations, reducing liabilities and avoiding penalties. For businesses subject to VAT, our VAT Filing services cover registration, compliance, and refunds, simplifying the entire process. Additionally, our Tax Consulting experts provide strategic insights to help you optimize tax planning, minimize liabilities, and manage risks effectively.\n\n" +
      "Whether you're a startup, SME, or multinational corporation, we handle your tax responsibilities with accuracy and efficiency, allowing you to focus on your core business. With our deep understanding of Kuwait's tax laws, we ensure that your business remains compliant while maximizing its financial potential.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "New Ventures",
        description: "Startups and SMEs establishing operations in Kuwait.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Corporate Tax",
        description: "Large corporations with complex tax structures.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Tax Compliance",
        description:
          "Businesses require compliance or optimization of tax processes.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Tax Filing",
        description: "During annual corporate tax filings or VAT submissions.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Expansion Planning",
        description:
          "When planning financial restructuring or expansion in Kuwait.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Audit Support",
        description: "When facing tax audits or needing compliance reviews.",
      },
    ],

    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Accurate Compliance",
        description: "Ensure adherence to Kuwait's tax laws and regulations.",
      },
      {
        img: TaxCard2,
        heading: "Cost Optimization",
        description: "Minimize liabilities and maximize financial efficiency.",
      },
      {
        img: TaxCard3,
        heading: "Time-Saving Expertise",
        description:
          "Avoid delays with professional handling of tax processes.",
      },
      {
        img: TaxCard3,
        heading: "Risk Mitigation",
        description: "Reduce the risk of audits and penalties.",
      },
      {
        img: TaxCard3,
        heading: "Strategic Insights",
        description: "Tailored tax planning to align with your business goals.",
      },
    ],
  },

  accountingManagement: {
    bannerIcon: ConsBanner,
    bannerHeading:
      "Expert Accounting & Management Services in Kuwait – Achieve Business Success through Advanced Management",
    bannerDescription:
      "Comprehensive financial, operational, and strategic solutions tailored for businesses in Kuwait.",
    heading: "Accounting & Management Services",
    benefitHeading: "Benefits of Accounting & Management Services",
    benefitDescription:
      "Efficient financial management and strategic planning are essential for business success, especially in Kuwait’s dynamic economy. At EZYFILING.COM, we provide a wide range of Accounting & Management Services to help businesses streamline operations, achieve compliance, and fuel growth.\n\n" +
      "Our Accounting & Bookkeeping services ensure your financial records are accurate, transparent, and audit-ready. With Virtual CFO Services, you gain access to expert financial insights while avoiding the expense of a full-time CFO. For businesses pursuing growth, we offer strategic support for M&A and Fundraising to secure investments and execute seamless mergers.\n\n" +
      "Our Business Growth Planning & Strategy solutions provide actionable roadmaps tailored to your objectives. Additionally, we simplify Visa Services for employees and executives, ensuring smooth operations, while our Bank Account Opening Assistance helps establish seamless financial processes.\n\n" +
      "Whether you’re a startup, SME, or a multinational corporation, our services are customized to meet your specific needs, allowing you to focus on your business’s core operations while we handle the complexities.",
    cardData: [
      {
        icon: ConsWho1,
        title: "Financial Foundation",
        description:
          "Entrepreneurs and startups looking for a strong financial foundation.",
      },
      {
        icon: ConsWho2,
        title: "Operational Efficiency",
        description:
          "SMEs seeking efficient financial and operational management.",
      },
      {
        icon: ConsWho3,
        title: "Business Expansion",
        description:
          "Established corporations planning mergers, acquisitions, or regional expansion.",
      },
      {
        icon: ConsWho4,
        title: "Accounting Systems",
        description:
          "During business setup to establish robust accounting systems.",
      },
      {
        icon: ConsWho4,
        title: "Growth & Funding",
        description:
          "When seeking growth, funding, or operational efficiency in Kuwait.",
      },
      {
        icon: ConsWho4,
        title: "Operational Support",
        description:
          "When managing visa requirements or banking needs for employees and operations.",
      },
    ],

    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Accurate Financial Management",
        description: "Stay compliant and audit-ready.",
      },
      {
        img: ConsCard2,
        heading: "Cost-Effective Expertise",
        description: "Save costs with outsourced professional services.",
      },
      {
        img: ConsCard3,
        heading: "Growth Enablement",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
      {
        img: ConsCard3,
        heading: "Growth Enablement",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
      {
        img: ConsCard3,
        heading: "Growth Enablement",
        description:
          "Strategic planning for mergers, fundraising, and expansion.",
      },
    ],
  },
};

export const SingaporeServices = {
  companySetup: {
    bannerIcon: SetupBanner,
    bannerHeading:
      "Seamless Company Setup in Singapore – Your Path to Business Success in Growing Business Market of Singapore",
    bannerDescription:
      "Expert guidance for smooth setting up businesses in Singapore’s Free Trade and Mainland regions.",
    heading: "Company Setup Services in Singapore",
    benefitHeading: "Benefits of Company Setup Services in Singapore",
    benefitDescription:
      "Singapore is one of the world's leading business hubs, renowned for its strategic location, business-friendly environment, and robust infrastructure. At EZYFILING.COM, we provide comprehensive Company Setup Services for businesses looking to establish themselves in Singapore Free Trade Zones or the Mainland.\n\n" +
      "Setting up in a Free Trade Zone offers advantages like duty exemptions and simplified customs procedures, making it ideal for businesses in trading, logistics, and warehousing. On the other hand, Singapore Mainland allows businesses to operate without geographical restrictions, providing access to Singapore's thriving local market and a skilled workforce.\n\n" +
      "We handle every aspect of the setup process, including company registration, compliance with local regulations, licensing, and operational setup. Our experts ensure that the process is smooth, efficient, and tailored to your specific business needs. Whether you're a startup, SME, or multinational corporation, we position your business for long-term success in Singapore with complete compliance through our one platform itself.",
    cardData: [
      {
        icon: SetupWho1,
        title: "Market Entry",
        description: "Entrepreneurs and startups entering Singapore’s market.",
      },
      {
        icon: SetupWho2,
        title: "Regional Expansion",
        description:
          "SMEs and multinational corporations expanding in Southeast Asia.",
      },
      {
        icon: SetupWho3,
        title: "Trade & Logistics",
        description:
          "Businesses in trading, logistics, and manufacturing seeking Free Trade benefits.",
      },
      {
        icon: SetupWho4,
        title: "Market Penetration",
        description:
          "When planning to enter the competitive Singaporean market.",
      },
      {
        icon: SetupWho4,
        title: "Duty Exemptions",
        description:
          "When seeking operational efficiency and duty exemptions in Free Trade Zones.",
      },
      {
        icon: SetupWho4,
        title: "Business Setup",
        description:
          "When requiring compliance and licensing for a Mainland business setup.",
      },
    ],

    bannerCardData: [
      {
        img: SetupCard1,
        heading: "End-to-End Support",
        description: "From documentation to operational setup.",
      },
      {
        img: SetupCard2,
        heading: "Tailored Solutions",
        description: "Customized advice for Free Trade and Mainland setups.",
      },
      {
        img: SetupCard3,
        heading: "Compliance Assurance",
        description: "Adherence to all Singaporean regulations.",
      },
      {
        img: SetupCard3,
        heading: "Time Efficiency",
        description: "Streamlined processes for faster setup.",
      },
      {
        img: SetupCard3,
        heading: "Local Expertise",
        description: "Deep understanding of Singapore's business landscape.",
      },
    ],
  },

  taxFiling: {
    bannerIcon: TaxBannerIcon,
    bannerHeading:
      "Comprehensive Tax Filing Services in Singapore – Simplifying Compliance with Ease of Business",
    bannerDescription:
      "Expert solutions for Corporate Tax Filing, VAT Filing, and Tax Consulting tailored to Singapore’s regulations.",
    heading: "Tax Filing Services in Singapore",
    benefitHeading: "Benefits of Tax Filing Services in Singapore",
    benefitDescription:
      "Navigating Singapore’s tax landscape requires precision and expertise to ensure compliance while optimizing financial strategies. At EZYFILING.COM, we provide specialized Tax Filing Services for Corporate Tax Filing, VAT Filing, and Tax Consulting, designed to cater to businesses of all sizes in Singapore.\n\n" +
      "Our Corporate Tax Filing services focus on ensuring accurate and timely submission of your tax returns, adhering to the Inland Revenue Authority of Singapore (IRAS) regulations, while identifying opportunities to minimize liabilities. For businesses subject to VAT (Goods and Services Tax), we streamline the process with comprehensive VAT Filing services, from registration to compliance and recovery. Additionally, our Tax Consulting experts provide strategic advice to enhance tax planning, reduce risks, and achieve financial efficiency.\n\n" +
      "Whether you’re a startup, SME, or multinational corporation, our tailored solutions ensure your tax obligations are met with precision, allowing you to focus on growing your business. With our in-depth understanding of Singapore’s tax framework, we deliver reliable, hassle-free services.",
    cardData: [
      {
        icon: TaxWhoWeAre1,
        title: "Tax Navigation",
        description:
          "Entrepreneurs and startups navigating Singapore’s tax system.",
      },
      {
        icon: TaxWhoWeAre2,
        title: "Tax Management",
        description: "SMEs and corporations managing complex tax structures.",
      },
      {
        icon: TaxWhoWeAre3,
        title: "Tax Optimization",
        description:
          "Businesses aiming to optimize tax efficiency and compliance.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Tax Filing",
        description: "During annual corporate tax filing deadlines.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "VAT Compliance",
        description: "When VAT submissions or compliance checks are due.",
      },
      {
        icon: TaxWhoWeAre4,
        title: "Financial Restructuring",
        description:
          "When planning financial restructuring or expansions in Singapore.",
      },
    ],
    bannerCardData: [
      {
        img: TaxCard1,
        heading: "Accurate Compliance",
        description: "Adherence to Singapore’s tax laws and IRAS guidelines.",
      },
      {
        img: TaxCard2,
        heading: "Cost Efficiency",
        description: "Minimize liabilities through strategic tax planning.",
      },
      {
        img: TaxCard3,
        heading: "Time-Saving Expertise",
        description: "Ensure timely submissions without delays.",
      },
      {
        img: TaxCard3,
        heading: "Risk Mitigation",
        description: "Reduce the chances of audits and penalties.",
      },
      {
        img: TaxCard3,
        heading: "Strategic Insights",
        description: "Customized tax strategies for growth and sustainability.",
      },
    ],
  },

  accountingManagement: {
    bannerIcon: ConsBanner,
    bannerHeading:
      "Comprehensive Accounting & Management Services in Singapore – Empowering Your Growth through adequate control and management",
    bannerDescription:
      "Tailored solutions for financial management, strategic planning, and operational efficiency in business established in Singapore.",
    heading: "Accounting & Management Services",
    benefitHeading: "Benefits of Accounting & Management Services",
    benefitDescription:
      "Singapore’s dynamic business environment requires efficient financial and operational management to succeed. At EZYFILING.COM, we provide comprehensive Accounting & Management Services to help businesses stay compliant, improve efficiency, and achieve growth. Our expertise spans Accounting & Bookkeeping, Virtual CFO Services, M&A and Fundraising, Business Growth Planning & Strategy, Visa Services, and Bank Account Opening Assistance.\n\n" +
      "Our Accounting & Bookkeeping services ensure your financial records are accurate, transparent, and compliant with Singapore’s regulations. With Virtual CFO Services, you gain access to strategic financial insights while avoiding the cost of hiring a full-time CFO. For businesses seeking growth, we offer expert guidance on M&A and Fundraising, helping secure investments and execute seamless mergers.\n\n" +
      "Our Business Growth Planning & Strategy services provide actionable roadmaps to scale your business effectively. Additionally, we simplify operational needs through Visa Services for employees and executives and provide Bank Account Opening Assistance for seamless financial operations.\n\n" +
      "Whether you’re a startup, SME, or multinational, our tailored solutions ensure your business operates efficiently and thrives in Singapore’s competitive landscape.",
    cardData: [
      {
        icon: ConsWho1,
        title: "Financial Foundations",
        description:
          "Entrepreneurs and startups seeking strong financial foundations.",
      },
      {
        icon: ConsWho2,
        title: "Operational Scaling",
        description:
          "SMEs aiming to scale operations and manage finances efficiently.",
      },
      {
        icon: ConsWho3,
        title: "Corporate Expansion",
        description:
          "Large corporations planning mergers, acquisitions, or expansions.",
      },
      {
        icon: ConsWho4,
        title: "Business Setup",
        description: "During business setup or expansion in Singapore.",
      },
      {
        icon: ConsWho4,
        title: "Financial Restructuring",
        description: "When seeking funding or restructuring financial systems.",
      },
      {
        icon: ConsWho4,
        title: "Operational Support",
        description:
          "When requiring visa or banking support for employees and operations.",
      },
    ],
    bannerCardData: [
      {
        img: ConsCard1,
        heading: "Accurate Financial Management",
        description: "Stay compliant and audit-ready.",
      },
      {
        img: ConsCard2,
        heading: "Strategic Growth Support",
        description: "Guidance for mergers, fundraising, and scaling.",
      },
      {
        img: ConsCard3,
        heading: "Cost-Effective Expertise",
        description: "Outsourced solutions to save time and resources.",
      },
      {
        img: ConsCard3,
        heading: "Operational Efficiency",
        description: "Simplified visa and banking processes.",
      },
      {
        img: ConsCard3,
        heading: "Customized Solutions",
        description: "Tailored strategies for businesses of all sizes.",
      },
    ],
  },
};
