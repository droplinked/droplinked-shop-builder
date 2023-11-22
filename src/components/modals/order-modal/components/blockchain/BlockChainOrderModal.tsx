import { HStack } from '@chakra-ui/react'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useContext } from 'react'
import orderModalContext from '../../context'

function BlockChainOrderModal() {
    const { order } = useContext(orderModalContext)
    const paymentType = order?.details?.paymentType

    return (
        <>
            {paymentType ? (
                <HStack alignItems="center" color="#FFF">
                    <AppTypography fontSize='14px' fontWeight='bold'>Payment with</AppTypography>
                    <BlockchainDisplay show='icon' blockchain={paymentType} props={{ width: "24px", height: "24px" }} />
                    <AppTypography fontSize='14px' fontWeight='bold' color="#FF473E">{capitalizeFirstLetter(paymentType)} payment</AppTypography>
                </HStack>
            ) : null}
        </>
    )
}

export default BlockChainOrderModal