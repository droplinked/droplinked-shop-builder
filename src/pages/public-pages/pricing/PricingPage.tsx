import { Box, Flex } from '@chakra-ui/react'
import Plans from 'pages/subscription-plans/_components/plans/Plans'
import React from 'react'

function PricingPage() {
    return (
        <Flex justifyContent={"center"}>
            <Box
                width="90%"
                maxWidth="1400px"
                paddingInline={{ base: "16px", sm: "28px" }}
                paddingBlock={120}
            >
                <Plans showBuyButton={false} />
            </Box>
        </Flex>
    )
}

export default PricingPage