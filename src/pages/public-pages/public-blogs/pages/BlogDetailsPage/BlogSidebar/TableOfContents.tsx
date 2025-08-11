import React from 'react';
import {
  VStack,
  Box,
  Text
} from '@chakra-ui/react';

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeItemId?: string;
  onItemClick?: (itemId: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeItemId,
  onItemClick
}) => {
  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    } else {
      // Default behavior: scroll to element
      const element = document.getElementById(itemId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <VStack
      borderLeft="2px solid"
      borderColor='neutral.gray.800'
      align="flex-start"
      width="100%"
    >
      {items.length > 0 ? (
        items.map((item, index) => {
          const isActive = item.id === activeItemId;
          return (
            <Box 
              key={item.id} 
              pl={4} 
              py={2} 
              width="100%"
              cursor="pointer"
              onClick={() => handleItemClick(item.id)}
              position="relative"
              transition="all 0.2s ease"
              borderLeft={isActive ? '2px solid' : '2px solid transparent'}
              borderLeftColor={isActive ? 'white' : 'transparent'}
              marginLeft={isActive ? '-2px' : '0'}
            >
              <Text
                color={isActive ? 'white' : 'text.subtext.placeholder.dark'}
                fontSize="base"
                fontWeight={isActive ? 'medium' : 'normal'}
                transition="all 0.2s ease"
              >
                {item.text}
              </Text>
            </Box>
          );
        })
      ) : (
        <Box pl={4} py={2} width="100%">
          <Text
            color="neutral.gray.400"
            fontSize="base"
            fontWeight="normal"
          >
            No headings found in this article
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default TableOfContents;
