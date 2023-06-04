import { Box } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { IproviderIDService } from 'lib/apis/pod/interfaces'
import { providerIDService, providersService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

function ProductType() {
    const { mutate, data } = useMutation((params: IproviderIDService) => providerIDService(params))
    const { state: { prodviderID, pod_blank_product_id }, methods: { updateState }, loading } = useContext(productContext)

    useEffect(() => mutate({ prodviderID }), [prodviderID])

    // Set default pod_blank_product_id 
    useEffect(() => items && items.length && updateState("pod_blank_product_id", items[0].value), [data])

    const items = useMemo(() => data?.data?.data ? data?.data?.data.map((el: any) => ({
        caption: el.category,
        value: el._id
    })) : [], [data])

    return (
        <Box position={"relative"}>
            <AppSelectBox
                label="Product Type"
                name="product_type"
                items={items}
                placeholder="Select..."
                isRequired
                loading={loading}
                value={pod_blank_product_id}
                onChange={(e) => {
                    updateState("pod_blank_product_id", e.target.value)
                    updateState("sku", [])
                    updateState("properties", [])
                }}
            />
        </Box>
    )
}

export default ProductType