import { VStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

/**
 * AffiliateMarketHero Component
 * Displays a hero banner for the Affiliate Market page.
 */
export const AffiliateMarketHero = () => {
  return (
    <VStack
      alignItems="center"
      width="full"
      justifyContent="center"
      height="360px"
      backgroundImage={'https://upload-file-droplinked.s3.amazonaws.com/bf3bda9191edadbd12d03397827db60fefef7a6ea261185ff87c3df11fadffbe.png'}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      borderRadius="8px"
      border="1.5px solid"
      borderColor="neutral.gray.800"
    >
      {/* Text container */}
      <VStack display="inline-flex" flexDirection="column" alignItems="center" spacing="16px">
        <AppTypography
          color="#FFF"
          maxW={{ base: '90%', md: '80%' }} 
          textAlign="center"
          fontSize={{ base: '24px', md: '28px', lg: '32px', xl: '36px' }}
          fontWeight="700"
          lineHeight="3.5rem"
        >
          Explore communities and companies on droplinked
        </AppTypography>
      </VStack>
    </VStack>
  );
};
