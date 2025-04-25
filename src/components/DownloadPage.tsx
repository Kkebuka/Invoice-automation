import * as XLSX from "xlsx";
import { MKItem, InvoiceTotals, formDataValues } from "../types";
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

  const updatedData: MKItem[] = items.map((item) => {
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
      total_Price: Number(
        cartonPriceNaira + shippingFeeInNaira + clearingCost
      ).toLocaleString(),
    };
  });

  console.log({ updatedData });

  const filteredData: Partial<MKItem>[] = updatedData.map(
    ({
      unitPrice,
      grossWeight,
      netWeight,
      shippingFeeInNaira,
      clearingCost,
      totalWithoutClearing,
      index,
      cartonPriceNaira,
      ...rest
    }) => {
      return rest;
    }
  );

  console.log({ filteredData });
  const handleDownload = () => {
    // Create a new workbook
    const worksheet = XLSX.utils.json_to_sheet(filteredData); // creates table with headers from keys
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

    XLSX.writeFile(workbook, "items_export.xlsx");
  };

  return (
    <div className="download-container p-4">
      <h1 className="text-2xl font-bold mb-4">Your Calculation is Ready</h1>
      <p>Processed {items.length} items</p>
      <div className="border-2 p-2">
        <h3>Summary</h3>
        <p>Sea Freight: {totals.seaFreight}</p>
        <p>SONCAP Fee: {totals.soncapFee}</p>
        <p>Total CBM: {totalCbm}</p>
        <p>Dollar Rate: {formDataValues.dollarRate}</p>
      </div>

      <button
        onClick={handleDownload}
        className="bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition transform duration-150"
      >
        Download Excel File
      </button>

      {/* Optional: Show summary */}
    </div>
  );
}
