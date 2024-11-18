import { HStack, Progress, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
interface IProps {
    value: number;
    maxValue: number | string;
    title: string;

}
function LinearProgressBar({ value, maxValue, title }: IProps) {
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
        <VStack sx={{ '& div[role="progressbar"]': { bgGradient: getPathColor(), backgroundColor: getPathColor } }} backgroundColor={"#1C1C1C"} width={"100%"} justifyContent={"center"} border={"1px solid #292929"} borderRadius={"8px"} padding={"16px"} alignItems={"center"}>
            <HStack width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <AppTypography color={"#fff"} fontWeight={500} fontSize={"16px"}>{title}</AppTypography>
                <HStack>
                    {maxValue !== "Unlimited" &&
                        <HStack>
                            <AppTypography color={"#fff"} fontWeight={"700"} fontSize={"20px"}>{value}</AppTypography>
                            <AppTypography color={"#7B7B7B"} fontWeight={"400"} fontSize={"14px"}> / {maxValue}</AppTypography>
                        </HStack>
                    }
                    {maxValue === "Unlimited" && <AppIcons.Infinity />}
                    {maxValue !== "Unlimited" && <AppTypography color={"#7B7B7B"} fontWeight={"400"} fontSize={"14px"}>Used</AppTypography>}
                </HStack>
            </HStack>
            <Progress
                height={"8px"}
                backgroundColor={"#333333"}
                borderRadius={"16px"}
                width={"100%"}
                value={typeof maxValue === "string" ? 100 : (value / maxValue) * 100}
            />
        </VStack>
    );
}

export default LinearProgressBar;