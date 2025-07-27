import { Flex, Text } from '@chakra-ui/react'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import chainNameMap from 'constants/blockchainMap'
import React from 'react'
import DetailRow from './DetailRow'

function ModalContent({ product }) {
  const { t } = useLocaleResources('products');
  if (!product?.nftData) return null

  const { transactionUrl, deployHash, networkName } = product.nftData
  const truncatedDeployHash = `${deployHash.slice(0, 25)}...`

  return (
    <Flex
      direction="column"
      gap={4}
      border="1px solid"
      borderColor="neutral.gray.800"
      borderRadius={16}
      padding={6}
    >
      <DetailRow label={t('DropInfoModal.details.deployHash')}>
        <Flex alignItems="center" gap={3}>
          <InteractiveText
            to={transactionUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncatedDeployHash}
          </InteractiveText>
          <ClipboardText text={deployHash} />
        </Flex>
      </DetailRow>

      <DetailRow label={t('DropInfoModal.details.droppedOn')}>
        <Flex alignItems="center" gap={2}>
          <BlockchainDisplay blockchain={networkName} show='icon' props={{ width: 20, height: 20 }} />
          <Text fontSize={14} fontWeight={500} color="#FFF">
            {chainNameMap[networkName]}
          </Text>
        </Flex>
      </DetailRow>
    </Flex>
  )
}

export default ModalContent