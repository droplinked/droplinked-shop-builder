import { Flex } from '@chakra-ui/react'
import React from 'react'
import OutboundDisplay from './OutboundDisplay'
import ProgressBar from 'pages/credits-and-activity/components/ProgressBar';

export default function Outbound() {
    // TODO: Implement has Data condition
    const hasData = true;

    const items = [
        {
            title: 'Withdrawals',
            value: 70,
            color: '#FF2244'
        },
        {
            title: 'Subscriptions',
            value: 30,
            color: '#ff224480'
        },
    ]

    return (
        <Flex
            flexDirection={"column"}
            justifyContent="space-between"
            alignItems="start"
        >
            <OutboundDisplay />
            {hasData &&
                <Flex
                    flexDirection={"column"}
                    justify={{ base: "center", md: "end" }}
                    alignItems="center"
                    gap={6}
                    width={"100%"}
                    borderTop={"1px solid #292929"}
                    p={{ base: 4, md: 6 }}
                >
                    <ProgressBar items={items} />
                </Flex>
            }
        </Flex>
    )
}
