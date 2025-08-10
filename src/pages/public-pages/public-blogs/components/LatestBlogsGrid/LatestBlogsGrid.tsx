import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import { ExternalarrowLg } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowLg';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import { BlogLg } from 'assets/icons/System/Blog/BlogLg';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import useBlogs from '../../hooks/useBlogs';
import { formatDateToShortStyle } from 'utils/helpers';
import { BlogCardFooter } from '../common/BlogCardFooter';

/**
 * LatestBlogsGrid Component
 *
 * Displays a responsive grid of the latest 3 blog posts with different layouts:
 * - Base (mobile): Single column with 3 cards stacked vertically
 * - MD (tablet): Two columns with first blog in right column, second and third in left column
 * - XL (desktop): Three columns with complex layout including image cards and text-only cards
 *
 * The component uses a complex responsive design where the same blog data is displayed
 * in different card styles depending on screen size and position.
 */
function LatestBlogsGrid() {
  const navigate = useNavigate();

  // Track which card is currently being hovered for showing external arrow icon
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Fetch latest blogs using custom hook
  const { getLatestBlogs, isLoading } = useBlogs();
  const latestBlogs = !isLoading ? getLatestBlogs(3) : [];

  // Extract individual blog posts for easier reference
  const firstBlog = latestBlogs[0];
  const secondBlog = latestBlogs[1];
  const thirdBlog = latestBlogs[2];

  /**
   * Formats a date string to a readable format (e.g., "15 Jan, 2024")
   * @param dateString - ISO date string from blog data
   * @returns Formatted date string or empty string if no date provided
   */

  return (
    <Box
      w="full"
      h={{ base: 'auto', xl: '680px' }}
      display="inline-flex"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={6}
    >
      <SectionTitle>Trending</SectionTitle>

      {/* Main grid container - responsive layout changes based on screen size */}
      <Flex
        gap="16px"
        w="full"
        direction={{ base: 'column', md: 'row', xl: 'row' }}
      >
        {/* LEFT COLUMN - Contains first blog in different styles */}
        <Flex
          display={{ base: 'flex', md: 'none', xl: 'flex' }}
          flex={{ base: 'initial', xl: '1' }}
          h={{ base: 'auto', xl: 'full' }}
          direction="column"
          justify="flex-start"
          align="flex-start"
          gap={6}
          overflow="hidden"
        >
          {/* 
            CARD 1: Text-only card (XL only)
            - Shows first blog in a dark background card
            - Only visible on XL screens
            - Uses neutral.900 background instead of image
          */}
          <Box
            display={{
              base: 'none',
              xl: 'flex'
            }}
            data-state="Hover"
            p={6}
            position="relative"
            bg="neutral.900"
            rounded="2xl"
            outline="1px solid"
            outlineColor="neutral.800"
            flexDir="column"
            justifyContent="flex-end"
            alignItems="flex-start"
            gap={4}
            overflow="hidden"
            onMouseEnter={() => setHoveredCard('card1')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/blogs/${firstBlog?.slug}`)}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            _hover={{
              outlineColor: 'neutral.700',
              transform: 'translateY(-2px)'
            }}
          >
            <Flex w="full" justify="space-between" align="flex-start">
              <IconWrapper bg="neutral.backgroundDark" icon={<BlogLg />} />
              {/* Show external arrow on hover */}
              {hoveredCard === 'card1' && (
                <Box position="absolute" top={6} right={6} zIndex={10}>
                  <ExternalarrowLg />
                </Box>
              )}
            </Flex>
            <Flex
              direction="column"
              justify="flex-start"
              align="flex-start"
              gap={2}
              w="full"
            >
              <Flex direction="column" justify="center" align="center" gap={2}>
                <Text
                  color="text.subtext.placeholder.light"
                  fontSize="base"
                  fontWeight="normal"
                  lineHeight="normal"
                >
                  {firstBlog?.category}
                </Text>
              </Flex>
              <Text
                w="full"
                color="white"
                fontSize="xl"
                fontWeight="medium"
                lineHeight="loose"
              >
                {firstBlog?.title}
              </Text>
            </Flex>
          </Box>

          {/* 
            CARD 2: Image card (Base and XL)
            - Shows first blog with background image
            - Visible on base (mobile) and XL screens
            - Hidden on MD screens (duplicated in right column for MD)
          */}
          <Box
            display={{ base: 'flex', md: 'none', xl: 'flex' }}
            data-state="Default"
            w={{ base: 'full', md: 'auto' }}
            h={{ base: '360px', xl: '96' }}
            p={6}
            position="relative"
            rounded="2xl"
            outline="1px solid"
            outlineColor="neutral.800"
            flexDir="column"
            justifyContent="flex-end"
            overflow="hidden"
            onMouseEnter={() => setHoveredCard('card2')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/blogs/${firstBlog?.slug}`)}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            role="group"
            _hover={{
              outlineColor: 'neutral.700',
              transform: 'translateY(-2px)'
            }}
            bgImage={firstBlog?.image ? `url(${firstBlog.image})` : undefined}
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
          >
            {/* Gradient overlays for better text readability on XL screens */}
            <Box
              w="96"
              h="56"
              position="absolute"
              left={0}
              top="160px"
              bgGradient="linear(to-b, blackAlpha.0, blackAlpha.0)"
              display={{ base: 'none', xl: 'block' }}
            />

            {/* Show external arrow on hover */}
            {hoveredCard === 'card2' && (
              <Box position="absolute" top={6} right={6} zIndex={10}>
                <ExternalarrowLg />
              </Box>
            )}
            {/* Added shadow/blur overlay at bottom */}
            <BlogCardFooter
              category={firstBlog?.category}
              title={firstBlog?.title}
              writer={firstBlog?.writer}
              createdAt={firstBlog?.createdAt}
            />
          </Box>
        </Flex>

        {/* CENTER COLUMN - Contains second blog */}
        {/* 
          CARD 3: Main feature card (all screen sizes)
          - Shows second blog with background image
          - Takes full width on base, flex: 1 on MD, auto on XL
          - Includes author and date information
        */}
        <Box
          data-state="Hover"
          w={{ base: 'full', md: 'auto' }}
          h={{ base: '360px', md: 'auto', xl: 'full' }}
          flex={{ base: 'initial', md: 1, xl: 'initial' }}
          p={6}
          position="relative"
          rounded="2xl"
          outline="1px solid"
          outlineColor="neutral.800"
          display="inline-flex"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          overflow="hidden"
          onMouseEnter={() => setHoveredCard('card3')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate(`/blogs/${secondBlog?.slug}`)}
          cursor="pointer"
          transition="all 0.2s ease-in-out"
          role="group"
          _hover={{
            outlineColor: 'neutral.700',
            transform: 'translateY(-2px)'
          }}
          bgImage={secondBlog?.image ? `url(${secondBlog.image})` : undefined}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        >
          {/* Show external arrow on hover */}
          {hoveredCard === 'card3' && (
            <Box position="absolute" top={6} right={6} zIndex={10}>
              <ExternalarrowLg />
            </Box>
          )}

          <BlogCardFooter
            category={secondBlog?.category}
            title={secondBlog?.title}
            writer={secondBlog?.writer}
            createdAt={secondBlog?.createdAt}
          />
        </Box>

        {/* RIGHT COLUMN - Contains first blog (MD only) and third blog */}
        <Flex
          flex={{ base: 'initial', md: 1, xl: '1' }}
          h={{ base: 'auto', md: 'auto', xl: 'full' }}
          direction="column"
          justify="flex-start"
          align="flex-start"
          gap={6}
          overflow="hidden"
        >
          {/* 
            CARD 2 DUPLICATE: First blog image card (MD only)
            - Duplicate of card 2 but only visible on MD screens
            - This creates the MD layout where first blog appears in right column
          */}
          <Box
            display={{ base: 'none', md: 'flex', xl: 'none' }}
            data-state="Default"
            w={{ md: 'full' }}
            h={{ md: '360px' }}
            p={6}
            position="relative"
            rounded="2xl"
            outline="1px solid"
            outlineColor="neutral.800"
            flexDir="column"
            justifyContent="flex-end"
            alignItems="center"
            gap={6}
            overflow="hidden"
            onMouseEnter={() => setHoveredCard('card2')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/blogs/${firstBlog?.slug}`)}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            _hover={{
              outlineColor: 'neutral.700',
              transform: 'translateY(-2px)'
            }}
            bgImage={firstBlog?.image ? `url(${firstBlog.image})` : undefined}
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
          >
            {/* Note: Gradients are hidden on MD screens for this duplicate */}
            <Flex
              flex="1"
              direction="column"
              justify="flex-end"
              align="flex-start"
              gap={2}
              w="full"
            >
              <Flex direction="column" justify="center" align="center" gap={2}>
                <Text
                  color="text.subtext.placeholder.light"
                  fontSize="base"
                  fontWeight="normal"
                  lineHeight="normal"
                >
                  {firstBlog?.category}
                </Text>
              </Flex>
              <Text
                w="full"
                color="white"
                fontSize="xl"
                fontWeight="medium"
                lineHeight="loose"
              >
                {firstBlog?.title}
              </Text>
            </Flex>
          </Box>

          {/* 
            CARD 4: Third blog image card (all screen sizes)
            - Shows third blog with background image
            - Similar to card 2 but uses third blog data
          */}
          <Box
            data-state="Default"
            w={{ base: 'full', md: 'auto' }}
            flex={{ base: 'initial', xl: '1' }}
            h={{ base: '360px', md: '360px', xl: 'full' }}
            p={6}
            position="relative"
            rounded="2xl"
            outline="1px solid"
            outlineColor="neutral.800"
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            overflow="hidden"
            onMouseEnter={() => setHoveredCard('card4')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/blogs/${thirdBlog?.slug}`)}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            _hover={{
              outlineColor: 'neutral.700',
              transform: 'translateY(-2px)'
            }}
            bgImage={thirdBlog?.image ? `url(${thirdBlog.image})` : undefined}
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
            role="group"
          >
            {/* Show external arrow on hover */}
            {hoveredCard === 'card4' && (
              <Box position="absolute" top={6} right={6} zIndex={10}>
                <ExternalarrowLg />
              </Box>
            )}

            <BlogCardFooter
              category={thirdBlog?.category}
              title={thirdBlog?.title}
              writer={thirdBlog?.writer}
              createdAt={thirdBlog?.createdAt}
            />
          </Box>

          {/* 
            CARD 5: Third blog text-only card (XL only)
            - Shows third blog in a dark background card
            - Only visible on XL screens
            - Uses neutral.900 background instead of image
          */}
          <Box
            display={{
              base: 'none',
              xl: 'flex'
            }}
            data-state="Default"
            p={6}
            bg="neutral.900"
            rounded="2xl"
            outline="1px solid"
            outlineColor="neutral.800"
            flexDir="column"
            justifyContent="flex-end"
            alignItems="flex-start"
            gap={4}
            overflow="hidden"
            onMouseEnter={() => setHoveredCard('card5')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/blogs/${thirdBlog?.slug}`)}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            _hover={{
              outlineColor: 'neutral.700',
              transform: 'translateY(-2px)'
            }}
          >
            <Flex w="full" justify="space-between" align="flex-start">
              <IconWrapper bg="neutral.backgroundDark" icon={<BlogLg />} />
              {/* Show external arrow on hover */}
              {hoveredCard === 'card5' && (
                <Box position="absolute" top={6} right={6} zIndex={10}>
                  <ExternalarrowLg />
                </Box>
              )}
            </Flex>
            <Flex
              direction="column"
              justify="flex-start"
              align="flex-start"
              gap={2}
              w="full"
            >
              <Flex direction="column" justify="center" align="center" gap={2}>
                <Text
                  color="text.subtext.placeholder.light"
                  fontSize="base"
                  fontWeight="normal"
                  lineHeight="normal"
                >
                  {thirdBlog?.category}
                </Text>
              </Flex>
              <Text
                w="full"
                color="white"
                fontSize="xl"
                fontWeight="medium"
                lineHeight="loose"
              >
                {thirdBlog?.title}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default LatestBlogsGrid;
