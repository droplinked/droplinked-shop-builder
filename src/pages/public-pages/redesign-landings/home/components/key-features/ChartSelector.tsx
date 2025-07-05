import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BarchartSm } from 'assets/icons/Finance/BarChart/BarchartSm';
import { ChartSm } from 'assets/icons/Finance/Chart/ChartSm';

interface ChartSelectorProps {
    chartNumber: number;
    setChartNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({ chartNumber, setChartNumber }) => (
    <Flex
        gap={1}
        alignItems="center"
        backdropFilter="blur(10px)"
        borderRadius={8}
        border="1px solid rgba(10, 10, 10, 0.10)"
        p={2}
    >
        <Box
            background={chartNumber === 1 ? "rgba(43, 207, 161, 0.10)" : "transparent"}
            opacity={chartNumber === 1 ? 1 : 0.25}
            padding={2}
            borderRadius={4}
            onClick={() => setChartNumber(1)}
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            transform={chartNumber === 1 ? "scale(1.05)" : "scale(1)"}
            _hover={{
                opacity: 0.9,
                background: chartNumber === 1
                    ? "rgba(43, 207, 161, 0.15)"
                    : "rgba(43, 207, 161, 0.05)",
                transform: "scale(1.05)"
            }}
        >
            <BarchartSm color="#2BCFA1" />
        </Box>

        <Box
            background={chartNumber === 2 ? "rgba(43, 207, 161, 0.10)" : "transparent"}
            opacity={chartNumber === 2 ? 1 : 0.25}
            padding={2}
            borderRadius={4}
            onClick={() => setChartNumber(2)}
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            transform={chartNumber === 2 ? "scale(1.05)" : "scale(1)"}
            _hover={{
                opacity: 0.9,
                background: chartNumber === 2
                    ? "rgba(43, 207, 161, 0.15)"
                    : "rgba(43, 207, 161, 0.05)",
                transform: "scale(1.05)"
            }}
        >
            <ChartSm color="#2BCFA1" />
        </Box>
    </Flex>
);
