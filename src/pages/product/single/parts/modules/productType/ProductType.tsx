import { Box } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { IproviderIDService } from 'lib/apis/pod/interfaces'
import { providerIDService, providersService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

function ProductType() {
    const { mutate, data, isLoading } = useMutation((params: IproviderIDService) => providerIDService(params))
    const { state: { prodviderID, product_type, pod_blank_product_id, publish_product }, productID, methods: { updateState }, loading } = useContext(productContext)

    useEffect(() => mutate({ prodviderID }), [prodviderID])

    // Set default pod_blank_product_id 
    useEffect(() => !pod_blank_product_id && items && items.length && updateState("pod_blank_product_id", items[0].value), [data, pod_blank_product_id])

    const items = useMemo(() => data?.data?.data ? data?.data?.data.map((el: any) => ({
        caption: el.category,
        value: el._id
    })) : [], [data])
    console.log("isLoading", isLoading);

    return (
        <Box position={"relative"}>
            <AppSelectBox
                label="Product Type"
                name="product_type"
                isDisabled={Boolean(productID) && publish_product}
                items={items}
                placeholder="Select..."
                isRequired
                loading={loading && !isLoading}
                value={pod_blank_product_id}
                onChange={(e) => {
                    updateState("pod_blank_product_id", e.target.value)
                    if (product_type === "PRINT_ON_DEMAND") {
                        updateState("sku", [])
                        updateState("properties", [
                            {
                                "value": "62a989ab1f2c2bbc5b1e7153",
                                "title": "Color",
                                "items": []
                            },
                            {
                                "value": "62a989e21f2c2bbc5b1e7154",
                                "title": "Size",
                                "items": []
                            }
                        ])
                    } else {
                        updateState("sku", [])
                        updateState("properties", [])
                    }
                }}
            />
        </Box>
    )
}

export default ProductType