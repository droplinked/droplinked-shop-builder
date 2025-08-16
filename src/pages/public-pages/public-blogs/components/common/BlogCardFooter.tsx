import { Box, Flex, Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateToShortStyle } from 'utils/helpers/dateUtils';

export function BlogCardFooter({
  category,
  title,
  writer,
  createdAt
}: {
  category: string;
  title: string;
  writer: string;
  createdAt: string;
}) {
  const { t } = useTranslation('public-pages/public-blogs');
  return (
    <>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="400px"
        background="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)"
      />

      <Flex
        w="full"
        flex="1"
        flexDir="column"
        justify="flex-end"
        align="flex-start"
        gap={2}
        position="relative"
        zIndex={2}
        transition="all 0.5s ease-out"
        _groupHover={{
          transform: 'translateY(-10px)'
        }}
      >
        <Text
          color="text.subtext.placeholder.light"
          fontSize={{ base: '14px', lg: '16px' }}
          fontFamily="Inter"
        >
          {category || t('BlogCard.defaultCategory')}
        </Text>
        <Text
          color="white"
          fontSize={{ base: '16px', lg: '20px' }}
          fontWeight="medium"
          fontFamily="Inter"
          lineHeight="loose"
          noOfLines={3}
        >
          {title}
        </Text>
      </Flex>

      <DotSeparatedList
        dotColor="text.subtext.placeholder.light"
        zIndex={2}
        height={0}
        overflow="hidden"
        opacity={0}
        transform="translateY(20px)"
        transition="all 0.5s ease-out"
        _groupHover={{
          height: 'auto',
          opacity: 1,
          overflow: 'visible',
          transform: 'translateY(0px)'
        }}
        fontSize={{ base: '14px', lg: '16px' }}
      >
        <Text color="white" fontWeight="medium" fontFamily="Inter">
          {writer}
        </Text>
        <Text color="text.subtext.placeholder.light" fontFamily="Inter">
          {formatDateToShortStyle(createdAt)}
        </Text>
      </DotSeparatedList>
    </>
  );
}
