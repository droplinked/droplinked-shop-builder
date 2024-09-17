import { Button, Flex, Td, Tr, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { productServices } from 'lib/apis/product/productServices'
import Input from 'pages/invoice-management/components/Input'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import ProductTitleCell from '../ProductTitleCell'
import VariantsDropdown from './VariantsDropdown'

export default function ProductTable({ debouncedSearchTerm, cart, setCart }) {
    const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => productServices({ page: pageParam, limit: 15, filter: debouncedSearchTerm }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
        refetchOnWindowFocus: false
    })
    const products = data?.pages.flatMap(page => page.data.data.data) || []

    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: 'Product' },
        { accessorKey: '', header: 'Variants' },
        { accessorKey: 'quantity', header: 'Quantity' },
        { accessorKey: 'skuIDs', header: 'Unit price' }
    ]

    return (
        <Table.Root
            columns={columns}
            hasActionColumn={true}
            infiniteScroll={{ dataLength: products.length, next: fetchNextPage, hasMore: hasNextPage }}
        >
            <Table.Head data={products} columns={columns} />
            <Table.Body isLoading={isFetching}>
                {products.map((product, index) =>
                    <ProductRow key={index} product={product} cart={cart} setCart={setCart} />)}
            </Table.Body>
        </Table.Root>
    )
}

function ProductRow({ product, cart, setCart }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [quantity, setQuantity] = useState(0)
    const [skuId, setSkuId] = useState("")
    const { showToast } = useAppToast()
    const isDigitalProduct = product.product_type === "DIGITAL"

    const handleAddToCart = (skuId, quantity) => {
        if (skuId && quantity) {
            if (cart.find(item => item.skuId === skuId)) {
                setCart(prevCart => prevCart.map(item => {
                    return item.skuId === skuId ?
                        { ...item, quantity: item.quantity + Number(quantity) } :
                        item
                }))
            }
            else setCart(prevCart => ([...prevCart, { skuId, quantity: Number(quantity) }]))
            setQuantity(0)
            setSkuId("")
            showToast({ type: "success", message: "Product added to cart" })
        }
        else {
            const message = isDigitalProduct ?
                "Quantity required. Please enter a value before adding" :
                "Please select both SKU and quantity before adding"
            showToast({ type: "info", message })
        }
    }

    const toggleDropdown = () => {
        if (isDigitalProduct) return
        onOpen()
    }

    useEffect(() => {
        if (isDigitalProduct) setSkuId(product.skuIDs[0]._id)
    }, [product, setSkuId])

    return (
        <Tr _hover={{ "button": { opacity: 1 } }}>
            <Td>
                <Flex alignItems={"center"} gap={6}>
                    <AppImage src={product.media[0]?.url} width={12} height={12} />
                    <ProductTitleCell title={product.title} wordLimit={35} />
                </Flex>
            </Td>
            <Td>
                <VariantsDropdown
                    selectedVariant={skuId}
                    onSelectVariant={(selectedSku) => setSkuId(selectedSku)}
                    product={product}
                    isOpen={isOpen}
                    onOpen={toggleDropdown}
                    onClose={onClose}
                />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        width: "68px",
                        type: "number",
                        value: quantity || "",
                        min: 1,
                        fontSize: 14,
                        color: "#878787",
                        placeholder: "1",
                        _focus: { borderColor: "#878787" },
                        onChange: (e) => setQuantity(parseInt(e.target.value)),
                        onKeyDown: (e) => {
                            const invalidKeys = ['+', '-', 'e']
                            if (invalidKeys.includes(e.key)) e.preventDefault()
                        }
                    }}
                />
            </Td>
            <Td>
                <AppTypography fontSize={16} color={"#7B7B7B"}>${product.skuIDs?.[0]?.price}</AppTypography>
            </Td>
            <Td>
                <Button
                    size={"sm"}
                    border={"1px solid #2BCFA1"}
                    bg={"none"}
                    fontSize={12}
                    fontWeight={500}
                    color={"#2BCFA1"}
                    opacity={0}
                    transition="opacity 0.2s"
                    _hover={{}}
                    _focusVisible={{}}
                    _active={{}}
                    onClick={() => handleAddToCart(skuId, quantity)}
                >
                    Add
                </Button>
            </Td>
        </Tr>
    )
}