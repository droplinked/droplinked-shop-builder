import { HStack } from '@chakra-ui/react'
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useContext } from 'react'
import orderModalContext from '../../context'

function BlockChainOrderModal() {
    const { order } = useContext(orderModalContext)
    const paymentType = order?.paymentType
    return (
        <>
            {paymentType ? (
                <HStack alignItems="center" color="#FFF">
                    <AppTypography size='14px' weight='bold'>Payment with</AppTypography>
                    <IconBlockchain blockchain={paymentType} />
                    <AppTypography size='14px' weight='bold' color="#FF473E">{capitalizeFirstLetter(paymentType)} payment</AppTypography>
                </HStack>
            ) : null}
        </>
    )
}

export default BlockChainOrderModal