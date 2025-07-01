import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import Details from '../details/Details'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function PaymentDetails() {
    const { t } = useLocaleResources('public-pages/landings/_components')
    
    const networks = [
        'assets/images/homepage/black_and_white/eth.png',
        'assets/images/homepage/black_and_white/bitcoin.png',
        'assets/images/homepage/black_and_white/BNB-chain.png',
        'assets/images/homepage/black_and_white/stacks.png',
        'assets/images/homepage/black_and_white/near.png',
        'assets/images/homepage/black_and_white/polygon.png',
        'assets/images/homepage/black_and_white/casper.png',
        'assets/images/homepage/black_and_white/unisat.png',
        'assets/images/homepage/black_and_white/base.png',
        'assets/images/homepage/black_and_white/solana.png',
        'assets/images/homepage/black_and_white/xrpl.png',
        'assets/images/homepage/black_and_white/skale.png',
        'assets/images/homepage/black_and_white/hedera.png',
        'assets/images/homepage/black_and_white/stripe.png'
    ]

    return (
        <Details
            title={t('paymentDetails.title')}
            description={t('paymentDetails.description')}
        >
            <Flex
                justifyContent="center"
                flexWrap="wrap"
                columnGap={{ base: 9, lg: 12, xl: 14 }}
                rowGap={{ base: 9, lg: 12 }}
            >
                {networks.map((network, key) => <Image key={key} height={{ base: "16px", md: "24px" }} src={network} />)}
            </Flex>
        </Details>
    )
}

export default PaymentDetails