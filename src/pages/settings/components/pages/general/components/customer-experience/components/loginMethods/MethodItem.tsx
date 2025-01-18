import { Box, Flex } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppTypography from "components/common/typography/AppTypography";
import SwitchBox from "components/redesign/switch-box/SwitchBox";
import React from "react";

interface Props {
    method: {
        name: string;
        isActivated: boolean;
        type: "SOCIAL" | "WALLET";
    };
    onToggle: (methodName: string) => void;
}

export default function MethodItem({ method, onToggle }: Props) {

    return (
        <Flex
            borderRadius={"8px"}
            border={"1px solid #292929"}
            width="100%"
            flexWrap={"wrap"}
            p={4}
            justifyContent={"space-between"}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
        >
            <Flex gap={4} flex={1} alignItems={"center"}>
                <Box
                    p={3}
                    background={"#1c1c1c"}
                    border={"1px solid #292929"}
                    borderRadius={"8px"}
                >
                    <BlockchainDisplay
                        blockchain={method.name.toUpperCase()}
                        show="icon"
                        key={method.name}
                    />
                </Box>
                <AppTypography fontSize={16} fontWeight={"500"} color={"#fff"}>
                    {method.name}
                </AppTypography>
            </Flex>
            <Box>
                <SwitchBox
                    isChecked={method.isActivated}
                    onToggle={() => onToggle(method.name)}
                />
            </Box>
        </Flex>
    );
}
