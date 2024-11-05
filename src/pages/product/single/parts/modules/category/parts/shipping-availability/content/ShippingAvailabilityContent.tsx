import { Box, Circle, Flex, PopoverBody } from '@chakra-ui/react'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import { getPODShippingAvailability } from 'lib/apis/product/productServices'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'

export default function ShippingAvailabilityContent() {
    const { state: { pod_blank_product_id } } = useContext(productContext)
    const { data, isLoading } = useQuery({
        queryKey: ["POD-shipping-availability", pod_blank_product_id],
        queryFn: () => getPODShippingAvailability(pod_blank_product_id)
    })
    const regions = data?.data?.data || []

    return (
        <PopoverBody padding={6}>
            <Box border="1px solid #292929" borderRadius={8}>
                <AppTypography
                    fontSize={16}
                    fontWeight={700}
                    color="#fff"
                    padding="16px 24px"
                    borderBottom="inherit"
                >
                    Available Shipping Regions
                </AppTypography>

                <Flex
                    justifyContent={isLoading ? "center" : "start"}
                    flexWrap="wrap"
                    gap={4}
                    padding="32px 24px"
                >
                    {isLoading ?
                        <LoadingComponent /> :
                        regions.map((region, index) =>
                            <Region key={index} region={region} isLastOne={index === regions.length - 1} />
                        )
                    }
                </Flex>
            </Box>
        </PopoverBody>
    )
}

function Region({ region, isLastOne }) {
    return (
        <Flex alignItems="center" gap={3}>
            <AppTypography fontSize={16} color="#B1B1B1">{region}</AppTypography>
            {!isLastOne && <Circle size={1} bgColor="#3C3C3C" />}
        </Flex>
    )
}