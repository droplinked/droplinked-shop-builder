import React from 'react';
import {
  Box,
  VStack
} from '@chakra-ui/react';
import BlogContentRenderer from './BlogContentRenderer';

interface BlogContentProps {
  blog: any; // You can replace 'any' with your specific blog type
}

const BlogContent: React.FC<BlogContentProps> = ({ blog }) => {
  return (
    <Box flex={1}>
      <VStack spacing={12} align="flex-start">
        <VStack spacing={6} align="flex-start" width="100%">
          {/* Blog Content */}
          <BlogContentRenderer blog={blog} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default BlogContent; 