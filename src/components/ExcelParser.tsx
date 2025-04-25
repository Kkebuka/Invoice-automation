import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { MKItem, InvoiceTotals } from "../types";
import DownloadPage from "./DownloadPage";

const ExcelParser: React.FC = () => {
  const [mkItems, setMkItems] = useState<MKItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [invoiceTotals, setInvoiceTotals] = useState<InvoiceTotals>({
    seaFreight: 0,
    soncapFee: 0,
  });
  const [fileName, setFileName] = useState<string>("");
  const [formDataValues, setFormDataValues] = useState({
    dollarRate: null,
    clearingFee: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Remove all non-numeric characters (except .)
    const rawValue = value.replace(/,/g, "");

    if (!isNaN(rawValue)) {
      setFormDataValues((prevData) => ({
        ...prevData,
        [name]: rawValue,
      }));
    }
  };
  const formatWithCommas = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num)) return "";
    return num.toLocaleString();
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        setFileName(acceptedFiles[0].name);
        parseExcel(acceptedFiles[0]);
      }
    },
  });

  const parseExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const invoiceSheet = workbook.Sheets[workbook.SheetNames[0]];
      const packlistSheet = workbook.Sheets[workbook.SheetNames[1]];
      console.log(invoiceSheet, packlistSheet);
      const invoiceData = XLSX.utils.sheet_to_json<string[]>(invoiceSheet, {
        header: 1,
      });
      const packlistData = XLSX.utils.sheet_to_json<string[]>(packlistSheet, {
        header: 1,
      });
      console.log("invoiceData", invoiceData);

      const { mkItems, totals } = processData(invoiceData, packlistData);
      setMkItems(mkItems);
      setInvoiceTotals(totals);
      console.log(mkItems);
      setIsProcessing(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const processData = (
    invoiceData: string[][],
    packlistData: string[][]
  ): { mkItems: MKItem[]; totals: InvoiceTotals } => {
    // Extract MK items from INVOICE sheet

    console.log("invoiceData:", invoiceData[12][1]);
    const invoiceItems = invoiceData
      .map((row, index) => {
        // Check if either row[0] or row[1] contains "MK"
        const itemNo = row[0]?.startsWith("MK")
          ? row[0]
          : row[1]?.startsWith("MK")
          ? row[1]
          : null;

        // If itemNo is found, return the object with the index and item number
        if (itemNo) {
          return {
            index: index + 1, // Use the row index (1-based)
            itemNumber: itemNo, // Store the item number
            description: row[5] || "",
            quantity: Number(row[3]) || 0,
            unitPrice: Number(row[6]) || 0,
            amount: Number(row[7]) || 0,
          };
        }
        return null; // Return null if no valid item number is found
      })
      .filter((item) => item !== null); // Filter out null values

    console.log("invoiceItems", invoiceItems);

    // Extract MK items from PACKLIST sheet
    const packlistItems = packlistData
      .map((row, index) => {
        // Check if either row[0] or row[1] contains "MK"
        const itemNo = row[0]?.startsWith("MK")
          ? row[0]
          : row[1]?.startsWith("MK")
          ? row[1]
          : null;

        // If itemNo is found, return the object with the index and item number
        if (itemNo) {
          return {
            index: index + 1, // Use the row index (1-based)
            grossWeight: Number(row[6]) || 0,
            netWeight: Number(row[7]) || 0,
            measurement: Number(row[8]) || 0,
          };
        }
        return null; // Return null if no valid item number is found
      })
      .filter((item) => item !== null);

    const combinedItems = invoiceItems.map((invoiceItem) => ({
      ...invoiceItem,
      ...packlistItems.find((item) => item.index === invoiceItem.index),
    }));

    function getFeeValue(data: any, keyword: string) {
      for (const row of data) {
        if (row && row.includes(keyword)) {
          // Find the last non-null, finite number in the row
          for (let i = row.length - 1; i >= 0; i--) {
            if (typeof row[i] === "number" && isFinite(row[i])) {
              return row[i];
            }
          }
        }
      }
      return 0; // Default if not found
    }

    const seaFreight = getFeeValue(invoiceData, "SEA FREIGHT");
    const soncapFee = getFeeValue(invoiceData, "soncap");

    const totals: InvoiceTotals = {
      seaFreight,
      soncapFee,
    };
    return { mkItems: combinedItems, totals };
  };

  const handleSubmit = () => {
    // Perform calculations here if needed
    setIsCalculating(true);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto w-full   bg-red-300  h-screen flex items-center justify-center ">
      {!isCalculating ? (
        <form className="bg-white p-4 rounded-md">
          <h1 className="text-2xl font-bold mb-4">Upload Excel Invoice</h1>

          {/* File Upload */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              Drag & drop an Excel file here, or click to select
            </p>
            {fileName && (
              <p className="mt-2 text-sm text-green-600">
                Loaded: <span className="font-medium">{fileName}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="dollarRate">Dollar Rate (e.g., 1600)</label>
            <input
              type="text"
              name="dollarRate"
              placeholder="Dollar rate"
              value={formatWithCommas(formDataValues.dollarRate)}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="clearingFee">Clearing Fee(e.g 15000000)</label>
            <input
              type="text"
              name="clearingFee"
              placeholder="Clearing fee"
              value={formatWithCommas(formDataValues.clearingFee)}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Results */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!mkItems.length || isProcessing}
              className={`px-6 py-2 rounded-md transition-colors ${
                !mkItems.length || isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isProcessing ? "Processing..." : "Calculate & Continue"}
            </button>
          </div>

          {/* Data Preview */}
        </form>
      ) : (
        <DownloadPage
          items={mkItems}
          totals={invoiceTotals}
          formDataValues={formDataValues}
        />
      )}
    </div>
  );
};

export default ExcelParser;
