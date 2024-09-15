import { retrieveInvoiceByIdService } from "lib/apis/invoice/invoiceServices";
import { useQuery } from "react-query";

export type SummaryRow = {
    label: string;
    value: string | number;
    isPrice?: boolean;
}

type InvoiceInformationMap = Record<string, SummaryRow[]>

export default function useInvoiceInformation(invoiceId?: string) {
    const { isFetching, isError, data } = useQuery({
        queryKey: ["invoice", invoiceId],
        queryFn: () => retrieveInvoiceByIdService(invoiceId || ""),
        enabled: !!invoiceId,
    })
    const invoiceData = data?.data

    const invoiceInformationMap: InvoiceInformationMap = {
        "Information": [
            { label: "ID Number", value: invoiceId || "N/A" },
            { label: "Status", value: invoiceData?.status || "N/A" },
            { label: "Memo", value: invoiceData?.note || "N/A" }
        ],
        "Client detail": [
            { label: "Full name", value: "Alireza Taherzadeh" },
            { label: "Email Address", value: "Artaherzadeh@gmail.com" },
            { label: "Mobile Number", value: "+1 234-567-8910" },
            { label: "Address", value: "123 Elm Street, Apt 4B, San Francisco, California, 94121, United States" },
            { label: "Shipping Method", value: "Express shipping" }
        ],
        "Payment Details": [
            { label: "Total cart", value: invoiceData?.totalCart?.subtotal, isPrice: true },
            { label: "Tax", value: invoiceData?.totalCart?.estimatedTaxes, isPrice: true },
            { label: "Total Shipping", value: invoiceData?.totalCart?.shipping, isPrice: true },
            { label: "Total Cost", value: invoiceData?.totalCart?.totalPayment, isPrice: true }
        ]
    }

    return {
        isFetching,
        isError,
        data: invoiceData,
        invoiceInformationMap
    }
}