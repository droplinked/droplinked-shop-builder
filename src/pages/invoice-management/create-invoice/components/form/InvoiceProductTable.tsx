import { Flex, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import Table from 'pages/invoice-management/components/Table'
import TextButton from 'pages/invoice-management/components/TextButton'
import React from 'react'
import useInvoiceStore, { CartItem } from '../../store/invoiceStore'
import InvoiceProductModal from './product-modal/InvoiceProductModal'

export default function InvoiceProductTable() {
    const cartItems = useInvoiceStore(state => state.cart.items)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const columns: ColumnDef<CartItem>[] = [
        {
            accessorKey: '',
            header: 'Product',
            cell: info => {
                const cartItem = info.row.original
                return (
                    <Flex alignItems={"center"} gap={6}>
                        <AppImage
                            width={10}
                            height={10}
                            src={cartItem?.product?.image}
                            alt={cartItem?.product?.title}
                        />
                        <AppTypography fontSize={16} color={"white"}>{cartItem?.product?.title}</AppTypography>
                    </Flex>
                )
            }
        },
        {
            accessorKey: '',
            header: 'Color',
            cell: info => {
                const cartItem = info.row.original
                return cartItem?.options?.color?.caption || 'N/A'
            }
        },
        {
            accessorKey: '',
            header: 'Size',
            cell: info => {
                const cartItem = info.row.original
                return cartItem?.options?.size?.caption || 'N/A'
            }
        },
        {
            accessorKey: '',
            header: 'Quantity',
            cell: info => {
                const cartItem = info.row.original
                return cartItem?.options?.quantity || 'N/A'
            }
        },
        {
            accessorKey: '',
            header: 'Uint price',
            cell: info => {
                const cartItem = info.row.original
                return cartItem?.totals?.priceItem || 'N/A'
            }
        }
    ]

    return (
        <>
            <Table
                columns={columns}
                data={cartItems || []}
                footerContent={
                    <TextButton onClick={onOpen}>
                        <AppIcons.BlackPlus />
                        Add product
                    </TextButton>
                }
            />
            {isOpen && <InvoiceProductModal isOpen={isOpen} onClose={onClose} />}
        </>
    )
}