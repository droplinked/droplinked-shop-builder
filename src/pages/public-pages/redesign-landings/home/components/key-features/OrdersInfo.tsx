import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface AmountData {
    label: string;
    value: number;
}

interface OrdersInfoProps {
    amounts: AmountData[];
}

export const OrdersInfo: React.FC<OrdersInfoProps> = ({ amounts }) => (
    <Flex flexDirection="column" gap={4}>
        <Text
            fontSize={{ base: "14px", "xl": "16px" }}
            fontWeight={500}
            color="text.white"
        >
            Orders
        </Text>
        <Flex gap={6} alignItems="center">
            {amounts.map((amount, index) => (
                <Flex key={index} gap={3} alignItems="center">
                    <Box>
                        <Box background="main.primary" height="20px" width="2px" />
                        <Box background="rgba(255, 255, 255, 0.10)" height="20px" width="2px" />
                    </Box>
                    <Box>
                        <Text
                            fontSize={{ base: "12px", "xl": "14px" }}
                            fontWeight={500}
                            color="text.white"
                        >
                            {amount.value}%
                        </Text>
                        <Text
                            mt="2px"
                            fontSize="12px"
                            color="text.subtext.placeholder.dark"
                        >
                            {amount.label}
                        </Text>
                    </Box>
                </Flex>
            ))}
        </Flex>
    </Flex>
);
