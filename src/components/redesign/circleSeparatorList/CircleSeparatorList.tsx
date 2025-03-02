import { Box } from '@chakra-ui/react';
import React from 'react';

/**
 * CircleSeparatorList displays a horizontal list of children separated by circles.
 * This component is ideal for creating visually distinct sections between inline items.
 */
const CircleSeparatorList = ({ children }) => {
  return (
    <Box display="flex" alignItems="center">
      {React.Children.map(children, (child, index) => (
        <>
          {child}
          {index < React.Children.count(children) - 1 && <Box width="5px" height="5px" borderRadius="50%" bgColor="#292929" mx={2} />}
        </>
      ))}
    </Box>
  );
};

export default CircleSeparatorList;
