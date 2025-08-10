import { Box, Image, Text, VStack } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateToShortStyle } from 'utils/helpers/dateUtils';
import { IBlogListItem } from '../types/blog.types';

interface BlogCardProps {
  blog: IBlogListItem;
}

function BlogCard({ blog }: BlogCardProps) {
  const collapseRepeatedWords = (input: string | undefined | null): string => {
    if (!input) return ''
    // Replace adjacent duplicated words like "text text" -> "text"
    return input.replace(/\b(\w+)(\s+\1\b)+/gi, '$1')
  }

  const Meta = () => (
    <DotSeparatedList fontSize="14px">
      <Text color="text.link" fontWeight="medium" lineHeight="tight">
        {blog.category || 'General'}
      </Text>
      <Text
        color="text.subtext.placeholder.dark"
        fontWeight="normal"
        lineHeight="tight"
      >
        {formatDateToShortStyle(blog.createdAt)}
      </Text>
    </DotSeparatedList>
  );

  const Summary = () => (
    <VStack alignSelf="stretch" alignItems="flex-start" spacing="1">
      <Text
        alignSelf="stretch"
        color="white"
        fontSize={{ base: '16px', md: '20px' }}
        fontWeight="medium"
        lineHeight="loose"
      >
        {collapseRepeatedWords(blog.title)}
      </Text>
      <Text
        alignSelf="stretch"
        color="text.subtext.placeholder.dark"
        fontSize={{ base: '14px', md: '16px' }}
        fontWeight="normal"
        lineHeight="normal"
        noOfLines={2}
        textOverflow="ellipsis"
      >
        {collapseRepeatedWords(blog.searchEngineSummary)}
      </Text>
    </VStack>
  );

  return (
    <Link to={`/blog/${blog.slug}`}>
      <Box
        data-state="Default"
        borderRadius="2xl"
        border="1px solid"
        borderColor="neutral.gray.800"
        display="inline-flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="hidden"
        _hover={{
          bg: 'neutral.gray.900',
          cursor: 'pointer'
        }}
      >
        <Image alignSelf="stretch" height="240px" src={blog.image} />
        <Box
          alignSelf="stretch"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="2"
          p={4}
        >
          <Meta />
          <Summary />
        </Box>
      </Box>
    </Link>
  );
}

export default BlogCard;
