import { Box, Flex } from '@chakra-ui/react'
import PlansTable from 'pages/subscription-plans/components/comparison-table'
import Plans from 'pages/subscription-plans/components/plan-cards/Plans'
import React from 'react'

export function meta() {
    return [
        { title: "Pricing & Plans | Droplinked" },
        {
            name: "description",
            content: "Explore Droplinked's flexible subscription plans. From a Free tier for starters to Pro, Premium, and custom Enterprise solutions for advanced Web3 commerce.",
        },
        {
            name: "keywords",
            content: "Droplinked pricing, subscription plans, free plan, pro plan, premium plan, enterprise plan, e-commerce pricing",
        },
        {
            property: "og:title",
            content: "Pricing & Plans | Droplinked",
        },
        {
            property: "og:description",
            content: "Explore Droplinked's flexible subscription plans. From a Free tier for starters to Pro, Premium, and custom Enterprise solutions for advanced Web3 commerce.",
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