import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import React from 'react';

interface Props {
  price: number; // Item price
  commission: number; // Commission percentage
  shopDetails?: any; // Shop/producer details (name, logo)
  availableItems?: number; // Number of available items
}

// Main card component displaying producer info and stats
const ProducerInfoCard = ({ price, commission, shopDetails, availableItems }: Props) => {
  const profitPerSale = (price * commission) / 100; // Calculate profit per sale

  return (
    <Box
      p="6"
      w="100%"
      bg="#1b1b1b"
      borderRadius="lg"
      display="flex"
      flexDirection={{ base: 'column', xl: 'row' }}
      alignItems={{ base: 'flex-start', xl: 'center' }}
      gap={{ base: '4', xl: '0' }}
    >
      <ProducerInfoSection shopDetails={shopDetails} />

      {/* Horizontal divider for mobile */}
      <Box
        display={{ base: 'block', xl: 'none' }}
        width="100%"
        borderBottom="1px solid #3c3c3c"
        mb="4"
        p="0"
      />

      {/* Statistics section */}
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        flex="2"
        gap="6"
        width="100%"
        justify="space-between"
      >
        <StatItem label="Available items" value={availableItems ?? 'N/A'} />
        <DividerComponent />
        <StatItem label="Commission rate" value={`${commission}%`} />
        <DividerComponent />
        <StatItem label="Profit per sale" value={`$${profitPerSale.toFixed(2)}`} />
      </Flex>
    </Box>
  );
};

// Displays producer logo and name
const ProducerInfoSection = ({ shopDetails }: { shopDetails: any }) => (
  <Flex flex="1" align="center" gap="4" overflow="hidden" width="100%">
    <AppImage w="12" h="12" borderRadius="full" src={shopDetails.logo} alt="Producer" />
    <Box flex="1">
      <Text color="#868686" fontSize="sm" fontWeight="normal">
        Producer
      </Text>
      <Text color="#f5f7fa" fontSize="base" fontWeight="medium">
        {shopDetails.name || 'N/A'}
      </Text>
    </Box>
  </Flex>
);

// Displays a single statistic (label and value)
const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <Box flex="1">
    <Text color="#868686" fontSize="sm" fontWeight="normal" whiteSpace={'nowrap'}>
      {label}
    </Text>
    <Text color="#f5f7fa" fontSize="base" fontWeight="medium">
      {value}
    </Text>
  </Box>
);

// Vertical divider for desktop layout
const DividerComponent = () => (
  <Divider
    orientation="vertical"
    borderColor="#3c3c3c"
    height="40px"
    display={{ base: 'none', md: 'block' }}
  />
);


export default ProducerInfoCard;