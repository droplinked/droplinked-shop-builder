import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  bgColor: string; // Background color of the bar.
  title: string;
}

/** 
 * Renders a stylized title with a colored bar on the left.
 * @param {string} bgColor - Background color of the bar.
 * @param {string} title - Title to be displayed.
 * @returns {React.Component} A flex container with a colored bar and a title.
 */
function StylizedTitle({ bgColor, title }: Props) {
  return (
    <Flex alignItems="center" gap={2}>
      <Box w={1} h={4} borderRadius={4} bgColor={bgColor} />
      <Text fontSize={14} color="#FFF">
        {title}
      </Text>
    </Flex>
  );
}

export default StylizedTitle;
