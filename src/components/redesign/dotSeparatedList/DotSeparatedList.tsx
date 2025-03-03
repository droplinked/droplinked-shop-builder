import { Box } from '@chakra-ui/react';
import React from 'react';

/**
 * DotSeparatedList displays a horizontal list of children separated by circles.
 * This component is ideal for creating visually distinct sections between inline items.
 */
const DotSeparatedList = ({ children }) => {
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

export default DotSeparatedList;
