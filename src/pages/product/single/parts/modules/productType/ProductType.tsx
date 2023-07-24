import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { IproviderIDService } from 'lib/apis/pod/interfaces'
import { providerIDService, providersService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

function ProductType() {
    const { mutate, data, isLoading } = useMutation((params: IproviderIDService) => providerIDService(params))
    const { state: { prodviderID, product_type, pod_blank_product_id, publish_product }, productID, methods: { updateState }, loading } = useContext(productContext)
    const [Details, setDetails] = useState(null)

    useEffect(() => mutate({ prodviderID }), [prodviderID])

    // Set default pod_blank_product_id 
    useEffect(() => !pod_blank_product_id && items && items.length && updateState("pod_blank_product_id", items[0].value), [data, pod_blank_product_id])

    const items = useMemo(() => data?.data?.data ? data?.data?.data.map((el: any) => ({
        caption: el.title,
        value: el._id
    })) : [], [data])

    useEffect(() => {
        if (pod_blank_product_id && data?.data?.data) {
            const type = data?.data?.data.find(el => el._id === pod_blank_product_id)
            setDetails(type)
        }
    }, [pod_blank_product_id, data])

    return (
        <VStack align="stretch">
            <Box position={"relative"}>
                <AppSelectBox
                    label="Product Type"
                    name="product_type"
                    isDisabled={Boolean(productID) && publish_product}
                    items={items}
                    isRequired
                    loading={loading && !isLoading}
                    value={pod_blank_product_id}
                    onChange={(e) => {
                        updateState("pod_blank_product_id", e.target.value)
                        updateState("sku", [])
                        updateState("artwork", null)
                        updateState("artwork2", null)
                        updateState("artwork_position", null)
                        updateState("artwork2_position", null)
                        updateState("m2m_services", [])
                        updateState("m2m_positions", [])
                        if (product_type === "PRINT_ON_DEMAND") {
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
            {Details && (
                <Flex gap={3} padding="20px" borderRadius="8px" backgroundColor="#171717">
                    <Box width="fit-content">
                        <AppImage width="80px" height="100px" src={Details?.image} />
                    </Box>
                    <VStack width="100%" align="stretch" color="#777">
                        <AppTypography size='14px'>{Details?.description}</AppTypography>
                        <AppTypography size='14px'>{Details?.fabric_comp}</AppTypography>
                    </VStack>
                </Flex>
            )}
        </VStack>
    )
}

export default ProductType