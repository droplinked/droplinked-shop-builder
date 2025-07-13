import { AvatarGroup, Box } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import { SupportedChains } from "services/shop/interfaces";
import React from "react";

export default function TokensIcon({ chains }: { chains: SupportedChains[] }) {
    return (
        <AvatarGroup>
            {chains.map((chain, index) => (
                <Box
                    sx={{ svg: { width: "16px", height: "16px" } }}
                    p={3}
                    borderRadius={"100%"}
                    border={"1px solid"}
                    borderColor="neutral.gray.800"
                    bg={"neutral.gray.1000"}
                    key={index}
                >
                    <BlockchainDisplay blockchain={chain.type} show="icon" />
                </Box>
            ))}
        </AvatarGroup>
    );
}
