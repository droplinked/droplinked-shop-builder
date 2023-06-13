import { Box } from '@chakra-ui/react'
import AppLimitCharacter from 'components/common/form/limitCharacter/AppLimitCharacter'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppInput from 'components/common/form/textbox/AppInput'
import { providersService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

function ProductPovProvider() {
    const { data, isLoading } = useQuery({
        queryKey: "PovProvider",
        queryFn: providersService,
        refetchOnWindowFocus: false
    })
    const { state: { prodviderID, publish_product }, productID, methods: { updateState }, loading } = useContext(productContext)

    const items = useMemo(() => data?.data?.data ? data?.data?.data.map((el: any) => ({
        caption: el,
        value: el
    })) : [], [data])

    return (
        <Box position={"relative"}>
            <AppSelectBox
                isDisabled={Boolean(productID) && publish_product}
                label="POD Provider"
                name="podProvider"
                items={items}
                isRequired
                loading={loading && !isLoading}
                value={prodviderID}
                onChange={(e) => updateState("prodviderID", e.target.value)}
            />
        </Box>
    )
}

export default ProductPovProvider