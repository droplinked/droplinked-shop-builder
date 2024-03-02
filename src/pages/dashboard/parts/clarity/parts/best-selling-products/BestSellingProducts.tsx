import { Flex } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import clarityContext from '../../context'

function BestSellingProducts() {
    const { isLoading, clarityData } = useContext(clarityContext)

    return (
        <AppCard>
            <Flex direction={"column"} gap={1}>
                <AppTypography fontSize={16} color={"#fff"}>Top Countries</AppTypography>

            </Flex>
        </AppCard>
    )
}

export default BestSellingProducts