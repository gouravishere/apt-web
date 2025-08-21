import React, { useState } from "react";
import jsPDF from "jspdf";
import { formatIndianCurrencyZero } from "../../utils";

const PdfWithBackground = () => {
  const [tenantName, setTenantName] = useState("John Doe");
  const [propertyAddress, setPropertyAddress] = useState(
    "1234 Elm Street, Springfield"
  );
  const [rentAmount, setRentAmount] = useState("15000");
  const [date, setDate] = useState("29-Nov-2024");
  const [tenantPAN, setTenantPAN] = useState("ABCDE1234F");
  const [landlordPAN, setLandlordPAN] = useState("ZYXWV6789P");

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Path to the background image
    const backgroundImageURL =
      "https://cdn.pixabay.com/photo/2023/02/01/21/40/pink-7761356_640.png"; // Replace with your image path

    const img = new Image();
    img.src = backgroundImageURL;

    img.onload = () => {
      // Get PDF page dimensions
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = doc.internal.pageSize.getHeight();

      // Add the background image
      doc.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);

      // Add static text (normal black color)
      doc.setFontSize(22);
      doc.setFont("normal");
      doc.setTextColor(0, 0, 0); // Black text for static text

      // Title
      doc.text("Rent Receipt", 10, 20); // Left side

      // Date
      doc.setFontSize(16);
      doc.text(
        `Date: ${date}`,
        imgWidth - 10 - doc.getTextWidth(`Date: ${date}`),
        20
      ); // Right side, adjusted to fit

      // Add dynamic text (bold black color)
      doc.setFont("bold");
      doc.setTextColor(0, 0, 0); // Black text for dynamic content

      // Rent details (wrap the text)
      const rentDetails = `Received a sum of Rs. ${formatIndianCurrencyZero(rentAmount)}/- from ${formatIndianCurrencyZero(tenantName)} towards the rent of property situated at ${propertyAddress} for the period Nov 2024.`;
      doc.text(rentDetails, 10, 40, { maxWidth: imgWidth - 20 });

      // Tenant and Landlord PAN (wrap the text)
      const tenantPANText = `Tenant PAN: ${tenantPAN}`;
      const landlordPANText = `Landlord PAN: ${landlordPAN}`;
      doc.text(tenantPANText, 10, 60, { maxWidth: imgWidth - 20 });
      doc.text(landlordPANText, 10, 70, { maxWidth: imgWidth - 20 });

      // Footer (normal black color, positioned at the bottom left of the page)
      const footerText = "Rent Receipt Generator by ezyfiling";
      const footerY = imgHeight - 10; // Position 10 units above the bottom of the page
      doc.setFontSize(12);
      doc.setFont("normal");
      doc.setTextColor(0, 0, 0); // Black text for the footer
      doc.text(footerText, 10, footerY); // Positioned on the left side (10px from left)

      // Save the PDF
      doc.save("Rent_Receipt.pdf");
    };

    img.onerror = () => {
      console.error("Failed to load background image.");
    };
  };

  return (
    <div>
      <button
        onClick={handleGeneratePDF}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate PDF
      </button>
    </div>
  );
};

export default PdfWithBackground;
