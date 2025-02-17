import React from 'react'
import { Codes } from '../../../interface'
import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { Filters } from './CodesTab';
import ClipboardText from 'components/common/clipboardText/ClipboardText';

interface Props {
    codes: Codes[]
    currentFilter: Filters
}

export default function CodesList({ codes, currentFilter }: Props) {
    const getFilteredCodes = () => {
        switch (currentFilter) {
            case Filters.Used:
                return codes.filter(code => code.isRedeemed);
            case Filters.Available:
                return codes.filter(code => !code.isRedeemed);
            default:
                return codes;
        }
    }

    return (
        <Box>
            {
                getFilteredCodes().map((item, index) => {
                    return (
                        <Flex
                            {...index === 0 && { borderTopRadius: "8px" }}
                            {...index + 1 === codes.length && { borderBottomRadius: "8px", borderBottom: "#292929" }}
                            py={4}
                            px={6}
                            border={"1px solid #292929"}
                            borderBottom={"none"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            mr={2}
                        >
                            <Flex gap={4} alignItems={"center"}>
                                <Box borderRadius={"8px"} background={item.isRedeemed ? "#FF2244" : "#2BCFA1"} width={"8px"} height={"8px"} />
                                <AppTypography color={"#fff"} fontSize={16}>
                                    {item.code}
                                </AppTypography>
                            </Flex>
                            <ClipboardText text={item.code} />
                        </Flex>
                    )
                })
            }
        </Box>
    )
}
