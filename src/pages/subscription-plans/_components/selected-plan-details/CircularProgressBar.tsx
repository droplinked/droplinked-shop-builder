import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

// Function to determine colors based on progress value
const getProgressColors = (progressValue: number) => {
    switch (true) {
        case progressValue >= 75:
            return { backgroundColor: "rgba(230, 63, 67, 0.25)", progressColor: "#E63F43" } // red
        case progressValue >= 50:
            return { backgroundColor: "rgba(254, 185, 0, 0.25)", progressColor: "#FEB900" } // orange
        default:
            return { backgroundColor: "rgba(43, 207, 161, 0.25)", progressColor: "#25A07E" } // green
    }
}

function CircularProgressBar({ used, total }: { used: number, total: number }) {
    const progressValue = (used / total) * 100
    const { backgroundColor, progressColor } = getProgressColors(progressValue)

    return (
        <CircularProgress
            size='76px'
            thickness='6px'
            trackColor="#5D5D5D"
            value={progressValue}
            color={progressColor}
            bgColor={backgroundColor}
            boxShadow={"0px 4px 14.9px 0px #212121 inset"}
            borderRadius={"50%"}
            capIsRound
        >
            <CircularProgressLabel>
                <AppTypography fontSize={10} color={"white"}>
                    <Box as="span" fontWeight={600}>{total}</Box> of <Box as='span' fontWeight={600}>{used}</Box>
                </AppTypography>
            </CircularProgressLabel>
        </CircularProgress>
    )
}

export default CircularProgressBar