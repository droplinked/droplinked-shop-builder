import { Button, Flex, Td, Tr } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { productServices } from 'lib/apis/product/productServices'
import Input from 'pages/invoice-management/components/Input'
import Table from 'pages/invoice-management/components/TableV2'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import VariantsDropdown from './VariantsDropdown'

export default function ProductTable({ debouncedSearchTerm, setCart }) {
    const { isFetching, isError, data, refetch } = useQuery({
        queryFn: () => productServices({ page: 1, limit: 15, filter: debouncedSearchTerm }),
        queryKey: ["products", debouncedSearchTerm],
        refetchOnWindowFocus: false
    })
    const products = data?.data?.data?.data || []

    useEffect(() => { refetch() }, [debouncedSearchTerm])

    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: 'Product' },
        { accessorKey: '', header: 'Variants' },
        { accessorKey: 'quantity', header: 'Quantity' },
        { accessorKey: 'skuIDs', header: 'Unit price' }
    ]

    return (
        <Table.Root>
            <Table.Head columns={columns} data={products} hasActionColumn={true} />
            <Table.Body columns={columns} isLoading={isFetching} hasActionColumn={true} >
                {products.map((product, index) => <ProductRow key={index} product={product} setCart={setCart} />)}
            </Table.Body>
        </Table.Root>
    )
}

function ProductRow({ product, setCart }) {
    const [quantity, setQuantity] = useState(0)
    const [skuId, setSkuId] = useState("")
    const { showToast } = useAppToast()

    // Handler for when the Add button is clicked
    const handleAddToCart = (skuId, quantity) => {
        if (skuId && quantity) {
            setCart(prevCart => ([
                ...prevCart,
                { skuId, quantity: Number(quantity) }
            ]))
            setQuantity(0)
            setSkuId("")
            showToast({ type: "success", message: "Product added to cart" })
        }
        else showToast({ type: "info", message: "Please select SKU and quantity before adding" })
    }

    return (
        <Tr _hover={{ "button": { opacity: 1 } }}>
            <Td>
                <Flex alignItems={"center"} gap={6}>
                    <AppImage src={product.media[0]?.url} width={12} height={12} />
                    <AppTypography fontSize={16} color={"white"}>{product.title}</AppTypography>
                </Flex>
            </Td>
            <Td>
                <VariantsDropdown
                    selectedVariant={skuId}
                    onSelectVariant={(selectedSku) => setSkuId(selectedSku)}
                    product={product}
                />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        width: "68px",
                        value: quantity || "",
                        type: "number",
                        fontSize: 14,
                        color: "#878787",
                        placeholder: "1",
                        _focus: { borderColor: "#878787" },
                        onChange: (e) => setQuantity(parseInt(e.target.value))
                    }}
                />
            </Td>
            <Td>
                <AppTypography fontSize={16} color={"#7B7B7B"}>${product.skuIDs?.[0]?.price}</AppTypography>
            </Td>
            <Td>
                <Button
                    border={"1px solid #2BCFA1"}
                    color={"#2BCFA1"}
                    bg={"none"}
                    size={"sm"}
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