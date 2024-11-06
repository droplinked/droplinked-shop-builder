import { Flex, Spinner, Td, Tr, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import { DeleteInvoiceProduct } from 'lib/apis/invoice/interfaces'
import { removeProductFromCartService } from 'lib/apis/invoice/invoiceServices'
import TextButton from 'pages/invoice-management/components/TextButton'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import React, { useMemo } from 'react'
import { useMutation } from 'react-query'
import useInvoiceStore, { CartItem } from '../../store/invoiceStore'
import ProductTitleCell from './ProductTitleCell'
import InvoiceProductModal from './product-modal/InvoiceProductModal'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'

interface SerializedCartItem {
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
            <Table.Root columns={columns} hasActionColumn={hasActionColumn}>
                <Table.Head data={cartItems} />
                <Table.Body>
                    {groupedCartItems.map((cartItem, index) => (
                        <CartItemRow key={index} cartItem={cartItem} hasActionColumn={hasActionColumn} />
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

function CartItemRow({ cartItem, hasActionColumn }: { cartItem: SerializedCartItem, hasActionColumn?: boolean }) {
    const { product, skus } = cartItem
    const { shop: { currency } } = useAppStore();
    return (
        <>
            {skus.map((sku, index) => (
                <Tr
                    position={"relative"}
                    key={index}
                    borderBottom={index === skus.length - 1 ? 'default' : 'none !important'}
                >
                    <Td>
                        <Flex alignItems="center" gap={3} opacity={index === 0 ? 1 : 0}>
                            <AppImage src={product.m2m_preview || product.skuImage || product.image} width={12} height={12} />
                            <ProductTitleCell title={product.title} wordLimit={10} />
                        </Flex>
                    </Td>
                    <Td>{sku.options?.color?.caption || '-'}</Td>
                    <Td>{sku.options?.size?.caption || '-'}</Td>
                    <Td>{sku.options?.quantity || '-'}</Td>
                    <Td>{`${currency?.symbol}${currencyConvertion(sku.totals?.priceItem, currency?.conversionRateToUSD, false)}  ${currency?.abbreviation}` || '-'}</Td>
                    {hasActionColumn && <SKURemoveButton itemId={sku._id} />}
                </Tr>
            ))}
        </>
    )
}

function SKURemoveButton({ itemId }) {
    const { cart, updateCart } = useInvoiceStore()
    const { isLoading, mutateAsync: removeProduct } = useMutation({
        mutationFn: (data: DeleteInvoiceProduct) => removeProductFromCartService(data),
        onSuccess: (response) => updateCart(response.data)
    })

    return (
        <Td>
            {isLoading ?
                <Spinner size={'sm'} color={"#FF2244"} /> :
                <button
                    type='button'
                    onClick={() => removeProduct({ cartId: cart._id, itemId })}
                >
                    <AppIcons.RedTrash />
                </button>
            }
        </Td>
    )
}