import { Flex, Hide, Image, Show } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import LandingDescription from '../parts/description/LandingDescription';
import LandingTitle from '../parts/title/LandingTitle';
import NetworkLayers from './parts/layers/NetworkLayers';

function Networks() {
    const { t } = useLocaleResources("homePage");

    return (
        <Flex justifyContent="center" alignItems="center">
            <Flex width="95%" direction="column" justifyContent="center" gap={5} color="#fff">
                <LandingTitle title={t('networks.title')} />
                <LandingDescription text={t('networks.description')} />
                <Flex width="95%" justifyContent="center" position="relative">
                    <Hide below="lg">
                        <Image src="assets/images/homepage/networks.png" width="100%" />
                    </Hide>
                    <Show breakpoint="(max-width: 992px)">
                        <NetworkLayers />
                    </Show>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Networks;
