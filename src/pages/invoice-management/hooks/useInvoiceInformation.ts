import { retrieveInvoiceByIdService } from "services/invoice/invoiceServices";
import { useQuery } from "react-query";
import useInvoiceStore from "../create-invoice/store/invoiceStore";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/invoice-management/ar.json';
import enLocale from 'locales/invoice-management/en.json';

export type SummaryRow = {
    label: string;
    value: string | number;
    isPrice?: boolean;
}

type InvoiceInformationMap = Record<string, SummaryRow[]>

export default function useInvoiceInformation(invoiceId?: string) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
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
        [t('useInvoiceInformation.sections.information')]: [
            { label: t('useInvoiceInformation.labels.idNumber'), value: invoice?._id || "-" },
            { label: t('useInvoiceInformation.labels.status'), value: invoice?.status || "-" },
            { label: t('useInvoiceInformation.labels.memo'), value: invoice?.note || "-" }
        ],
        [t('useInvoiceInformation.sections.clientDetail')]: [
            { label: t('useInvoiceInformation.labels.fullName'), value: formatFullName() },
            { label: t('useInvoiceInformation.labels.emailAddress'), value: invoice?.email || "-" },
            { label: t('useInvoiceInformation.labels.mobileNumber'), value: invoice?.address?.phoneNumber || "-" },
            { label: t('useInvoiceInformation.labels.address'), value: formatAddress() },
            { label: t('useInvoiceInformation.labels.shippingMethod'), value: findSelectedShippingTitle() }
        ],
        [t('useInvoiceInformation.sections.paymentDetails')]: [
            { label: t('useInvoiceInformation.labels.totalCart'), value: invoice?.totalCart?.subtotal, isPrice: true },
            { label: t('useInvoiceInformation.labels.tax'), value: invoice?.totalCart?.estimatedTaxes, isPrice: true },
            { label: t('useInvoiceInformation.labels.totalShipping'), value: invoice?.totalCart?.shipping, isPrice: true },
            { label: t('useInvoiceInformation.labels.totalCost'), value: invoice?.totalCart?.totalPayment, isPrice: true }
        ]
    }

    return {
        isFetching,
        isError,
        data: invoice,
        invoiceInformationMap
    }
}