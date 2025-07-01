import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { TFunction } from 'i18next';
import { IDetailsItem } from '../../types/interfaces';

import PrimaryHeading from './common/PrimaryHeading';
import { usePartnerContext } from '../context/partner.context';
import LandingText from './common/LandingText';

interface CollaborationDetailsProps {
    t: TFunction;
}

export default function CollaborationDetails({ t }: CollaborationDetailsProps) {
    const { partnerName } = usePartnerContext();

    return (
        <Flex direction="column" justifyContent="flex-start">
            <PrimaryHeading textAlign="center">{t('collaborationDetails.title', { partnerName })}</PrimaryHeading>
            <Details collaboratorName={partnerName} t={t} />
        </Flex>
    )
}

interface DetailsProps {
    collaboratorName: string;
    t: TFunction;
}

function Details({ collaboratorName, t }: DetailsProps) {
    const getDetails = (t: TFunction): IDetailsItem[] => [
        {
            icon: <AppIcons.D3ShopSetup className='d3-icon' />,
            title: t('collaborationDetails.items.storeSetupSimplified.title'),
            description: t('collaborationDetails.items.storeSetupSimplified.description', { partnerName: collaboratorName })
        },
        {
            icon: <AppIcons.D3EnterpriseTools className='d3-icon' />,
            title: t('collaborationDetails.items.enterpriseLevelTools.title'),
            description: t('collaborationDetails.items.enterpriseLevelTools.description')
        },
        {
            icon: <AppIcons.D3NFTIntegration className='d3-icon' />,
            title: t('collaborationDetails.items.seamlessNftIntegration.title'),
            description: t('collaborationDetails.items.seamlessNftIntegration.description')
        }
    ];

    const details = getDetails(t);

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
                <LandingText mt={1}>{description as string}</LandingText>
            </Flex>
        </Box>
    )
}
