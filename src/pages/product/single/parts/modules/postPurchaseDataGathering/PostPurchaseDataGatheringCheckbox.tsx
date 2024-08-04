import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { getShopInformationService } from 'lib/apis/shop/shopServices'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'

function PostPurchaseDataGatheringCheckbox() {
    const { isLoading, data } = useQuery({
        queryFn: getShopInformationService,
        refetchOnWindowFocus: false
    })
    const shopPostPurchaseDataGathering = data?.data.data.pre_purchase_data_fetch
    const { state: { pre_purchase_data_fetch }, methods: { updateState } } = useContext(productContext)

    const handleCheckboxChange = ({ currentTarget: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
        if (!shopPostPurchaseDataGathering && checked) return
        updateState('pre_purchase_data_fetch', checked)
    }

    return (
        <AppSkeleton isLoaded={!isLoading}>
            <Flex gap={3}>
                <AppSwitch
                    isDisabled={!shopPostPurchaseDataGathering}
                    onChange={handleCheckboxChange}
                    isChecked={pre_purchase_data_fetch} />
                <VStack align='stretch' color="#C2C2C2" spacing={1}>
                    <AppTypography fontSize='14px' fontWeight='bold'>Post-Purchase Data Gathering</AppTypography>
                    <AppTypography fontSize='14px'>Write a question to gather comment or specific information from customers before purchase!</AppTypography>
                </VStack>
            </Flex>
        </AppSkeleton>
    )
}

export default PostPurchaseDataGatheringCheckbox