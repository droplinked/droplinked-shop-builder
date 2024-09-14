import { Button, Flex, Td, Tr, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import TextButton from 'pages/invoice-management/components/TextButton'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import React, { useMemo } from 'react'
import useInvoiceStore, { CartItem } from '../../store/invoiceStore'
import InvoiceProductModal from './product-modal/InvoiceProductModal'

interface SerializedCartItem {
    product: CartItem['product']
    skus: CartItem[]
}

export default function InvoiceProductTable() {
    const cartItems = useInvoiceStore(state => state.cart.items)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const groupedCartItems = useMemo(() => groupCartItemsByProduct(cartItems), [cartItems])

    const columns: ColumnDef<CartItem>[] = [
        { accessorKey: 'product', header: 'Product' },
        { accessorKey: 'color', header: 'Color' },
        { accessorKey: 'size', header: 'Size' },
        { accessorKey: 'quantity', header: 'Quantity' },
        { accessorKey: 'unitPrice', header: 'Unit Price' }
    ]

    return (
        <>
            <Table.Root columns={columns} hasActionColumn={true}>
                <Table.Head data={cartItems} />
                <Table.Body>
                    {groupedCartItems.map((cartItem, index) => (
                        <CartItemRow key={index} cartItem={cartItem} />
                    ))}
                </Table.Body>
                <Table.Footer>
                    <TextButton paddingBlock={3} paddingInline={4} onClick={onOpen}>
                        <AppIcons.BlackPlus />
                        Add product
                    </TextButton>
                </Table.Footer>
            </Table.Root>
            {isOpen && <InvoiceProductModal isOpen={isOpen} onClose={onClose} />}
        </>
    )
}

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

function CartItemRow({ cartItem }: { cartItem: SerializedCartItem }) {
    const { product, skus } = cartItem

    return (
        <>
            {skus.map((sku, index) => (
                <Tr
                    key={index}
                    borderBottom={index === skus.length - 1 ? 'default' : 'none !important'}
                >
                    <Td>
                        <Flex alignItems="center" gap={6} opacity={index === 0 ? 1 : 0}>
                            <AppImage src={product.image} width={12} height={12} />
                            <AppTypography fontSize={16} color="white">
                                {product.title}
                            </AppTypography>
                        </Flex>
                    </Td>
                    <Td>{sku.options?.color?.caption || 'N/A'}</Td>
                    <Td>{sku.options?.size?.caption || 'N/A'}</Td>
                    <Td>{sku.options?.quantity || 'N/A'}</Td>
                    <Td>{sku.totals?.priceItem || 'N/A'}</Td>
                    <Td>
                        <Button
                            bg="none"
                            _hover={{ bg: 'none' }}
                            _active={{ bg: 'none' }}
                            _focusVisible={{ bg: 'none' }}
                        >
                            <AppIcons.RedTrash />
                        </Button>
                    </Td>
                </Tr>
            ))}
        </>
    )
}