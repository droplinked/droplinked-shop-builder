import { Box, Flex, Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateToShortStyle } from 'utils/helpers/dateUtils';
import { BlogCardFooter } from '../BlogCardFooter';

export interface DiscoverCardProps {
  slug: string;
  category?: string | null;
  title: string;
  writer?: string | null;
  createdAt?: string | Date;
  image?: string | null;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({
  slug,
  category,
  title,
  writer,
  createdAt,
  image
}) => {
  const navigate = useNavigate();
  return (
    <Box
      w="100%"
      h={{ base: '360px', md: '420px', lg: '480px' }}
      p={6}
      position="relative"
      rounded="2xl"
      border="1px solid"
      borderColor="neutral.800"
      display="inline-flex"
      flexDir="column"
      justifyContent="flex-end"
      alignItems="flex-start"
      overflow="hidden"
      backgroundImage={image ? `url(${image})` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      boxShadow="0px 12px 24px rgba(0,0,0,0.15), 0px 72px 128px rgba(0,0,0,0.50)"
      cursor="pointer"
      role="group"
      _hover={{
        transform: 'translateY(-2px)',
        transition: 'transform 0.2s'
      }}
      _groupHover={{
        '& .dot-separated-list': {
          display: 'flex'
        }
      }}
      onClick={() => {
        navigate(`/blogs/${slug}`);
      }}
    >
      {/* Added shadow overlay at bottom */}
      <BlogCardFooter
        category={category}
        title={title}
        writer={writer}
        createdAt={createdAt as string}
      />
    </Box>
  );
};

export default DiscoverCard;
