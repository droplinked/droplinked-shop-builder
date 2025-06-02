import { PdfExportDataResponse } from "../../../lib/apis/credit/interfaces";

// Export the PdfExportDataResponse interface to use in invoice components
export type { PdfExportDataResponse };

// Context interface
export interface InvoiceContextType {
    invoiceData: PdfExportDataResponse & {
        companyWebsite?: string;
        companyAddress?: string;
        companyEmail?: string;
    };
}