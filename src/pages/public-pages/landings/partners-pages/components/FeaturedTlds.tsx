import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const FeaturedTlds = () => {
  const tldsRow1 = ['.tech', '.moon', '.store', '.pudgy', '.unstoppable', '.io', '.com', '.net', '.org', '.pro', '.site'];
  const tldsRow2 = ['.dream', '.live', '.space', '.group', '.life', '.digital', '.secret', '.polygon', '.pw', '.info'];

  const [visibleItems, setVisibleItems] = useState({ row1: tldsRow1.length, row2: tldsRow2.length });

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setVisibleItems({ row1: 5, row2: 5 });
      } else if (width < 900) {
        setVisibleItems({ row1: 8, row2: 7 });
      } else if (width < 1200) {
        setVisibleItems({ row1: 11, row2: 10 });
      } else {
        setVisibleItems({ row1: tldsRow1.length, row2: tldsRow2.length });
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => {
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [tldsRow1.length, tldsRow2.length]);

  const calculateOpacity = (index, totalItems) => {
    const center = totalItems / 2;
    const distanceFromCenter = Math.abs(index - center);
    const maxOpacity = 0.8;
    const minOpacity = 0.1;
    return maxOpacity - (distanceFromCenter / center) * (maxOpacity - minOpacity);
  };

  const renderTlds = (tlds, visibleCount) =>
    tlds.slice(0, visibleCount).map((tld, index) => (
      <Text
        key={tld}
        fontSize={{ base: 'md', md: 'xl' }}
        fontWeight="bold"
        fontFamily="Inter"
        lineHeight="loose"
        color="white"
        opacity={calculateOpacity(index, visibleCount)}
      >
        {tld}
      </Text>
    ));

  return (
    <Box
      h={{ base: 'auto', md: '100px' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={{ base: '4', md: '9' }}
    >
      <Flex wrap="wrap" justify="center" align="center" gap={{ base: '4', lg: '16' }}>
        {renderTlds(tldsRow1, visibleItems.row1)}
      </Flex>
      <Flex wrap="wrap" justify="center" align="center" gap={{ base: '4', lg: '16' }}>
        {renderTlds(tldsRow2, visibleItems.row2)}
      </Flex>
    </Box>
  );
};

export default FeaturedTlds;
