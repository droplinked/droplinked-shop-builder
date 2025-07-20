import { Box, HStack, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import localEn from 'locales/subscription/en.json';
import localAr from 'locales/subscription/ar.json';

interface IProps {
    value: number;
    maxValue: number | string;
    title: string;
}

function SemiCircleProgressbar({ value, maxValue, title }: IProps) {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });
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
        <VStack backgroundColor={"neutral.gray.1000"} gap={6} justifyContent={"center"} padding={"16px"} alignItems={"center"}>
            <AppTypography color={"neutral.white"} fontWeight={500} fontSize={"16px"} width={"148px"}>{title}</AppTypography>
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
                            <AppTypography color={"neutral.white"} fontWeight={"700"} fontSize={"20px"}>{value}</AppTypography>
                            <AppTypography color={"text.subtext.placeholder.dark"} fontWeight={"400"} fontSize={"14px"}> / {maxValue}</AppTypography>
                        </HStack>
                    }
                    {maxValue === "Unlimited" && <AppIcons.Infinity />}
                    <AppTypography color={"text.subtext.placeholder.dark"} fontWeight={"400"} fontSize={"14px"}>
                        {maxValue === "Unlimited" ? t('Charts.unlimited') : t('LinearProgressBar.used')}
                    </AppTypography>
                </VStack>
            </Box>
        </VStack>
    );
}

export default SemiCircleProgressbar;