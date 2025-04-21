import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

interface Props {
    orderData: any;
    isFetching: boolean;
}

export default function OrderCart({ orderData, isFetching }: Props) {
    const { cart } = orderData ?? { cart: [] };

    return (
        <Flex direction="column" gap={4} p={2}>
            <Text fontSize="16px" fontWeight={600} color="#fff" mb={2}>Order Items</Text>

            {isFetching ? (
                <>
                    <AppSkeleton isLoaded={false} height="100px" width="100%" borderRadius={8} />
                    <AppSkeleton isLoaded={false} height="100px" width="100%" borderRadius={8} />
                </>
            ) : cart && cart.length > 0 ? (
                cart.map((item: any, index: number) => (
                    <Flex
                        key={index}
                        p={3}
                        bg="#252525"
                        borderRadius={8}
                        gap={3}
                        mb={2}
                    >
                        <Image
                            src={item.product?.image || 'https://via.placeholder.com/60'}
                            alt={item.product?.name || 'Product'}
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius={4}
                        />
                        <Flex direction="column" flex={1} justifyContent="space-between">
                            <Text color="#fff" fontWeight={500}>{item.product?.name || 'Unknown Product'}</Text>
                            <Flex justifyContent="space-between">
                                <Text color="#B1B1B1" fontSize="14px">Qty: {item.quantity || 1}</Text>
                                <Text color="#fff" fontWeight={500}>${item.product?.price || 0}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                ))
            ) : (
                <Box p={4} bg="#252525" borderRadius={8} textAlign="center">
                    <Text color="#B1B1B1">No items in cart</Text>
                </Box>
            )}

            {!isFetching && (
                <Flex direction="column" gap={2} mt={4} p={4} bg="#252525" borderRadius={8}>
                    <Flex justifyContent="space-between">
                        <Text color="#B1B1B1">Subtotal</Text>
                        <Text color="#fff">${orderData?.totalPrice?.subtotal || 0}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                        <Text color="#B1B1B1">Shipping</Text>
                        <Text color="#fff">${orderData?.totalPrice?.shipping || 0}</Text>
                    </Flex>
                    <Flex justifyContent="space-between" fontWeight={600} mt={2} pt={2} borderTop="1px solid #333">
                        <Text color="#fff">Total</Text>
                        <Text color="#fff">${orderData?.totalPrice?.total || 0}</Text>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}
