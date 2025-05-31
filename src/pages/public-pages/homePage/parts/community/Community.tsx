import { Flex, Image } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';

function Community() {
    const { t } = useLocaleResources("homePage");

    return (
        <Flex justifyContent="center">
            <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems="center" gap={8}>
                <Image src="assets/images/homepage/com.svg" width={{ base: '100%', lg: '50%' }} />
                <Flex direction="column" width={{ base: '100%', lg: '40%' }} gap={{ base: 4, lg: 8 }}>
                    <AppTypography
                        textAlign={{ base: 'center', lg: 'left' }}
                        color="#fff"
                        fontSize={{ base: '24px', lg: '32px' }}
                        fontWeight="bold"
                    >
                        {t('community.title')}
                    </AppTypography>
                    <AppTypography
                        textAlign={{ base: 'center', lg: 'left' }}
                        color="#888"
                        fontSize={{ base: '16px', lg: '20px' }}
                    >
                        {t('community.description')}
                    </AppTypography>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Community;
