import React from 'react'
import { Flex } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import InteractiveText from "components/redesign/interactive-text/InteractiveText"
import hashkeyModel from "components/common/hashKey/model"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface TransactionLinkProps {
    transactions: Array<{ deploy_hash: string }>
    chain: string
}

export default function TransactionLink({ transactions, chain }: TransactionLinkProps) {
    const { t } = useLocaleResources("onchainRecords")

    const slicedText = (text: string) => {
        return text?.slice(0, 25) + (text?.length > 25 ? "..." : "")
    }

    return (
        <>
            {transactions.map((item, index) => (
                <Flex justifyContent="space-between" alignItems="center" gap={8} key={index}>
                    <AppTypography color="#7B7B7B" fontSize={14} fontWeight={400}>
                        {`${t("transaction_link")} ` + (index === 0 ? "" : index + 1)}
                    </AppTypography>
                    <InteractiveText
                        fontSize={14}
                        fontWeight={500}
                        to={hashkeyModel.getLink({ blockchain: chain, hashkey: item.deploy_hash })}
                        hasExternalIcon={true}
                    >
                        {slicedText(item.deploy_hash)}
                    </InteractiveText>
                </Flex >
            ))
            }
        </>
    )
}

