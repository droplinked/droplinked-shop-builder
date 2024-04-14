import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props {
    title: string;
    description?: string;
    isComingSoon?: boolean
}

function PlanAdvantage({ title, description, isComingSoon }: Props) {
    return (
        <Flex alignItems={description ? "start" : "center"} gap={"12px"}>
            <AppIcons.CheckCircle />
            <Flex direction={"column"} gap={"4px"}>
                <Flex alignItems={"center"} gap={"8px"}>
                    <AppTypography fontSize={"14px"} fontWeight={600} color={"#fff"}>{title}</AppTypography>
                    {isComingSoon &&
                        <Box
                            padding={"4px 8px"}
                            borderRadius={"4px"}
                            backgroundColor={"#2BCFA1"}
                            fontSize={"8px"}
                            fontWeight={700}
                            color={"#000"}
                        >
                            Coming Soon
                        </Box>}
                </Flex>
                {description && <AppTypography fontSize={"14px"} color={"#C4C4C4"}>{description}</AppTypography>}
            </Flex>
        </Flex>
    )
}

export default PlanAdvantage