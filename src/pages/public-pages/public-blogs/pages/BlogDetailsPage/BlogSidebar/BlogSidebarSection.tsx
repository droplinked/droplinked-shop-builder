import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Box
} from '@chakra-ui/react';

interface BlogSidebarSectionProps {
  icon: React.ReactElement;
  title: string;
  children: React.ReactNode;
}

const BlogSidebarSection: React.FC<BlogSidebarSectionProps> = ({
  icon,
  title,
  children
}) => {
  return (
    <VStack spacing={3} align="flex-start" width="100%">
      <HStack spacing={2} justify="flex-start" align="center">
        <Box>
          {icon}
        </Box>
        <Text
          flex={1}
          color="text.subtext.placeholder.dark"
          fontSize="14px"
          fontWeight="normal"
        >
          {title}
        </Text>
      </HStack>
      <Box width="100%">
        {children}
      </Box>
    </VStack>
  );
};

export default BlogSidebarSection;
