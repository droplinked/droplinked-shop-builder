import { Flex } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import LandingDescription from '../parts/description/LandingDescription';
import LandingTitle from '../parts/title/LandingTitle';
import PartnersSlider from './parts/slider/PartnersSlider';

function Partners() {
    const { t } = useLocaleResources("homePage");

    return (
        <Flex direction="column" gap={5}>
            <LandingTitle title={t('partners.title')} />
            <LandingDescription text={t('partners.description')} />
            <PartnersSlider />
        </Flex>
    );
}

export default Partners;
