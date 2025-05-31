import { Flex, Heading, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Droplinked from './parts/droplinked/Droplinked';

function Banner() {
    const { t } = useLocaleResources("homePage");
    const navigate = useNavigate();

    const handleStartSelling = () => navigate('/onboarding?entry=signup');

    const typewriterStrings = [
        t('banner.typewriter.buildStore'),
        t('banner.typewriter.sellProducts'),
        t('banner.typewriter.tokenGating'),
        t('banner.typewriter.mintToMerch'),
        t('banner.typewriter.decentralizeInventory'),
        t('banner.typewriter.salesTracking'),
        t('banner.typewriter.transparentCoSelling'),
        t('banner.typewriter.increaseEarnings')
    ];

    return (
        <Flex height="100dvh" justifyContent="center" alignItems="center" pos="relative" zIndex="2">
            <VStack justifyContent="center" color="#fff" spacing={4}>
                <Droplinked />

                <Heading
                    as="h2"
                    textAlign="center"
                    fontSize={{ base: '20px', sm: '24px', lg: '32px', xl: '48px' }}
                >
                    {t('banner.heading')}
                </Heading>

                <AppTypography fontSize={{ base: '10px', sm: '20px', xl: '34px' }} display="flex">
                    <Typewriter options={{ strings: typewriterStrings, cursor: '', autoStart: true, loop: true }} />{' '}
                    | {t('banner.typewriter.onchain')}
                </AppTypography>

                <BasicButton
                    minWidth={{ base: '120px', sm: '160px' }}
                    height={{ base: '32px', sm: '40px' }}
                    fontSize={{ base: '12px', sm: '16px' }}
                    fontWeight={600}
                    onClick={handleStartSelling}
                >
                    {t('banner.startSelling')}
                </BasicButton>
            </VStack>
        </Flex>
    );
}

export default Banner;
