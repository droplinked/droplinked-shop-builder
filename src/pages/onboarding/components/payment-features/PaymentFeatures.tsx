import { Box, Grid, VStack } from '@chakra-ui/react';
import React from 'react';
import PaymentFeatureCard from './PaymentFeatureCard';

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
      headerImage: 'https://upload-file-droplinked.s3.amazonaws.com/d39d7d50feb7f4147ac9ee3fa26a951a3c3100e34b8588c5cd2b25c0467deee0.png',
      title: 'Tokenpay',
      description: 'Enable acceptance of thousands of various digital assets.'
    }
  ];

  return (
    <VStack w="100%" spacing={6}>
      <Box w="100%">
        <PaymentFeatureCard {...cards[0]} />
      </Box>
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6} w="100%">
        <Box w="100%">
          <PaymentFeatureCard {...cards[1]} />
        </Box>
        <Box w="100%">
          <PaymentFeatureCard {...cards[2]} />
        </Box>
      </Grid>
    </VStack>
  );
};

export default PaymentFeatures;
