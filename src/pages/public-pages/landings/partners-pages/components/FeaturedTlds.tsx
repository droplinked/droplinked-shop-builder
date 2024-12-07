import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const FeaturedTlds = () => {
  const tldsRow1 = ['.tech', '.moon', '.store', '.pudgy', '.unstoppable', '.io', '.com', '.net', '.org', '.pro', '.site'];
  const tldsRow2 = ['.dream', '.live', '.space', '.group', '.life', '.digital', '.secret', '.polygon', '.pw', '.info'];

  const calculateOpacity = (index: number, totalItems: number) => {
    const center = totalItems / 2;
    const distanceFromCenter = Math.abs(index - center);
    const maxOpacity = 0.8;
    const minOpacity = 0.1; 
    return maxOpacity - (distanceFromCenter / center) * (maxOpacity - minOpacity);
  };

  return (
    <Box h="212px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16">
      {/* Title Section */}
      <Flex direction="column" justify="start" align="center" gap="6">
        <Text fontSize="32px" fontWeight="bold" fontFamily="Inter" textAlign="center" color="white" lineHeight="48px">
          Featured TLD's
        </Text>
      </Flex>

      {/* TLD List Section */}
      <Box h="100px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="9">
        {/* First Row of TLDs */}
        <Flex wrap="nowrap" justify="center" align="center" gap="16">
          {tldsRow1.map((tld, index) => (
            <Text
              key={tld}
              fontSize="xl"
              fontWeight="bold"
              fontFamily="Inter"
              lineHeight="loose"
              color="white"
              opacity={calculateOpacity(index, tldsRow1.length)} 
            >
              {tld}
            </Text>
          ))}
        </Flex>

        {/* Second Row of TLDs */}
        <Flex wrap="nowrap" justify="center" align="center" gap="16">
          {tldsRow2.map((tld, index) => (
            <Text
              key={tld}
              fontSize="xl"
              fontWeight="bold"
              fontFamily="Inter"
              lineHeight="loose"
              color="white"
              opacity={calculateOpacity(index, tldsRow2.length)}
            >
              {tld}
            </Text>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default FeaturedTlds;
