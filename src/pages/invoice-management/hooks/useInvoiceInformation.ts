import { retrieveInvoiceByIdService } from "lib/apis/invoice/invoiceServices";
import { useQuery } from "react-query";
import useInvoiceStore from "../create-invoice/store/invoiceStore";

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
    const { cart, areAllProductsDigital } = useInvoiceStore()
    const invoice = invoiceId ? data?.data : cart

    function formatAddress() {
        const { addressLine1, addressLine2, city, state, zip, country } = invoice.address
        const formattedAddress = [addressLine1, addressLine2, city, state, zip, country].filter(Boolean).join(', ')
        return formattedAddress
    }

    function findSelectedShippingTitle() {
        for (const shippingGroup of invoice.shippings) {
            const selectedMethod = shippingGroup.data.find(method => method.selected)
            if (selectedMethod) return selectedMethod.title
        }
        return null
    }

    const invoiceInformationMap: InvoiceInformationMap = {
        "Information": [
            { label: "ID Number", value: invoice?._id || "N/A" },
            { label: "Status", value: invoice?.status || "N/A" },
            { label: "Memo", value: invoice?.note || "N/A" }
        ],
        "Client detail": [
            { label: "Full name", value: areAllProductsDigital ? "N/A" : `${invoice?.address.firstName} ${invoice?.address.lastName}` },
            { label: "Email Address", value: invoice?.email },
            { label: "Mobile Number", value: areAllProductsDigital ? "N/A" : invoice?.address.phoneNumber },
            { label: "Address", value: areAllProductsDigital ? "N/A" : formatAddress() },
            { label: "Shipping Method", value: areAllProductsDigital ? "N/A" : findSelectedShippingTitle() }
        ],
        "Payment Details": [
            { label: "Total cart", value: invoice?.totalCart?.subtotal, isPrice: true },
            { label: "Tax", value: invoice?.totalCart?.estimatedTaxes, isPrice: true },
            { label: "Total Shipping", value: invoice?.totalCart?.shipping, isPrice: true },
            { label: "Total Cost", value: invoice?.totalCart?.totalPayment, isPrice: true }
        ]
    }

    return {
        isFetching,
        isError,
        data: invoice,
        invoiceInformationMap
    }
}