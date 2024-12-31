import { Box, Flex } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import SwitchBox from "components/redesign/switch-box/SwitchBox";
import React from "react";

interface Props {
    wallets: Array<{
        name: string;
        isActivated: boolean;
    }>;
}

export default function MethodItem({ wallets }: Props) {

    return wallets.map((item, index) => {
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
                <Flex gap={4} alignItems={"center"}>
                    <Box
                        p={3}
                        background={"#1c1c1c"}
                        border={"1px solid #292929"}
                        borderRadius={"8px"}
                    >
                        <BlockchainDisplay
                            blockchain={item.name.toUpperCase()}
                            show="icon"
                            key={item.name}
                        />
                    </Box>
                    <AppTypography fontSize={16} fontWeight={"500"} color={"#fff"}>
                        {item.name}
                    </AppTypography>
                </Flex>
                <SwitchBox isChecked={false} onToggle={() => console.log("hi")} />
            </Flex>
        );
    });
}
