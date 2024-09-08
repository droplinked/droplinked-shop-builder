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
        queryFn: () => Promise.resolve({}),
        enabled: !!invoiceId,
    })

    const invoiceInformationMap: InvoiceInformationMap = {
        "Information": [
            { label: "ID Number", value: invoiceId || "INV-0001" },
            { label: "Status", value: "Pending" },
            { label: "Memo", value: "If no one is at home, please leave the package at the front door." }
        ],
        "Client detail": [
            { label: "Full name", value: "Alireza Taherzadeh" },
            { label: "Email Address", value: "Artaherzadeh@gmail.com" },
            { label: "Mobile Number", value: "+1 234-567-8910" },
            { label: "Address", value: "123 Elm Street, Apt 4B, San Francisco, California, 94121, United States" },
            { label: "Shipping Method", value: "Express shipping" }
        ],
        "Payment Details": [
            { label: "Total cart", value: 123, isPrice: true },
            { label: "Tax", value: 123, isPrice: true },
            { label: "Total Shipping", value: 123, isPrice: true },
            { label: "Order Tax", value: 123, isPrice: true },
            { label: "Total Cost", value: 123, isPrice: true }
        ]
    }

    return {
        isFetching,
        isError,
        data,
        invoiceInformationMap
    }
}