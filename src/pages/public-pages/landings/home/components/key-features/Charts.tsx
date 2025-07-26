import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import InlineVideoPlayer from 'pages/public-pages/landings/_shared/components/InlineVideoPlayer';
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
        <Box width="100%" minHeight={videoContainerHeight} position="relative">
            {chartNumber === 1 ? (
                <InlineVideoPlayer
                    key={`chart1-${videoKey}`}
                    src="https://upload-file-droplinked.s3.amazonaws.com/11a7b5387a5ac45556d40c76853a2e7a4d9e6d02a21397dbb6b74a4cef048939_or.webm"
                    loop={false}
                    style={{ height: "100%" }}
                />
            ) : (
                <InlineVideoPlayer
                    key={`chart2-${videoKey}`}
                    src="https://upload-file-droplinked.s3.amazonaws.com/0d7ab0fc3aa530e5943535f126d11f211eafa3509b2afd24f1bdd6c9601dcc84_or.webm"
                    loop={false}
                    style={{ height: "100%" }}
                />
            )}

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
