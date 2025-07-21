import { Flex, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Table from 'components/redesign/table/Table'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { Invoice, InvoiceStatus } from 'services/invoice/interfaces'
import { SHOP_URL } from 'utils/app/variable'
import InvoiceDetailsModal from 'pages/invoice-management/components/invoice-details/InvoiceDetailsModal'
import React, { useRef } from 'react'
import InvoiceTableMenu from './InvoiceTableMenu'
import StatusBadge from './StatusBadge'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'

interface Props {
    invoices: Invoice[]
    isLoading: boolean
    dataLength: number
    hasMore: boolean
    isFetchingNextPage: boolean
    next: () => void
}

function InvoiceTable({ invoices, isLoading, dataLength, hasMore, isFetchingNextPage, next }: Props) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale });
    const { getFormattedPrice } = useCurrencyConverter()
    const invoiceRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const columns: ColumnDef<Invoice>[] = [
        {
            accessorKey: 'email',
            header: t('common:client'),
            cell: info => {
                const { email, checkoutAddressID } = info.row.original
                const { firstName, lastName } = checkoutAddressID ?? {}
                const hasFullName = !!(firstName && lastName)
                if (email && hasFullName) return (
                    <Flex direction="column">
                        <AppTypography fontSize={14} color="white">{`${firstName} ${lastName}`}</AppTypography>
                        <AppTypography fontSize={14} color="#B1B1B1">{email}</AppTypography>
                    </Flex>
                )
                if (email) return <AppTypography fontSize={14} color="white">{email}</AppTypography>
                if (hasFullName) return <AppTypography fontSize={14} color="white">{`${firstName} ${lastName}`}</AppTypography>
                return "-"
            }
        },
        { accessorKey: 'createdAt', header: t('common:date'), cell: info => (new Date(info.getValue() as string)).toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" }) },
        {
            accessorKey: 'amount',
            header: t('InvoiceTable.columns.amount'),
            cell: (info) => {
                const amount = info.getValue() as number
                if (amount) return `${getFormattedPrice({ amount, toFixed: true })}`
                return "-"
            }
        },
        { accessorKey: 'status', header: t('common:status'), cell: info => <StatusBadge status={info.getValue() as InvoiceStatus} /> }
    ]

    const openDetailsModal = (invoice: Invoice) => {
        invoiceRef.current = invoice._id
        onOpen()
    }

    const renderActions = (row: Invoice) => {
        const paymentLink = `${SHOP_URL}/paylink/invoice/${row._id}`

        return (
            <Flex alignItems="center" gap={6} sx={{ "svg": { width: 5, height: 5 } }}>
                <button onClick={() => window.open(paymentLink, "_blank")}><AppIcons.Share /></button>
                <button onClick={() => openDetailsModal(row)}><AppIcons.Eye stroke='#fff' /></button>
                <InvoiceTableMenu invoice={row} />
            </Flex>
        )
    }

    return (
        <>
            <Table
                isLoading={isLoading}
                columns={columns}
                data={invoices}
                renderActions={renderActions}
                emptyView={
                    <AppTypography fontSize={16} fontWeight={500} color="white">
                        {t('InvoiceTable.empty.description')}
                    </AppTypography>
                }
                infiniteScroll={{ dataLength, hasMore, next, isFetchingNextPage }}
            />
            {isOpen && <InvoiceDetailsModal isOpen={isOpen} onClose={onClose} invoiceId={invoiceRef.current} />}
        </>
    )
}

export default InvoiceTable