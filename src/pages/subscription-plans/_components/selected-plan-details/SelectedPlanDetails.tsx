import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import CircularProgressBar from './CircularProgressBar';

interface Props {
    title: "Print on Demand" | "NFT" | "Royalty Program Integration"
    total: number;
    used: number;
}

function SelectedPlanDetails({ title, total, used }: Props) {
    return (
        <Flex
            direction={"column"}
            gap={4}
            borderRadius={12}
            padding={"16px 20px"}
            bgColor={"#1F1F1F"}
        >
            <AppTypography fontSize={14} fontWeight={600} color={"white"}>{title}</AppTypography>
            <Flex alignItems={"center"} gap={5}>
                <CircularProgressBar used={used} total={total} />
                <AppTypography color={"white"}>Remaining: <Box as='span' fontWeight={600}>{total - used}</Box></AppTypography>
            </Flex>
        </Flex >
    )
}

export default SelectedPlanDetails