import { Box } from '@chakra-ui/react';
import React from 'react';
import { ShopSubscriptionData } from 'services/subscription/interfaces';
import Charts from './Charts';
import UsageExceededAlert from './UsageExceededAlert';

interface StatisticTabProps {
    data: ShopSubscriptionData
}

export default function StatisticTab({ data }: StatisticTabProps) {
    const UsageExceededItem = data.legalUsage.find((item) => item.remaining === 0)

    if (!data) return null

    return (
        <>
            {UsageExceededItem &&
                <Box width={"100%"} pb={"2rem"} borderBottom="1px solid" borderColor="neutral.gray.800">
                    <UsageExceededAlert title={UsageExceededItem.key} />
                </Box>
            }
            <Box width={"100%"}>
                <Charts data={data} />
            </Box>
        </>
    )
}
