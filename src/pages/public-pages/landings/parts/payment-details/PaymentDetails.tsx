import { Flex, Image } from '@chakra-ui/react'
import Details from 'pages/public-pages/landings/parts/details/Details'
import React from 'react'

function PaymentDetails() {
    const networks = [
        'assets/images/homepage/stacks.png',
        'assets/images/homepage/polygon.png',
        'assets/images/homepage/casper.png',
        'assets/images/homepage/Near.png',
        'assets/images/homepage/xrp-ledger.png',
        'assets/images/homepage/Unisat.png',
        'assets/images/homepage/Binance.png',
        'assets/images/homepage/Solana.png',
        'assets/images/homepage/base.png',
        'assets/images/homepage/skale.png',
        'assets/images/homepage/Hedera.png'
    ]

    return (
        <Details
            title='Supporting multiple Networks and payment Methods'
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