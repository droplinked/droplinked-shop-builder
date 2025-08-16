import { Box, Flex } from '@chakra-ui/react';
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useBlogs from '../../hooks/useBlogs';
import CategoryCard from './CategoryCard';
import SectionTitle from '../common/SectionTitle';

function TopCategoriesSection() {
  const { categories, isLoading } = useBlogs();
  const { t } = useTranslation('public-pages/public-blogs');

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Box
      display="inline-flex"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={6}
    >
      <SectionTitle>
        {t('TopCategoriesSection.sectionTitle')}
      </SectionTitle>

      <Flex alignItems="flex-start" gap={6}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            categoryId={category.id}
            categoryName={category.name}
          />
        ))}
      </Flex>
    </Box>
  );
}

export default TopCategoriesSection;
