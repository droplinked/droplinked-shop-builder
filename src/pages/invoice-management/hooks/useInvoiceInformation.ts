import { retrieveInvoiceByIdService } from "services/invoice/invoiceServices";
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
        queryFn: () => retrieveInvoiceByIdService(invoiceId),
        enabled: !!invoiceId,
    })
    const cart = useInvoiceStore(state => state.cart)
    const invoice = invoiceId ? data?.data : cart
    const areAllProductsDigital = invoice?.items?.every(({ product }) => ['DIGITAL', 'EVENT'].includes(product.type))

    function formatFullName() {
        const { firstName, lastName } = invoice?.address ?? {}
        const fullName = [firstName, lastName].filter(Boolean).join(' ')
        return fullName || "-"
    }

    function formatAddress() {
        const { addressLine1, addressLine2, city, state, zip, country } = invoice?.address ?? {}
        const formattedAddress = [addressLine1, addressLine2, city, state, zip, country].filter(Boolean).join(', ')
        return formattedAddress || "-"
    }

    function findSelectedShippingTitle() {
        for (const shippingGroup of invoice?.shippings ?? []) {
            const selectedMethod = shippingGroup.data.find(method => method.selected)
            if (selectedMethod) return selectedMethod.title
        }
        return "-"
    }

    const invoiceInformationMap: InvoiceInformationMap = {
        "Information": [
            { label: "ID Number", value: invoice?._id || "-" },
            { label: "Status", value: invoice?.status || "-" },
            { label: "Memo", value: invoice?.note || "-" }
        ],
        "Client detail": [
            { label: "Full name", value: formatFullName() },
            { label: "Email Address", value: invoice?.email || "-" },
            { label: "Mobile Number", value: invoice?.address?.phoneNumber || "-" },
            { label: "Address", value: formatAddress() },
            { label: "Shipping Method", value: findSelectedShippingTitle() }
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