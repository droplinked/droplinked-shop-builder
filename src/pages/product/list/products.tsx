import AppDataGrid from 'components/common/datagrid/DataGrid'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { IproductList } from 'lib/apis/product/interfaces'
import { productServices } from 'lib/apis/product/productServices'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ProductListModel from './model'
import ProductEmpty from './parts/empty/ProductEmpty'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import useHookStore from 'functions/hooks/store/useHookStore'
import { useDisclosure } from '@chakra-ui/hooks'
import ConfirmDeleteAll from './parts/deleteAll/ConfirmDeleteAll'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'

function Products() {
    const { data: { collection } } = useHookStore()
    const { mutate, isLoading, data } = useMutation((params: IproductList) => productServices(params))
    const [searchParams] = useSearchParams()
    const page = useMemo(() => parseInt(searchParams.get("page")), [searchParams]) || 1
    const products = useMemo(() => data?.data?.data, [data])
    const location = useLocation()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { refactorData } = ProductListModel
    const [States, setStates] = useState({
        checkboxes: []
    })
    const { shop } = useProfile()
    const { shopRoute } = useCustomNavigate()

    // Fetch service
    const fetch = useCallback(() => {
        const filter = searchParams.get("filter")
        mutate({ limit: 10, page: page, ...filter && { filter } })
    }, [page, searchParams])

    useEffect(() => fetch(), [mutate, page, searchParams])

    // Set search state

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? refactorData({
            data: products?.data,
            fetch,
        }) : []
    }, [products, fetch])

    // Update parametrs url 
    const updateFilters = useCallback((key: string, value: string) => {
        const filter = `${key}:${value}`
        if (searchParams.get("filter") === filter || !value) {
            searchParams.delete("filter")
        } else {
            searchParams.set("filter", filter)
            searchParams.set("page", "1")
        }
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }, [searchParams, location])

    // Handle delete button
    const buttons = useMemo(() => {
        const data: any = [
            {
                caption: "Add Product",
                to: `${shopRoute}/products/types`
            }
        ]
        if (States.checkboxes.length) data.push({
            caption: "Delete Products" + ` (${States.checkboxes.length})`,
            onClick: onOpen,
            buttonProps: {
                variant: "outline",
                color: "red.300"
            }
        })

        return data
    }, [States.checkboxes, shop])

    return (
        <>
            <AppDataGrid
                loading={isLoading}
                buttons={buttons}
                rows={rows}
                checkbox={{
                    state: States.checkboxes,
                    update: (value) => setStates(prev => ({ ...prev, checkboxes: value }))
                }}
                filters={[
                    {
                        title: "Collections",
                        list: collection.data ? collection.data.map(el => (
                            {
                                title: el?.title,
                                onClick: () => updateFilters("productCollectionID", el?._id),
                                isActive: searchParams.get("filter") === `productCollectionID:${el?._id}`
                            }
                        )) : []
                    },
                    {
                        title: "Status",
                        list: ["PUBLISHED", "DRAFTED"].map(el => ({
                            title: capitalizeFirstLetter(el),
                            onClick: () => updateFilters("publish_status", el),
                            isActive: searchParams.get("filter") === `publish_status:${el}`
                        }
                        ))
                    }
                ]}
                search={{
                    onChange: (e) => updateFilters("title", e.target.value),
                    value: searchParams.get("filter") && searchParams.get("filter").split(':')[0] === "title" ? searchParams.get("filter").split(':')[1] : ''
                }}
                empty={<ProductEmpty />}
                pagination={{
                    lastPage: products?.totalPages ? parseInt(products?.totalPages) : 1,
                    current: page,
                    nextPage: products?.hasNextPage || false,
                    prevPage: products?.hasPreviousPage || false
                }}
            />
            {isOpen && <ConfirmDeleteAll close={onClose} open={isOpen} productIDs={States.checkboxes} fetch={() => {
                fetch()
                setStates(prev => ({ ...prev, checkboxes: [] }))
            }} />}
        </>
    )
}

export default Products