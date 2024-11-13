import { useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import TextButton from 'pages/invoice-management/components/TextButton'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import useInvoiceStore, { CartItem } from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React from 'react'
import InvoiceProductModal from '../product-modal/InvoiceProductModal'
import ItemRow from './components/ItemRow'

export interface SerializedCartItem {
    product: CartItem['product']
    skus: CartItem[]
}

interface Props {
    invoice?: any;
    hasActionColumn?: boolean
    hasFooter?: boolean
}

export default function InvoiceProductTable({ invoice, hasActionColumn = true, hasFooter = true }: Props) {
    let cartItems = useInvoiceStore(state => state.cart.items)
    if (invoice) cartItems = invoice.items
    const { isOpen, onOpen, onClose } = useDisclosure()
    const groupedCartItems = groupCartItemsByProduct(cartItems)

    const columns: ColumnDef<CartItem>[] = [
        { accessorKey: 'product', header: 'Product' },
        { accessorKey: 'color', header: 'Color' },
        { accessorKey: 'size', header: 'Size' },
        { accessorKey: 'quantity', header: 'Quantity' },
        { accessorKey: 'unitPrice', header: 'Unit Price' }
    ]

    return (
        <>
            <Table.Root columns={columns} hasActionColumn={hasActionColumn}>
                <Table.Head data={cartItems} />
                <Table.Body>
                    {groupedCartItems.map((cartItem, index) => (
                        <ItemRow key={index} cartItem={cartItem} hasActionColumn={hasActionColumn} />
                    ))}
                </Table.Body>
                {hasFooter && (
                    <Table.Footer>
                        <TextButton paddingBlock={3} paddingInline={4} onClick={onOpen}>
                            <AppIcons.BlackPlus />
                            Add product
                        </TextButton>
                    </Table.Footer>
                )}
            </Table.Root>
            {isOpen && <InvoiceProductModal isOpen={isOpen} onClose={onClose} />}
        </>
    )
}

// Group cart items by product because the product table can have multiple rows for each product
function groupCartItemsByProduct(cartItems: CartItem[]) {
    const groupedItems = new Map<string, SerializedCartItem>()

    cartItems?.forEach(item => {
        const productId = item.product._id
        if (!groupedItems.has(productId)) {
            groupedItems.set(productId, { product: item.product, skus: [] })
        }
        groupedItems.get(productId)?.skus.push(item)
    })
    return Array.from(groupedItems.values())
}