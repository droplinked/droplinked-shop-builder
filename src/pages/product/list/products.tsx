import { useDisclosure } from '@chakra-ui/hooks'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import useCollections from 'functions/hooks/useCollections/useCollections'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { Collection } from 'lib/apis/collection/interfaces'
import { productServices } from 'lib/apis/product/productServices'
import { useUpdateShopLegalUsage } from 'lib/stores/app/appStore'
import { capitalizeFirstLetter } from 'lib/utils/helpers/helpers'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ProductListModel from './model'
import ConfirmDeleteAll from './parts/deleteAll/ConfirmDeleteAll'
import ProductEmpty from './parts/empty/ProductEmpty'
import ImportProductModal from './parts/import-product-modal/ImportProductModal'
import ProductReorderModal from './parts/productReorderModal/ProductReorderModal'

function Products() {
    const queryClient = useQueryClient()
    const refetchProducts = () => queryClient.invalidateQueries({ queryKey: ["product-list"] })
    const { shopRoute } = useCustomNavigate()
    const { isFetching: isFetchingCollections, data: collectionsData } = useCollections()
    const updateShopLegalUsage = useUpdateShopLegalUsage()
    const [searchParams] = useSearchParams()
    const pageNumber = useMemo(() => parseInt(searchParams.get("page")) || 1, [searchParams])
    const filter = useMemo(() => searchParams.get("filter"), [searchParams])
    const { isFetching, data } = useQuery({
        queryKey: ["product-list", { pageNumber, filter }],
        queryFn: () => productServices({ limit: 15, page: pageNumber, filter }),
        onSuccess: (data) => updateShopLegalUsage(data.data.data.legalUsage)
    })
    const products = data?.data?.data
    const location = useLocation()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { refactorData } = ProductListModel
    const [selectedProducts, setSelectedProducts] = useState([])
    const productReorderModal = useDisclosure()
    const importProductModal = useDisclosure()

    const rows = useMemo(() => {
        return data ? refactorData({ data: products?.data, fetch: refetchProducts }) : []
    }, [products, refetchProducts])

    const updateFilters = useCallback((key: string, value: string) => {
        const filter = `${key}:${value}`
        searchParams.set("filter", filter)
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }, [searchParams, location])

    const buttons = useMemo(() => {
        const data: any = [
            { caption: "Add Product", to: `${shopRoute}/products/types` },
            { caption: "Reorder Products", onClick: productReorderModal.onOpen, buttonProps: { variant: "outline" } },
            { caption: "Import", onClick: importProductModal.onOpen, buttonProps: { variant: "outline" } }
        ]

        if (selectedProducts.length) data.push({
            caption: `Delete Products (${selectedProducts.length})`,
            onClick: onOpen,
            buttonProps: { variant: "outline", color: "red.300" }
        })

        return data
    }, [selectedProducts])

    return (
        <>
            <AppDataGrid
                loading={isFetching || isFetchingCollections}
                buttons={buttons}
                rows={rows}
                checkbox={{
                    state: selectedProducts,
                    update: (value) => setSelectedProducts(value)
                }}
                filters={[
                    {
                        title: "Collections",
                        list: collectionsData?.data?.map((collection: Collection) => ({
                            title: collection.title,
                            onClick: () => updateFilters("productCollectionID", collection._id),
                            isActive: searchParams.get("filter") === `productCollectionID:${collection._id}`
                        })) || []
                    },
                    {
                        title: "Status",
                        list: ["PUBLISHED", "DRAFTED"].map(el => ({
                            title: capitalizeFirstLetter(el),
                            onClick: () => updateFilters("publish_status", el),
                            isActive: searchParams.get("filter") === `publish_status:${el}`
                        }))
                    }
                ]}
                search={{
                    onChange: (e) => updateFilters("title", e.target.value),
                    value: searchParams.get("filter") && searchParams.get("filter").split(':')[0] === "title" ? searchParams.get("filter").split(':')[1] : ''
                }}
                empty={<ProductEmpty />}
                pagination={{
                    lastPage: products?.totalPages ? parseInt(products?.totalPages) : 1,
                    current: pageNumber,
                    nextPage: products?.hasNextPage || false,
                    prevPage: products?.hasPreviousPage || false
                }}
            />

            {isOpen &&
                <ConfirmDeleteAll
                    close={onClose}
                    open={isOpen}
                    productIDs={selectedProducts}
                    fetch={() => {
                        refetchProducts()
                        setSelectedProducts([])
                    }}
                />
            }

            {productReorderModal.isOpen &&
                <ProductReorderModal
                    isOpen={productReorderModal.isOpen}
                    close={() => {
                        productReorderModal.onClose()
                        refetchProducts()
                    }}
                />
            }

            <ImportProductModal isOpen={importProductModal.isOpen} closeModal={importProductModal.onClose} />
        </>
    )
}

export default Products