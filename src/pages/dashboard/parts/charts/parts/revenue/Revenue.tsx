import { Box, Flex, Icon, VStack } from '@chakra-ui/react'
import AppBadge from 'components/common/badge/AppBadge'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import { FaLongArrowAltUp } from "react-icons/fa";
import dashboardChartsContext from '../../context';

function Revenue() {


    return (
        <VStack align="stretch" spacing="12px">
            <AppTypography fontSize="16px">Revenue</AppTypography>
            <Flex alignItems="center" gap="12px">
                <AppTypography fontSize="32px" fontWeight="600">$6823.96</AppTypography>
                <Flex backgroundColor="rgba(128, 237, 207, 0.10)" gap="1px" padding="10px" borderRadius="100px" alignItems="center">
                    <Icon as={FaLongArrowAltUp} height="13px" fill="#2BCFA1" />
                    <AppTypography fontSize="16px" color="#2BCFA1" position="relative" top="1px">2.45%</AppTypography>
                </Flex>
            </Flex>
            <AppTypography fontSize="12px" color="#C4C4C4">Your revenue from <strong>January 2022</strong> to <strong>December 2023</strong></AppTypography>
        </VStack>
    )
}

export default Revenue