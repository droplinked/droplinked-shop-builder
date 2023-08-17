import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'

function ProductType() {
    const { state: { pod_blank_product_id, publish_product }, productID, methods: { updateState }, loading, store: { state: { product_types } } } = useContext(productContext)

    const items = useMemo(() => product_types.length ? product_types.map((el: any) => ({
        caption: el.title,
        value: el._id
    })) : [], [product_types])

    const getDetail = useMemo(() => {
        if (product_types.length) return product_types.find(el => el._id === pod_blank_product_id)
        return null
    }, [pod_blank_product_id, product_types])

    const change = useCallback((e) => {
        const value = e.target.value
        updateState("pod_blank_product_id", value)
        updateState("sku", [])
        updateState("artwork", null)
        updateState("artwork2", null)
        updateState("artwork_position", null)
        updateState("artwork2_position", null)
        updateState("m2m_services", [])
        updateState("m2m_positions", [])
        updateState("positions", [])
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
    }, [product_types])

    return (
        <VStack align="stretch">
            <Box position={"relative"}>
                <AppSelectBox
                    label="Product Type"
                    name="product_type"
                    isDisabled={Boolean(productID) && publish_product}
                    items={items}
                    isRequired
                    loading={loading}
                    value={pod_blank_product_id}
                    onChange={change}
                />
            </Box>
            {getDetail && (
                <Flex gap={3} padding="20px" borderRadius="8px" backgroundColor="#171717">
                    <Box width="fit-content">
                        <AppImage width="80px" height="100px" src={getDetail?.image} />
                    </Box>
                    <VStack width="100%" align="stretch" color="#777">
                        <AppTypography size='14px'>{getDetail?.description}</AppTypography>
                        <AppTypography size='14px'>{getDetail?.fabric_comp}</AppTypography>
                    </VStack>
                </Flex>
            )}
        </VStack>
    )
}

export default ProductType