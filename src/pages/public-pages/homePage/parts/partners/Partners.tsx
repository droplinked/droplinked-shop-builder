import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import MainCard from '../parts/card/MainCard'

function Partners() {
    const data = [
        {
            title: 'Unstoppable Domains',
            url: '',
            icon: '/assets/images/homepage/uns.svg'
        },
        {
            title: 'Casper Punks',
            url: '',
            icon: '/assets/images/homepage/casper.svg'
        },
        {
            title: 'Skale',
            url: '',
            icon: '/assets/images/homepage/skale.svg'
        },
        {
            title: 'Polygan Merch Store',
            url: '',
            icon: '/assets/images/homepage/polygan.svg'
        }
    ]

    return (
        <Flex justifyContent="center" alignItems="center">
            <VStack width="80%" justifyContent="center" color="#FFF">
                <Box><AppTypography size="34px" weight='bolder'>Partners</AppTypography></Box>
                <Box padding="10px 0 30px 0"><AppTypography size="20px" color="#888">Explore the Network of collaborators taking commerce to the next level!</AppTypography></Box>
                <Flex gap="60px" width="100%" justifyContent="center">
                    {data.map((el, key) => (
                        <MainCard width="22%" key={key}>
                            <Image width="64px" height="64px" src={el.icon} alt={el.title} />
                            <AppTypography height="72px" size='24px' weight='bolder' color="#f5f5f5">{el.title}</AppTypography>
                            <BasicButton sizes="medium" variant='ghost'>View Shop</BasicButton>
                        </MainCard>
                    ))}
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Partners