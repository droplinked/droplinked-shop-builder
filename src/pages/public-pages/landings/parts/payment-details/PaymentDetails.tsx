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
        'assets/images/homepage/Hedera.png',
        'https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fac2d50acefbc555c6eb606030489e11409f3bd22611abafc5eb5ea43ec02458.png_or.png',
        'https://upload-file-flatlay.s3.us-west-2.amazonaws.com/86bc62aa00b03f8c368694ae03ad997f354aa54c89fd3f1a29449a72746c00c6.png_or.png',
        'https://upload-file-flatlay.s3.us-west-2.amazonaws.com/322b20d5e47893778a60ca1b548d4bcc8ead9dced8990343cfc14b152dba82df.png_or.png'
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