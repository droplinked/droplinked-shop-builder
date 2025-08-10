import { Flex, Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import SectionContainer from 'pages/public-pages/landings/_shared/components/SectionContainer/SectionContainer';
import Breadcrumbs from 'pages/public-pages/public-blogs/components/Breadcrumbs';
import React from 'react';

interface BlogHeaderProps {
  title: string;
  writer?: string;
  readTime?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, writer, readTime }) => {
  return (
    <SectionContainer
      maxWidth="865px"
      paddingBlockStart={{ base: '48px', lg: '80px' }}
      paddingBlockEnd={{ base: '36px', lg: '48px' }}
      marginInline="auto"
    >
      <Flex flexDirection="column" gap={4} align="center">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blogs', to: '/blog' }
          ]}
        />

        {/* Title */}
        <Text
          textAlign="center"
          color="neutral.white"
          fontSize={{ base: '24px', md: '36px', xl: '48px' }}
          fontWeight="medium"
          lineHeight="52px"
        >
          {title}
        </Text>

        {/* Author and Read Time */}
        <DotSeparatedList
          fontSize={{ base: '14px', md: '16px' }}
          fontWeight="400px"
        >
          <Text color="neutral.white">{writer}</Text>
          <Text color="text.subtext.placeholder.dark">{readTime} Mins Read</Text>
        </DotSeparatedList>
      </Flex>
    </SectionContainer>
  );
};

export default BlogHeader;
