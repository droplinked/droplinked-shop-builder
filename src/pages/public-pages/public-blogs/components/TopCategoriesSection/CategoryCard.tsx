import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


function CategoryCard({ categoryId, categoryName }: { categoryId: string; categoryName: string }) {
    return (
        <Link to={`/blogs/categories/${categoryId}`}>
            <Box
            key={categoryId}
            p={6}
            borderRadius="2xl"
            border="1px"
            bg="neutral.background"
            borderColor="neutral.gray.800"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-end"
            gap={4}
            overflow="hidden"
            
          >
            <Box
              w="2px"
              alignSelf="stretch"
              bg="main.primary"
              borderRadius="sm"
            />
            <Text
              flex="1"
              color="white"
              fontSize="xl"
              fontWeight="medium"
              lineHeight="loose"
            >
              {categoryName}
            </Text>
          </Box>
        </Link>
    )
}

export default CategoryCard 