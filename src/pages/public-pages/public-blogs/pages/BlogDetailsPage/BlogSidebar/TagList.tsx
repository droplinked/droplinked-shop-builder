import { Badge, Flex, VStack } from '@chakra-ui/react';
import React from 'react';

const TagList: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <VStack spacing={4} align="flex-start" width="100%">
      <Flex wrap="wrap" gap={2}>
        {tags.map((tag) => (
          <Badge
            key={tag}
            px={3}
            py={2}
            color="neutral.white"
            bg="neutral.background"
            fontSize="sm"
            fontWeight="normal"
            borderRadius="lg"
          >
            {tag}
          </Badge>
        ))}
      </Flex>
    </VStack>
  );
};

export default TagList;
