import { Box, Flex } from '@chakra-ui/react'
import PlansTable from 'pages/subscription-plans/components/comparison-table'
import Plans from 'pages/subscription-plans/components/plan-cards/Plans'
import React from 'react'

export function meta() {
    return [
        { title: "Pricing & Plans | Droplinked Onchain Commerce Platform" },
        {
            name: "description",
            content: "Explore Droplinked's pricing plans to find the perfect fit for your business. From our Free Starter plan to custom Enterprise solutions, get the tools you need.",
        },
        {
            name: "keywords",
            content: "Droplinked pricing, Onchain Store Pricing, Crypto E-commerce Fees, Web3 platform cost",
        },
        {
            property: "og:title",
            content: "Pricing & Plans | Droplinked Onchain Commerce Platform",
        },
        {
            property: "og:description",
            content: "Explore Droplinked's pricing plans to find the perfect fit for your business. From our Free Starter plan to custom Enterprise solutions, get the tools you need.",
        },
    ];
}

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