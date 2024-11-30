import { Box, HStack, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
interface IProps {
    value: number;
    maxValue: number | string;
    title: string;
}
function SemiCircleProgressbar({ value, maxValue, title }: IProps) {
    const scaledValue = typeof maxValue === "string" ? null : ((value / maxValue) * 50);

    const getPathColor = () => {
        if (maxValue === "Unlimited") {
            return "url(#gradient)";
        }
        if (scaledValue === 100) {
            return "#FF2244";
        }
        return scaledValue > 50 ? "#FE8540" : "#2BCFA1";
    };

    return (
        <VStack backgroundColor={"#1C1C1C"} gap={"4rem"} width={"196px"} justifyContent={"center"} border={"1px solid #292929"} borderRadius={"8px"} padding={"16px"} alignItems={"center"}>
            <AppTypography color={"#fff"} fontWeight={500} fontSize={"16px"} width={"148px"}>{title}</AppTypography>
            <Box width={"148px"} borderRadius="8px" height={"70px"} overflow="hidden">
                <svg style={{ height: 0 }}>
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor="#2BCFA1" />
                            <stop offset="100%" stopColor="#7C6CBD" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgressbar
                    value={scaledValue === 0 || typeof scaledValue === "number" ? scaledValue : 100}
                    strokeWidth={5}
                    maxValue={100}
                    styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: "round",
                        trailColor: "#3C3C3C",
                        pathColor: getPathColor(),
                        textColor: "#3C3C3C",
                    })}
                />
                <VStack position={"relative"} gap={"-0.5rem"} bottom={maxValue === "Unlimited" ? "7.5rem" : "8rem"}>
                    {maxValue !== "Unlimited" &&
                        <HStack>
                            <AppTypography color={"#fff"} fontWeight={"700"} fontSize={"20px"}>{value}</AppTypography>
                            <AppTypography color={"#7B7B7B"} fontWeight={"400"} fontSize={"14px"}> / {maxValue}</AppTypography>
                        </HStack>
                    }
                    {maxValue === "Unlimited" && <AppIcons.Infinity />}
                    <AppTypography color={"#7B7B7B"} fontWeight={"400"} fontSize={"14px"}>{maxValue === "Unlimited" ? "Unlimited" : "Used"}</AppTypography>
                </VStack>
            </Box>
        </VStack>
    );
}

export default SemiCircleProgressbar;