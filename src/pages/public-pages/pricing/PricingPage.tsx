import { Flex } from '@chakra-ui/react'
import Plans from 'pages/subscription-plans/_components/plans/Plans'
import React from 'react'

function PricingPage() {
    return (
        <Flex justifyContent={"center"}>
            <Flex
                width={{ base: "100%", lg: "90%" }}
                maxWidth="1400px"
                direction="column"
                alignItems={"center"}
                gap={{ base: 150, md: 200 }}
                paddingInline={{ base: "16px", sm: "28px" }}
                paddingBlock={120}
            >
                <Plans showBuyButton={false} />
            </Flex>
        </Flex>
    )
}

export default PricingPage