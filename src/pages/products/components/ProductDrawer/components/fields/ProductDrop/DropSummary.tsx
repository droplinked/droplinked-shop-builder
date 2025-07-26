import { Flex, Text } from '@chakra-ui/react'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import chainNameMap from 'constants/blockchainMap'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function DropSummary() {
    const { t } = useLocaleResources('products')
    const { values: { nftData } } = useProductForm()
    const { transactionUrl = "", networkName = "" } = nftData

    const truncatedTransactionUrl = transactionUrl
        ? `${transactionUrl.slice(0, 50)}...`
        : t('DropSummary.noTransactionLinkAvailable')
    const formattedNetworkName = chainNameMap[networkName] || t('DropSummary.unknownNetwork')

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
                <InteractiveText to={transactionUrl} target="_blank" rel="noopener noreferrer">
                    {truncatedTransactionUrl}
                </InteractiveText>
                :
                <Text>{t('DropSummary.noTransactionUrlProvided')}</Text>
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