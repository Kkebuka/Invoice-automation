export interface MKItem {
  index: number;
  itemNumber: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  grossWeight?: number;
  netWeight?: number;
  measurement?: number;
}

export interface InvoiceTotals {
  seaFreight: number;
  soncapFee: number;
}

export interface formDataValues {
  dollarRate: number;
  clearingFee: number;
}
