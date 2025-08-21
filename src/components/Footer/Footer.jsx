import { Link, useNavigate } from "react-router-dom";
import CallFooter from "../../assets/icons/CallFooter.svg";
import EmailFooter from "../../assets/icons/EmailFooter.svg";
import LocationFooter from "../../assets/icons/LocationFooter.svg";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const SocialMediaSection = () => (
  <div className="flex space-x-10 mt-4 lg:mt-0">
    <a
      href="https://www.facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-900"
    >
      <FaFacebook size={30} />
    </a>
    <a
      href="https://www.instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-900"
    >
      <FaInstagram size={30} />
    </a>
    <a
      href="https://www.twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-900"
    >
      <FaXTwitter size={30} />
    </a>
    <a
      href="https://www.linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-900"
    >
      <FaLinkedin size={30} />
    </a>
  </div>
);

const FooterSection = ({ title, items, showYellowLine = true }) => {
  return (
    <div className={title === "" ? "mt-9 md:mt-5 lg:mt-10" : ""}>
      {title && <h3 className="font-semibold w-full text-lg mb-0">{title}</h3>}
      {showYellowLine && <div className="w-10 h-0.5 bg-yellow-500 mb-2"></div>}
      <ul className="space-y-2 text-sm text-gray-500">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              to={item.link}
              className="hover:underline flex items-center space-x-2"
            >
              {item.icon && (
                <img src={item.icon} alt={item.text} className="w-5 h-10" />
              )}
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FooterSectionCalcultor = ({ title, items, showYellowLine = true }) => {
  return (
    <div className={title === "" ? "mt-9 md:mt-5 lg:mt-10" : ""}>
      <div className="ml-[30%]">
        {title && (
          <h3 className="font-semibold  w-full text-lg mb-0">{title}</h3>
        )}
        {showYellowLine && (
          <div className="w-10 h-0.5 bg-yellow-500 mb-2"></div>
        )}
      </div>
      <ul className="gap-2 grid grid-cols-2 text-sm text-gray-500">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              to={item.link}
              className="hover:underline flex items-center space-x-2"
            >
              {item.icon && (
                <img src={item.icon} alt={item.text} className="w-5 h-10" />
              )}
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  const navigate = useNavigate();
  const footerData = [
    {
      title: "India",
      items: [
        { text: "Tax Filing", link: "/service/india/tax-filing" },
        { text: "GST Services", link: "/service/india/gst-services" },
        { text: "FEMA", link: "/service/india/fema-compliance" },
        { text: "ROC Filing", link: "/service/india/roc-services" },
        {
          text: "Business Consultation",
          link: "/service/india/business-consultancy",
        },
        { text: "Business Setup", link: "/service/india/business-setup" },
      ],
    },
    {
      title: "UAE",
      items: [
        { text: "Company Setup", link: "/service/uae/company-setup" },
        { text: "Tax Filing", link: "/service/uae/tax-filing" },
        {
          text: "Accounting and Management",
          link: "/service/uae/accounting-management",
        },
      ],
    },
    {
      title: "Saudi Arabia",
      items: [
        { text: "Company Setup", link: "/service/saudi/company-setup" },
        { text: "Tax Filing", link: "/service/saudi/tax-filing" },
        {
          text: "Accounting and Management",
          link: "/service/saudi/accounting-management",
        },
      ],
    },
    {
      title: "Oman",
      items: [
        { text: "Company Setup", link: "/service/oman/company-setup" },
        { text: "Tax Filing", link: "/service/oman/tax-filing" },
        {
          text: "Accounting and Management",
          link: "/service/oman/accounting-management",
        },
      ],
    },
    {
      title: "Qatar",
      items: [
        { text: "Company Setup", link: "/service/qatar/company-setup" },
        { text: "Tax Filing", link: "/service/qatar/tax-filing" },
        {
          text: "Accounting and Management",
          link: "/service/qatar/accounting-management",
        },
      ],
    },
    {
      title: "Kuwait",
      items: [
        { text: "Company Setup", link: "/service/kuwait/company-setup" },
        { text: "Tax Filing", link: "/service/kuwait/tax-filing" },
        {
          text: "Accounting and Management",
          link: "/service/kuwait/accounting-management",
        },
      ],
    },
    {
      title: "Singapore",
      items: [
        { text: "Company Setup", link: "/service/singapore/company-setup" },
        { text: "Tax Filing", link: "/service/singapore/tax-filing" },
        {
          text: "Accounting and Management",
          link: "/service/singapore/accounting-management",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mx-4 sm:mx-9 my-6 sm:my-10 items-baseline sm:items-center">
        <div className="text-2xl bg-[#fedc60] px-1 font-semibold">
          ezyfiling
        </div>
        <SocialMediaSection />
      </div>

      <footer className="bg-gray-100 text-gray-800 py-8 px-6 lg:px-10">
        <div className="mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-6 border-b pb-8 mb-8">
            {footerData.map((region, index) => (
              <FooterSection
                key={index}
                title={region.title}
                items={region.items}
              />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 border-b pb-8 mb-8 text-sm">
            {/* First Section */}
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    title: "Resources",
                    items: [
                      { text: "Calculators", link: "/calculators" },
                      { text: "Blogs & Articles", link: "/blog" },
                      { text: "Guides", link: "/guide" },
                    ],
                  },
                  {
                    title: "Pricing",
                    items: [
                      {
                        text: "Tax Filing",
                        link: "/service/india/tax-filing#pricing",
                      },
                      {
                        text: "GST Services",
                        link: "/service/india/gst-services#pricing",
                      },
                      {
                        text: "FEMA",
                        link: "/service/india/fema-compliance#pricing",
                      },
                      {
                        text: "ROC Filing",
                        link: "/service/india/roc-services#pricing",
                      },
                      {
                        text: "Business Consultation",
                        link: "/service/india/business-consultancy#pricing",
                      },
                      {
                        text: "Business Setup",
                        link: "/service/india/business-setup#pricing",
                      },
                    ],
                  },
                ].map((section, index) => (
                  <FooterSection
                    key={index}
                    title={section.title}
                    items={section.items}
                  />
                ))}
              </div>
            </div>

            {/* Second Section */}

            <div className="col-span-2">
              {[
                {
                  title: "Calculators",
                  items: [
                    {
                      text: "Income Tax Calculator",
                      link: "/calculators/Income-tax",
                    },
                    { text: "HRA Calculator", link: "/calculators/hra" },
                    { text: "NPS Calculator", link: "/calculators/nps" },
                    {
                      text: "Home Loan EMI Calculator",
                      link: "/calculators/home-loan-emi",
                    },
                    { text: "NSC Calculator", link: "/calculators/nsc" },
                    { text: "SIP Calculator", link: "/calculators/sip" },
                    {
                      text: "Old & New Tax Regime",
                      link: "/calculators/old-and-new-tax-regime",
                    },
                    {
                      text: "Gratuity Calculator",
                      link: "/calculators/gratuity",
                    },
                    {
                      text: "Home Rent Receipt Generator",
                      link: "/calculators/home-rent-receipt",
                    },
                  ],
                },
              ].map((section, index) => (
                <FooterSectionCalcultor
                  key={index}
                  title={section.title}
                  items={section.items}
                  showYellowLine={section.title !== ""}
                />
              ))}
            </div>

            {/* Third Section: Support */}
            <div>
              <FooterSection
                title="Support"
                items={[
                  {
                    text: "Frequently Asked Questions",
                    link: "/FAQs",
                  },
                  // { text: "Contact Us", link: "/contact-us" },
                ]}
              />
            </div>

            {/* Fourth Section: Contact Us */}
            <div>
              <FooterSection
                title="Contact Us"
                items={[
                  {
                    text: "301, Kamla Hub, N S Road No 1, Near Criti Care Hospital, Next to Aromas Cafe, JVPD Scheme, Juhu, Vile Parle West, Mumbai – 400049",
                    icon: LocationFooter,
                    link: "https://www.google.com/maps/search/301,+Kamla+Hub,+N+S+Road+No+1,+Near+Criti+Care+Hospital,+Next+to+Aromas+Cafe,+JVPD+Scheme,+Juhu,+Vile+Parle+West,+Mumbai+%E2%80%93+400049/@19.1128942,72.8299741,16.46z?entry=ttu&g_ep=EgoyMDI1MDQwMS4wIKXMDSoASAFQAw%3D%3D",
                  },
                  {
                    text: "+91 63595 99999",
                    icon: CallFooter,
                    link: "tel:+916359599999",
                  },
                  {
                    text: "support@ezyfiling.com",
                    icon: EmailFooter,
                    link: "mailto:support@ezyfiling.com",
                  },
                ]}
              />
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-sm text-center text-gray-600 mt-8 flex justify-center gap-4 ">
            <p>© 2025 APT Global Fincon Private Limited, India All rights reserved</p>
            <a
              target="_blank"
              className="cursor-pointer hover:underline"
              href="/terms-and-conditions"
            >
              Terms & Conditions
            </a>
            <a
              target="_blank"
              className="cursor-pointer hover:underline"
              href="/privacy-policy"
            >Privacy Policies</a>
            
            <a
              target="_blank"
              className="cursor-pointer hover:underline"
              href="/cancellation-policy"
            >Refund & Cancellation Policies</a>

            <p
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/url-list")}
            >
              Site Map
            </p>
            <p></p>
          </div>
        </div>
      </footer>
    </>
  );
}
