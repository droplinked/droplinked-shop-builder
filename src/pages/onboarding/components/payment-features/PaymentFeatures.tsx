import { Box, Grid, VStack } from '@chakra-ui/react';
import React from 'react';
import PaymentFeatureCard from './PaymentFeatureCard';
import RightSectionWrapper from '../common/RightSectionWrapper';

const PaymentFeatures: React.FC = () => {
  const cards = [
    {
      headerImage: 'https://upload-file-droplinked.s3.amazonaws.com/9dd559abebea2e8df9a67a48c8a2ed83ae71a83fabd6bc4bd7873fd488e4a079.png',
      title: 'Merchant Wallet',
      description: 'The merchant wallet enables USDC acceptance for all businesses. It offers a secure and seamless way to manage revenue while minimizing merchant processing fees.'
    },
    {
      headerImage: 'https://upload-file-droplinked.s3.amazonaws.com/fb4e0cbbf67b013a119b828689419cfd3c1bf4202e25177028360e79c9e1c389.png',
      title: 'Customizable Currency Preferences',
      description: 'Choose your preferred fiat or crypto currencies.'
    },
    {
      headerImage: 'https://upload-file-droplinked.s3.amazonaws.com/e6b6751f0915047f0ea199e8d3b515341ee854195eac4f9aa514a0af6f4a4a92.png',
      title: 'Tokenpay',
      description: 'Enable acceptance of thousands of various digital assets.'
    }
  ];

  return (
    <RightSectionWrapper>
      <VStack w="100%" spacing={6}>
        <Box w="100%">
          <PaymentFeatureCard {...cards[0]} objectFit="contain" />
        </Box>
        <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={6} w="100%">
          <Box w="100%">
            <PaymentFeatureCard {...cards[1]} />
          </Box>
          <Box w="100%">
            <PaymentFeatureCard {...cards[2]} />
          </Box>
        </Grid>
      </VStack>
    </RightSectionWrapper>
  );
};

export default PaymentFeatures;
