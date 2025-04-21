import { Box, Flex, Text } from '@chakra-ui/react';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import React from 'react';

interface Props {
    orderData: any;
    isFetching: boolean;
}

export default function OrderInformation({ orderData, isFetching }: Props) {
    const { orderInformation } = orderData ?? {}

    return (
        <Flex direction="column" gap={4} p={2}>
            <Box>
                <Text fontSize="16px" fontWeight={600} color="#fff" mb={2}>Order Details</Text>
                <Flex direction="column" gap={2}>
                    <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                        <Flex justifyContent="space-between">
                            <Text fontSize="14px" color="#B1B1B1">Order ID:</Text>
                            <Text fontSize="14px" color="#fff">{orderData?._id || '-'}</Text>
                        </Flex>
                    </AppSkeleton>
                    <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                        <Flex justifyContent="space-between">
                            <Text fontSize="14px" color="#B1B1B1">Status:</Text>
                            <Text fontSize="14px" color="#fff">{orderInformation?.status || '-'}</Text>
                        </Flex>
                    </AppSkeleton>
                    <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                        <Flex justifyContent="space-between">
                            <Text fontSize="14px" color="#B1B1B1">Payment Method:</Text>
                            <Text fontSize="14px" color="#fff">{orderInformation?.paymentMethod || '-'}</Text>
                        </Flex>
                    </AppSkeleton>
                </Flex>
            </Box>

            <Box mt={4}>
                <Text fontSize="16px" fontWeight={600} color="#fff" mb={2}>Customer Information</Text>
                <Flex direction="column" gap={2}>
                    <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                        <Flex justifyContent="space-between">
                            <Text fontSize="14px" color="#B1B1B1">Email:</Text>
                            <Text fontSize="14px" color="#fff">{orderInformation?.customerEmail || '-'}</Text>
                        </Flex>
                    </AppSkeleton>
                    <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                        <Flex justifyContent="space-between">
                            <Text fontSize="14px" color="#B1B1B1">Address:</Text>
                            <Text fontSize="14px" color="#fff">{orderInformation?.shippingAddress || '-'}</Text>
                        </Flex>
                    </AppSkeleton>
                </Flex>
            </Box>
        </Flex>
    )
}
