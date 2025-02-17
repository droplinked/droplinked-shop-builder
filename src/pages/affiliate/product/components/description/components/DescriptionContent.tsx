import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import SectionHeader from './SectionHeader';

const DescriptionContent = ({ description }) => {
  return (
    <Flex direction="column" gap={6} alignSelf="stretch">
      {/* Header Section */}
      <SectionHeader>Description</SectionHeader>

      {/* Content Section */}
      <Flex direction="column" gap={6} alignSelf="stretch" px={6}>
        <Box fontSize="base" fontWeight="normal" textAlign="justify">
          <Text
            dangerouslySetInnerHTML={{
              __html: description || 'No description available.'
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DescriptionContent;
