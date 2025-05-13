import { Box, Flex, Text} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import SectionHeader from './SectionHeader';

import React from 'react';
import { getPODShippingAvailability } from 'lib/apis/product/productServices';

const ShippingAvailability = ({ productId }: { productId: string }) => {
  // Fetch shipping availability using React Query
  const { data: shippingData, isLoading, error } = useQuery(['shippingAvailability', productId], () => getPODShippingAvailability(productId), { enabled: !!productId });

  // Handle loading and error states
  if (isLoading) {
    return (
      <Flex justify="center" align="center" py={6}>
        <Text fontSize="base" fontWeight="normal" color="gray.500">
          Loading...
        </Text>
      </Flex>
    );
  }

  if (error || !shippingData) {
    return null;
  }

  return (
    <Flex direction="column" gap={6} alignSelf="stretch">
      {/* Header Section */}
      <SectionHeader>Shipping Availability</SectionHeader>

      {/* Content Section */}
      <Flex direction="column" gap={6} alignSelf="stretch" px={6}>
        <Text fontSize="base" fontWeight="normal">
          This product can be shipped to the following regions and countries.
        </Text>

        {/* Regions Section */}
        <Flex direction="column" gap={4} alignSelf="stretch" borderRadius="lg" border="1px solid" borderColor="neutral.gray.800" px={9} py={6}>
          {shippingData.data?.length ? (
            shippingData.data.map((region, index) => (
              <Box key={index} mb={1}>
                <Text fontSize="base" fontWeight="normal" color="text.subtext.placeholder.dark">
                  {region}
                </Text>
              </Box>
            ))
          ) : (
            <Text fontSize="base" fontWeight="normal" color="text.subtext.placeholder.dark">
              No shipping data available.
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ShippingAvailability;
