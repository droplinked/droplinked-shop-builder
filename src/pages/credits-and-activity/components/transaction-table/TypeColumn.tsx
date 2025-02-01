import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react'

interface Props {
    data: {
        isInbound: boolean;
        isOutbound: boolean;
        type: string;
    }
}

export default function TypeColumn({ data }: Props) {
    const { isInbound, isOutbound, type } = data
    console.log(data)

    return (
        <Flex gap={4} alignItems={"center"}>
            <Flex p={"6px"} borderRadius={"8px"} bg={isInbound ? "#2bcfa11a" : "#ff22440d"} border={`1px solid ${isInbound ? "#2bcfa11a" : "#ff224426"}`}>
                {isInbound && <AppIcons.ArrowDownOutlined color='#2BCFA1' width={"20px"} height={"20px"} />}
                {isOutbound && <AppIcons.ArrowUp color='#FF2244' width={"20px"} height={"20px"} />}
            </Flex>
            <AppTypography color={"#fff"} fontSize={16}>{type}</AppTypography>
        </Flex>
    )
}
