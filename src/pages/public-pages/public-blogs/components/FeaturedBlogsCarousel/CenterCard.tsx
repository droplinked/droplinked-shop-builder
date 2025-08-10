import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateToShortStyle } from 'utils/helpers/dateUtils';
import { IBlogListItem } from '../../types/blog.types';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import { ExternalarrowLg } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowLg';

interface CenterCardProps {
  slide: IBlogListItem;
}

export function CenterCard({ slide }: CenterCardProps) {
  return (
    <Box
      w={{ base: '100%', md: '636px' }}
      pb={9}
      display="inline-flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
    >
      <Box
        as={Link}
        to={`/blog/${slide.slug}`}
        data-state="Hover"
        w={{ base: '100%', md: '636px' }}
        h={{ base: '384px', md: '480px' }}
        p={6}
        position="relative"
        borderRadius="xl"
        boxShadow="0px 12px 24px rgba(0,0,0,0.15), 0px 72px 128px rgba(0,0,0,0.50)"
        border="1px"
        borderColor="neutral.800"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={4}
        overflow="hidden"
        backgroundImage={`url(${slide.image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        sx={{
          "&:hover .arrow-box": {
            opacity: 1
          }
        }}
      >
        <Box
          w="636px"
          h="320px"
          left={0}
          top="160px"
          position="absolute"
          bgGradient="linear(to-b, blackAlpha.0, blackAlpha.0)"
        />
        <Box
          w="684px"
          h="480px"
          left="-24px"
          top={0}
          position="absolute"
          bgGradient="linear(to-b, blackAlpha.0, blackAlpha.25, blackAlpha.75)"
        />
        {/* Added shadow overlay at bottom */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="400px"
          background="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)"
          zIndex={1}
        />
        <Box
          className="arrow-box"
          alignSelf="stretch"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
          gap={1}
          opacity={0}
          transition="opacity 0.2s ease-in-out"
        >
          <Box
            data-left-icon="true"
            data-right-icon="false"
            data-size="40"
            data-state="Default"
            data-style="Secondary"
            data-text="False"
            p={2.5}
            bg="blackAlpha.200"
            borderRadius="lg"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <ExternalarrowLg/>
          </Box>
        </Box>
        <Box
          alignSelf="stretch"
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          gap={2}
          position="relative"
          zIndex={2}
        >
          <Box
            data-state="Default"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Text
              color="text.subtext.placeholder.light"
              fontSize={{base: ' ', md: '16px'}}
              fontWeight="normal"
              lineHeight="normal"
            >
              {slide.category}
            </Text>
          </Box>
          <Text
            alignSelf="stretch"
            color="white"
            fontSize={{base: '14px ', md: '24px'}}
            fontWeight="medium"
            lineHeight={9}
          >
            {slide.title}
          </Text>
        </Box>
        <DotSeparatedList zIndex={2}>
          <Text
            color="white"
            fontSize={{base: '18px', md: '16px'}}
            fontWeight="medium"
            lineHeight="normal"
          >
            {slide.writer}
          </Text>
          <Text
            color="text.subtext.placeholder.light"
            fontSize={{base: '14px', md: '16px'}}
            fontWeight="normal"
            lineHeight="normal"
          >
            {formatDateToShortStyle(slide.createdAt)}
          </Text>
        </DotSeparatedList>
      </Box>
    </Box>
  );
}
