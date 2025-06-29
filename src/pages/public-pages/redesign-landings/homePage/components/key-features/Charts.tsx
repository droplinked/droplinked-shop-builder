import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import InlineVideoPlayer from 'pages/public-pages/redesign-landings/_shared/components/InlineVideoPlayer';
import { ChartSelector } from './ChartSelector';
import { OrdersInfo } from './OrdersInfo';

const Charts = () => {
    const [chartNumber, setChartNumber] = useState(1);
    const [videoKey, setVideoKey] = useState(0);
    // Keep a consistent height to prevent layout shift
    const videoContainerHeight = "385px";

    // Increment key when chart changes to force remount
    useEffect(() => {
        setVideoKey(prevKey => prevKey + 1);
    }, [chartNumber]);

    const amounts = [
        {
            label: "Affiliate",
            value: 22,
        },
        {
            label: "Distributor",
            value: 38,
        },
        {
            label: "Producer",
            value: 40,
        }
    ];

    return (
        <Box position="relative">
            <Box
                position="relative"
                width="100%"
                minHeight={videoContainerHeight}
            >
                {chartNumber === 1 ? (
                    <InlineVideoPlayer
                        key={`chart1-${videoKey}`}
                        src="/assets/video/home-page/chart1.webm"
                        loop={false}
                    />
                ) : (
                    <InlineVideoPlayer
                        key={`chart2-${videoKey}`}
                        src="/assets/video/home-page/chart2.webm"
                        loop={false}
                    />
                )}
            </Box>

            <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                padding={6}
                justifyContent="space-between"
                zIndex={2}
            >
                <OrdersInfo amounts={amounts} />
                <ChartSelector chartNumber={chartNumber} setChartNumber={setChartNumber} />
            </Flex>
        </Box>
    );
};

export default Charts;
