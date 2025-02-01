import { Flex } from '@chakra-ui/react'
import React from 'react'
import InboundDisplay from './InboundDisplay'
import ProgressBar from 'pages/credits-and-activity/components/ProgressBar';

export default function Inbound() {
    // TODO: Implement has Data condition
    const hasData = true;

    const items = [
        {
            title: 'Credits',
            value: 60,
            color: '#2BCFA1'
        },
        {
            title: 'Referrals',
            value: 30,
            color: '#2bcfa199'
        },
        {
            title: 'Rewards',
            value: 10,
            color: '#2bcfa14d'
        }
    ]

    return (
        <Flex
            flexDirection={"column"}
            justifyContent="space-between"
            alignItems="start"
        >
            <InboundDisplay />
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
