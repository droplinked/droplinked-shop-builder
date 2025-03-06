import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

type props<T> = {
  data: T[]; // Array of data items.
  getValue: (item: T) => number; // Function to extract the numeric value from data item for sizing the bar.
  getLabel: (item: T) => string; // Function to extract the label from data item for color mapping.
  colorMap: Record<string, string>; // Map of labels to their corresponding color values.
};

/**
 * Renders a horizontal bar chart with customizable bar sizes and colors.
 * Each bar size is determined by a value from the data item and colored based on its label.
 *
 * @param {Array} data - Data items for the chart.
 * @param {Function} getValue - Extracts the bar size from a data item.
 * @param {Function} getLabel - Extracts the label for color mapping from a data item.
 * @param {Object} colorMap - Color mappings for each label.
 * @returns {React.Component} A flex container with bars represented as boxes.
 */
const HorizontalBarChart = <T,>({ data, getValue, getLabel, colorMap }: props<T>) => {
  return (
    <Flex gap="6px">
      {data
        .filter((item) => getValue(item) > 0) // Only render bars with positive values
        .map((item, index) => (
          <Box
            key={index}
            flex={getValue(item).toString()} // Determines the flex basis of the bar
            h="16px"
            borderRadius="4px"
            bgColor={colorMap[getLabel(item)] || 'gray'} // Color of the bar, defaulting to gray if not mapped
          />
        ))}
    </Flex>
  );
};

export default HorizontalBarChart;
