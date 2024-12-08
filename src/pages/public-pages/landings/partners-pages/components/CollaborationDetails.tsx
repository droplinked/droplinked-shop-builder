import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { IDetailsItem } from '../../types/interfaces';
import D3Paragraph from './common/D3Paragraph';
import PrimaryHeading from './common/PrimaryHeading';
import { usePartnerContext } from '../context/partner.context';


interface props {
    collaboratorName: string;
}

export default function CollaborationDetails() {
    const { partnerName } = usePartnerContext();

    return (
        <Flex direction="column" justifyContent="flex-start">
            <PrimaryHeading textAlign="center">Perks for {partnerName} Members</PrimaryHeading>
            <Details collaboratorName={partnerName} />
        </Flex>
    )
}


function Details({ collaboratorName }: props) {
    const details: IDetailsItem[] = [
        {
            icon: <AppIcons.D3ShopSetup className='d3-icon' />,
            title: "Store Setup Simplified",
            description: `Integrate your ${collaboratorName} domain on droplinked and launch your shop`
        },
        {
            icon: <AppIcons.D3EnterpriseTools className='d3-icon' />,
            title: "Enterprise-Level Tools",
            description: "Unlock advanced features to scale your business from the start"
        },
        {
            icon: <AppIcons.D3NFTIntegration className='d3-icon' />,
            title: "Seamless NFT Integration",
            description: "Create, manage, and sell NFTs on a customizable storefront"
        }
    ]

    return (
        <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 12, lg: 4, xl: 6 }}
            mt={{ base: 12, md: 16 }}
        >
            {details.map((detail) => <DetailItem key={detail.title} {...detail} />)}
        </SimpleGrid>
    )
}

function DetailItem({ icon, title, description }: IDetailsItem) {
    return (
        <Box
            position="relative"
            bg="linear-gradient(180deg, #2BCFA1 0%, rgba(43, 207, 161, 0.12) 50%)"
            paddingLeft="2px"
        >
            <Flex direction="column" paddingLeft={{ base: 4, md: 6 }} bg="#010101">
                {icon}
                <AppTypography mt={{ base: 4, md: 8 }} fontSize={{ base: 18, md: 20 }} fontWeight={700} color="white">
                    {title}
                </AppTypography>
                <D3Paragraph mt={1}>{description as string}</D3Paragraph>
            </Flex>
        </Box>
    )
}
