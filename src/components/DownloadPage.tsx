import * as XLSX from "xlsx";
import { MKItem, InvoiceTotals, formDataValues } from "../types";
import { useState } from "react";
interface DownloadPageProps {
  items: MKItem[];
  totals: InvoiceTotals;
  formDataValues: formDataValues;
}

export default function DownloadPage({
  items,
  totals,
  formDataValues,
}: DownloadPageProps) {
  console.log(items, totals, formDataValues);

  const totalShipping = totals.seaFreight + totals.soncapFee;
  const totalCbm: number = Number(
    items.reduce((acc, obj) => acc + obj.measurement, 0).toFixed(2)
  );
  console.log(totalCbm);

  const updatedData: item[] = items.map((item) => {
    const cartonPriceNaira = item.amount * formDataValues.dollarRate;
    const shippingFeeInNaira =
      item.measurement * (totalShipping / totalCbm) * formDataValues.dollarRate;
    const clearingCost =
      item.measurement * (formDataValues.clearingFee / totalCbm);

    return {
      ...item,
      cartonPriceNaira,
      shippingFeeInNaira,
      clearingCost,
      totalWithoutClearing: cartonPriceNaira + shippingFeeInNaira,
      total: cartonPriceNaira + shippingFeeInNaira + clearingCost,
    };
  });
  const handleDownload = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert your data to worksheet
    const wsItems = XLSX.utils.json_to_sheet(items);
    const wsTotals = XLSX.utils.json_to_sheet([totals]);

    // Add worksheets to workbook
    XLSX.utils.book_append_sheet(wb, wsItems, "Items");
    XLSX.utils.book_append_sheet(wb, wsTotals, "Totals");

    // Generate file and trigger download
    XLSX.writeFile(wb, "calculated_results.xlsx");
  };

  return (
    <div className="download-container">
      <h1>Your Calculation is Ready</h1>
      <p>Processed {items.length} items</p>

      <button onClick={handleDownload} className="download-btn">
        Download Excel File
      </button>

      {/* Optional: Show summary */}
      <div className="summary">
        <h3>Summary</h3>
        <p>Sea Freight: {totals.seaFreight}</p>
        <p>SONCAP Fee: {totals.soncapFee}</p>
      </div>
    </div>
  );
}
