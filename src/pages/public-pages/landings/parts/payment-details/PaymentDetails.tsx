import { Flex, Image } from '@chakra-ui/react'
import Details from 'pages/public-pages/landings/parts/details/Details'
import React from 'react'

function PaymentDetails() {
    const networks = [
        'assets/images/homepage/black_and_white/eth.png',
        'assets/images/homepage/black_and_white/bitcoin.png',
        'assets/images/homepage/black_and_white/binance.png',
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
        'assets/images/homepage/black_and_white/stripe.png',
    ]

    return (
        <Details
            title='Multiple Networks and Payment Methods'
            description='Integrated with both Web2 and Web3 login and payment options for your storefronts'
        >
            <Flex
                justifyContent="center"
                flexWrap="wrap"
                columnGap={{ base: "20px", sm: "80px" }}
                rowGap="48px"
            >
                {networks.map((network, key) => <Image key={key} height={{ base: "16px", sm: "24px" }} src={network} />)}
            </Flex>
        </Details>
    )
}

export default PaymentDetails