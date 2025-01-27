import { Flex, Text } from '@chakra-ui/react'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import chainNameMap from 'lib/utils/statics/blockchainMap'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'

function DropSummary() {
    const { values: { nftData } } = useProductForm()
    const { transactionUrl = "", networkName = "" } = nftData

    const truncatedTransactionUrl = transactionUrl
        ? `${transactionUrl.slice(0, 50)}...`
        : "No transaction link available"
    const formattedNetworkName = chainNameMap[networkName] || "Unknown Network"

    return (
        <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            columnGap={12}
            rowGap={2}
            sx={{
                "a, p": { fontSize: 14, fontWeight: 500 },
                p: { color: "white" }
            }}
        >
            {transactionUrl ?
                <ExternalLink href={transactionUrl} target="_blank">
                    {truncatedTransactionUrl}
                </ExternalLink>
                :
                <Text>No transaction URL provided</Text>
            }

            <Flex alignItems="center" gap={2}>
                <BlockchainDisplay
                    blockchain={networkName}
                    show="icon"
                    props={{ width: "20px", height: "20px" }}
                />
                <Text>{formattedNetworkName}</Text>
            </Flex>
        </Flex>
    )
}

export default DropSummary