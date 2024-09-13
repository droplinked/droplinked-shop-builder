import { Button, Flex } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { productServices } from 'lib/apis/product/productServices'
import Input from 'pages/invoice-management/components/Input'
import Table from 'pages/invoice-management/components/Table'
import React, { memo, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import VariantsDropdown from './VariantsDropdown'

function ProductTable({ debouncedSearchTerm, cart, setCart }) {
    // State to track selected SKUs and quantities for each product
    const [selectedVariants, setSelectedVariants] = useState({})
    const [quantities, setQuantities] = useState({})
    const { showToast } = useAppToast()
    const { isFetching, isError, data, refetch } = useQuery({
        queryFn: () => productServices({ page: 1, limit: 15, filter: debouncedSearchTerm }),
        queryKey: ["products", debouncedSearchTerm],
        refetchOnWindowFocus: false
    })
    const products = data?.data?.data?.data || []

    useEffect(() => { refetch() }, [debouncedSearchTerm])

    // Handler to track selected SKU
    const handleVariantSelect = (productId, selectedSku) =>
        setSelectedVariants(prev => ({ ...prev, [productId]: selectedSku }))

    // Handler to track quantity input
    const handleQuantityChange = (productId, quantity) =>
        setQuantities(prev => ({ ...prev, [productId]: quantity }))

    // Handler for when the Add button is clicked
    const handleAddToCart = (productId) => {
        const selectedSku = selectedVariants[productId]
        const quantity = quantities[productId]

        if (selectedSku && quantity) {
            setCart(prevCart => ([
                ...prevCart,
                { skuId: selectedSku, quantity: Number(quantity) }
            ]))

            setSelectedVariants({})
            setQuantities({})
            showToast({ type: "success", message: "Product added to cart" })
        }
        else showToast({ type: "info", message: "Please select SKU and quantity before adding" })
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: '',
            header: 'Product',
            cell: info => {
                const product = info.row.original
                return (
                    <Flex alignItems={"center"} gap={6}>
                        <AppImage src={product.media[0]?.url} width={12} height={12} />
                        <AppTypography fontSize={16} color={"white"}>{product.title}</AppTypography>
                    </Flex>
                )
            }
        },
        {
            accessorKey: '',
            header: 'Variants',
            cell: info => {
                const product = info.row.original
                return (
                    <VariantsDropdown
                        selectedVariant={selectedVariants[product._id]}
                        onSelectVariant={(selectedSku) => handleVariantSelect(product._id, selectedSku)}
                        product={product}
                    />
                )
            }
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: info => {
                const product = info.row.original
                return (
                    <Input
                        inputProps={{
                            width: "68px",
                            type: "number",
                            fontSize: 14,
                            color: "#878787",
                            placeholder: "1",
                            value: quantities[product._id] || "",
                            onChange: (e) => handleQuantityChange(product._id, e.target.value),
                            _focus: { borderColor: "#878787" }
                        }}
                    />
                )
            }
        },
        {
            accessorKey: 'skuIDs',
            header: 'Unit price',
            cell: info => {
                const sku = info.getValue()?.[0]
                return sku ? `$${sku.price}` : 'N/A'
            }
        }
    ]

    const renderActions = (row: any) => {
        return (
            <Button
                border={"1px solid #2BCFA1"}
                color={"#2BCFA1"}
                bg={"none"}
                size={"sm"}
                opacity={0}
                transition="opacity 0.3s ease"
                cursor="pointer"
                _hover={{ opacity: 1 }}
                _active={{}}
                _focusVisible={{}}
                onClick={() => handleAddToCart(row._id)}
            >
                Add
            </Button>
        )
    }

    return <Table columns={columns} data={products} isLoading={isFetching} renderActions={renderActions} />
}

export default memo(ProductTable)
