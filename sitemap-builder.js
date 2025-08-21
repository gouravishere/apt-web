const fs = require("fs");
const path = require("path");

// Define your base URL
const BASE_URL = process.env.REACT_APP_WEBSITE_URL;

// List of public routes (extracted from App.js)
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/otp-verification",
  "/unauthorized",
  "/partner",
  "/blog",
  "/dashboard",
  "/dashboard/services",
  "/dashboard/documents",
  "/dashboard/payments",
  "/dashboard/user-support",
  "/dashboard/settings",
  "/calculators",
  "/calculators/hra",
  "/calculators/nsc",
  "/calculators/nps",
  "/calculators/sip",
  "/calculators/old-and-new-tax-regime",
  "/calculators/home-loan-emi",
  "/calculators/home-rent-receipt",
  "/calculators/gratuity",
  "/calculators/Income-tax",
    "/service/india/tax-filing",
    "/service/india/gst-services",
    "/service/india/fema-compliance",
    "/service/india/roc-services",
    "/service/india/business-consultancy",
    "/service/india/business-setup",
    "/service/uae/company-setup",
    "/service/uae/tax-filing",
    "/service/uae/accounting-management",
    "/service/saudi/company-setup",
    "/service/saudi/tax-filing",
    "/service/saudi/accounting-management",
    "/service/oman/company-setup",
    "/service/oman/tax-filing",
    "/service/oman/accounting-management",
    "/service/qatar/company-setup",
    "/service/qatar/tax-filing",
    "/service/qatar/accounting-management",
    "/service/kuwait/company-setup",
    "/service/kuwait/tax-filing",
    "/service/kuwait/accounting-management",
    "/service/singapore/company-setup",
    "/service/singapore/tax-filing",
    "/service/singapore/accounting-management",
  "/pricing",
  "/pay-card",
  "/FAQs",
  "/contact-us",
  "/supportandpricing/pricing",
  "/guide",
  "/partnerpage",
  "/404",
  "/error",
];

// Function to generate the sitemap XML
const generateSitemap = (routes) => {
  const urlset = routes
    .map((route) => {
      return `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlset}
</urlset>`;
};

// Write the sitemap to a file
const sitemap = generateSitemap(publicRoutes);
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");

fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log("Sitemap generated successfully at:", sitemapPath);