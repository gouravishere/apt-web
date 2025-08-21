import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./RentReceipt.css"; // Import the CSS file
import Button from "../Button/Button";
import dayjs from "dayjs";
import img from "../../assets/icons/RentRecieptBg.svg";
import { formatIndianCurrencyZero } from "../../utils";

const RentReceipt = ({ receiptData, landlord, onClick }) => {
  const receiptRefs = useRef([]); // Reference for the receipt containers

  const handleDownload = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      for (let i = 0; i < receiptData.length; i++) {
        const element = receiptRefs.current[i];
        if (!element) continue;

        // Capture the current Rent Receipt as an image
        const canvas = await html2canvas(element, { scale: 2 });
        const imageData = canvas.toDataURL("image/png");
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;

        // Scale canvas to PDF page size
        const pdfCanvasHeight = (canvasHeight * pdfWidth) / canvasWidth;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfCanvasHeight);
      }

      pdf.save("RentReceipts.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
     {<div className="flex flex-col gap-12 w-full overflow-hidden  fixed -top-[9999px]">
        {receiptData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (receiptRefs.current[index] = el)}
            className="container"
          >
            <img
              className="absolute top-0 left-0 z-[-20] w-full h-full"
              src={img}
              alt=""
            />
            <div className="max-w-[595px] px-10">
              <div className="header md:mt-32 mt-20">
                <h1 className="title">Rent Receipt</h1>
                <p className="date">
                  Date: {dayjs(item.receiptDate).format("D MMM YYYY")}
                </p>
              </div>
              <p className="receiptText">
                Received a sum of{" "}
                <strong>Rs. {formatIndianCurrencyZero(item.tenant.rentAmount)}/-</strong> from{" "}
                <strong>{item.tenant.name}</strong> towards the rent of property
                situated at <strong>{item.tenant.property}</strong> for the
                period{" "}
                <strong>
                  {dayjs(item.tenant.fromPeriod).format("D MMM YYYY")}
                </strong>{" "}
                to{" "}
                <strong>
                  {dayjs(item.tenant.toPeriod).format("D MMM YYYY")}
                </strong>
                .
              </p>
              <div className="infoContainer">
                <div className="row">
                  <p className="label">Tenant PAN</p>
                  <p className="value">{item.tenant.pan}</p>
                </div>
                <div className="row">
                  <p className="label">Landlord PAN</p>
                  <p className="value">{landlord.pan}</p>
                </div>
              </div>
            </div>
            <div className="footer">
              {/* <p className="footerText mt-auto">
              <span className="italicText">Rent Receipt Generator by </span>
              <b>ezyfiling</b>
            </p> */}
            </div>
          </div>
        ))}

        {/* Download Button */}
      </div>}
      <Button
        variant="outline"
        className="self-center"
        onClick={handleDownload}
      >
        Download as PDF
      </Button>
    </>
  );
};

export default RentReceipt;
