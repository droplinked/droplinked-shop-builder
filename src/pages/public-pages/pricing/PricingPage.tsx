import { Box, Flex } from '@chakra-ui/react'
import PlansTable from 'pages/subscription-plans/components/comparison-table'
import Plans from 'pages/subscription-plans/components/plan-cards/Plans'
import React from 'react'

function PricingPage() {
    return (
        <Flex justifyContent={"center"}>
            <Box
                width="90%"
                maxWidth="1400px"
                paddingInline={{ base: "16px", sm: "28px" }}
                paddingBlock={120}
                display={"flex"}
                flexDirection={"column"}
                gap={"1rem"}
            >
                <Plans />
                <Box mt={"3rem"}>
                    <PlansTable />
                </Box>
            </Box>
        </Flex>
    )
}

export default PricingPage