import React from 'react'
import MaxWidthWrapper from '../components/common/MaxWidthWrapper'
import SectionContainer from '../components/common/SectionContainer/SectionContainer'
import { Flex, Link } from '@chakra-ui/react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';

export default function PartnersSection() {
    const partners = [
        {
            title: 'Unstoppable',
            url: 'https://shop.unstoppabledomains.com/',
            icon: '/assets/images/homepage/uns.svg',
        },
        {
            title: 'SwissBorg',
            url: 'https://droplinked.io/swissborg',
            icon: '/assets/images/homepage/swissborg.jpeg',
        },
        {
            title: 'Casper Punks',
            url: 'https://shop.casperpunks.io/',
            icon: '/assets/images/homepage/casper.svg',
        },
        {
            title: 'SKALE',
            url: 'https://droplinked.io/skale',
            icon: '/assets/images/homepage/skale.svg',
        },
        {
            title: 'Polygon',
            url: 'https://droplinked.io/polygon',
            icon: '/assets/images/homepage/polygan.svg',
        },
        {
            title: 'Near HZN1',
            url: 'https://droplinked.io/nearhorizon',
            icon: '/assets/images/homepage/near-horizon.png',
        },
        {
            title: 'Format One',
            url: 'https://droplinked.io/formatone',
            icon: '/assets/images/homepage/format-one.jpeg',
        },
        {
            title: 'Crashpunks',
            url: 'https://droplinked.io/crashpunks',
            icon: '/assets/images/homepage/crashpunks.jpg',
        },
        {
            title: 'Tenamint',
            url: 'https://droplinked.io/tenamint',
            icon: '/assets/images/homepage/tenamint.jpg',
        },
        {
            title: 'Supernova',
            url: 'https://droplinked.io/supernova',
            icon: '/assets/images/homepage/supernova.svg',
        },
        {
            title: 'Ample',
            url: 'https://droplinked.io/ample',
            icon: '/assets/images/homepage/ample.png',
        },
        {
            title: 'Hungry Artist',
            url: 'https://droplinked.io/hungryartist',
            icon: '/assets/images/homepage/hungry-artist.png',
        },
        {
            title: 'Elixir',
            url: 'https://droplinked.io/elixir',
            icon: '/assets/images/homepage/elixir.jpeg',
        },
    ];

    return (
        <MaxWidthWrapper boxProps={{ paddingBlock: 6 }}>
            <SectionContainer
                sectionTitle='ECOSYSTEM PARTNERS'
                flexProps={{ paddingBlock: 6 }}
            >
                <Flex gap={4} alignItems="center">
                    {partners.map((partner) => (
                        <Link
                            href={partner.url}
                            key={partner.title}
                        >
                            <IconWrapper
                                background="neutral.background"
                                border="none"
                                icon={
                                    <img
                                        width="20px"
                                        height="20px"
                                        src={partner.icon}
                                        alt={partner.title}
                                    />
                                }
                            />
                        </Link>
                    ))}
                </Flex>
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
