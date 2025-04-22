import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import AppBadge from 'components/redesign/badge/AppBadge'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { formattedDate, formattedTime, formatUnderlinedText, getStatusColorScheme, OrderStatus } from '../helpers'
import { TabsList } from './drawer-components/TabList'

interface OrderHeaderContentProps {
    isFetching: boolean;
    updatedAt: Date;
    orderStatus?: OrderStatus;
    tabs?: Array<{
        title: string;
        content: React.ReactNode;
        isDisabled?: boolean;
    }>;
}

export default function OrderHeaderContent({ isFetching, updatedAt, orderStatus, tabs }: OrderHeaderContentProps) {
    return (
        <Flex flexDirection="column" gap={6}>
            <Flex justifyContent="space-between" alignItems="center">
                <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                    <Text fontSize={14} color="#fff">{formattedDate(updatedAt)} - {formattedTime(updatedAt)}</Text>
                </AppSkeleton>
                <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                    <AppBadge
                        text={formatUnderlinedText(orderStatus)}
                        textTransform="capitalize"
                        size='24'
                        status={getStatusColorScheme(orderStatus)}
                    />
                </AppSkeleton>
            </Flex>
            {tabs && (
                <Flex width="100%">
                    <TabsList tabs={tabs} />
                </Flex>
            )}
        </Flex>
    )
}
