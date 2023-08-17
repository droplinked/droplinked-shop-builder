import { Box } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { providersService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import { useQuery } from 'react-query'

function ProductPovProvider() {
    const { data, isLoading } = useQuery({
        queryKey: "PovProvider",
        queryFn: providersService,
        refetchOnWindowFocus: false
    })
    const { state: { prodviderID, publish_product, product_type }, productID, methods: { updateState }, loading } = useContext(productContext)

    const items = useMemo(() => data?.data?.data ? data?.data?.data.map((el: any) => ({
        caption: el,
        value: el
    })) : [], [data])

    const change = useCallback(async (e) => {
        updateState("prodviderID", e.target.value)
        updateState("properties", [])
        updateState("sku", [])
        updateState("artwork", null)
        updateState("artwork2", null)
        updateState("artwork2_position", null)
        updateState("artwork_position", null)
        updateState("positions", null)
    }, [])

    return (
        <>
            {product_type === "PRINT_ON_DEMAND" && (
                <Box position={"relative"}>
                    <AppSelectBox
                        isDisabled={Boolean(productID) && publish_product}
                        label="POD Provider"
                        name="podProvider"
                        items={items}
                        isRequired
                        loading={loading && !isLoading}
                        value={prodviderID}
                        onChange={change}
                    />
                </Box>
            )}
        </>
    )
}

export default ProductPovProvider