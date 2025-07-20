import { HStack, Progress, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';
import localEn from 'locales/subscription/en.json';
import localAr from 'locales/subscription/ar.json';

interface IProps {
    value: number;
    maxValue: number | string;
    title: string;
}

function LinearProgressBar({ value, maxValue, title }: IProps) {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });
    
    const getPathColor = () => {
        if (maxValue === "Unlimited") {
            return "radial-gradient(100% 1056.28% at 100% 50%, #8B5AC3 0%, #2BCFA1 100%)";
        }
        if (value === 100) {
            return "#FF2244";
        }
        return value > 50 ? "#FE8540" : "#2BCFA1";
    };

    return (
        <VStack sx={{ '& div[role="progressbar"]': { bgGradient: getPathColor(), backgroundColor: getPathColor } }} backgroundColor={"neutral.gray.1000"} width={"100%"} justifyContent={"center"} padding={"16px"} alignItems={"center"}>
            <HStack width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <AppTypography color={"neutral.white"} fontWeight={500} fontSize={"16px"}>{title}</AppTypography>
                <HStack>
                    {maxValue !== "Unlimited" &&
                        <HStack>
                            <AppTypography color={"neutral.white"} fontWeight={"700"} fontSize={"20px"}>{value}</AppTypography>
                            <AppTypography color={"text.subtext.placeholder.dark"} fontWeight={"400"} fontSize={"14px"}> / {maxValue}</AppTypography>
                        </HStack>
                    }
                    {maxValue === "Unlimited" && <AppIcons.Infinity />}
                    {maxValue !== "Unlimited" && <AppTypography color={"text.subtext.placeholder.dark"} fontWeight={"400"} fontSize={"14px"}>{t('LinearProgressBar.used')}</AppTypography>}
                </HStack>
            </HStack>
            <Progress
                height={"8px"}
                backgroundColor={"neutral.gray.750"}
                borderRadius={"16px"}
                width={"100%"}
                value={typeof maxValue === "string" ? 100 : (value / maxValue) * 100}
            />
        </VStack>
    );
}

export default LinearProgressBar;