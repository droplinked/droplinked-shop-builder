import { Flex, Text } from '@chakra-ui/react';
import Breadcrumbs from 'pages/public-pages/public-blogs/components/Breadcrumbs';
import SectionContainer from 'pages/public-pages/landings/_shared/components/SectionContainer/SectionContainer';
import React from 'react';

interface CategoryHeaderProps {
  category?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
  return (
    <SectionContainer paddingBlockStart={{base:"48px", lg:"80px"}} paddingBlockEnd={{base:"36px", lg:"48px"}}>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blogs', to: '/blog' },
            { label: 'Categories', to: '/blog/categories' },
            { label: category || 'General' }
          ]}
        />
        <Text
          alignSelf="stretch"
          textAlign="center"
          color="white"
          fontSize="6xl"
          fontWeight="medium"
          lineHeight="72px"
        >
          {category || 'General'}
        </Text>
      </Flex>
    </SectionContainer>
  );
};

export default CategoryHeader;
