import React from 'react'
import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import hashkeyModel from "components/common/hashKey/model";

interface TransactionLinkProps {
    transactions: Array<{ deploy_hash: string }>;
    chain: string;
}

export default function TransactionLink({ transactions, chain }: TransactionLinkProps) {
    const slicedText = (text: string) => {
        return text?.slice(0, 25) + (text?.length > 25 ? "..." : "");
    }

    return (
        <>
            {transactions.map((item, index) => (
                <Flex justifyContent={"space-between"} alignItems={"center"} gap={8} key={index}>
                    <AppTypography color={"#7B7B7B"} fontSize={14} fontWeight={400}>
                        {"Transaction Link " + (index === 0 ? "" : index + 1)}
                    </AppTypography>
                    <ExternalLink
                        fontSize={14}
                        fontWeight={500}
                        href={hashkeyModel.getLink({ blockchain: chain, hashkey: item.deploy_hash })}
                        hasArrow={true}
                    >
                        {slicedText(item.deploy_hash)}
                    </ExternalLink>
                </Flex>
            ))}
        </>
    )
}
