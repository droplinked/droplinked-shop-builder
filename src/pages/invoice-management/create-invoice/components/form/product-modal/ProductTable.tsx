import { Flex } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { productServices } from 'lib/apis/product/productServices'
import Input from 'pages/invoice-management/components/Input'
import Table from 'pages/invoice-management/components/Table'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import VariantsDropdown from './VariantsDropdown'

function ProductTable({ debouncedSearchTerm }) {
    // State to track selected SKUs and quantities for each product
    const [selectedVariants, setSelectedVariants] = useState({})
    const [quantities, setQuantities] = useState({})
    const [cart, setCart] = useState([]) // Stores the added items

    const { isFetching, isError, data, refetch } = useQuery({
        queryFn: () => productServices({ page: 1, limit: 15, filter: debouncedSearchTerm }),
        queryKey: ["products", debouncedSearchTerm],
        refetchOnWindowFocus: false
    })

    const products = data?.data?.data?.data || []

    useEffect(() => {
        refetch()
    }, [debouncedSearchTerm])

    // Handler to track selected SKU
    const handleVariantSelect = (productId, selectedSku) => {
        setSelectedVariants(prev => ({
            ...prev,
            [productId]: selectedSku
        }))
    }

    // Handler to track quantity input
    const handleQuantityChange = (productId, quantity) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: quantity
        }))
    }

    // Handler for when the Add button is clicked
    const handleAddToCart = (productId) => {
        const selectedSku = selectedVariants[productId]
        const quantity = quantities[productId]

        if (selectedSku && quantity) {
            const product = products.find(p => p.id === productId)
            setCart(prevCart => [
                ...prevCart,
                { productId, productTitle: product?.title, selectedSku, quantity }
            ])
        } else {
            alert("Please select SKU and quantity before adding.")
        }
    }

    const columns: ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: 'title',
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
            accessorKey: 'skuIDs',
            header: 'Variants',
            cell: info => {
                const product = info.row.original
                return (
                    <VariantsDropdown
                        selectedVariant={selectedVariants[product.id]}
                        onSelectVariant={(selectedSku) => handleVariantSelect(product.id, selectedSku)}
                        product={product}
                    />
                )
            }
        },
        {
            accessorKey: 'title',
            header: 'Quantity',
            cell: info => {
                const product = info.row.original
                return <Input
                    inputProps={{
                        width: "68px",
                        type: "number",
                        fontSize: 14,
                        placeholder: "1",
                        value: quantities[product.id] || "",
                        onChange: (e) => handleQuantityChange(product.id, e.target.value)
                    }}
                />
            }
        },
        {
            accessorKey: 'skuIDs',
            header: 'Unit price',
            cell: info => info.getValue()?.[0]?.price
        },
        // {
        //     accessorKey: '',
        //     header: '',
        //     cell: info => {
        //         const product = info.row.original
        //         return (
        //             <button onClick={() => handleAddToCart(product.id)}>
        //                 Add
        //             </button>
        //         )
        //     }
        // }
    ], [selectedVariants, quantities, products])

    return (
        <Table columns={columns} data={products} isLoading={isFetching} />
    )
}

export default memo(ProductTable)