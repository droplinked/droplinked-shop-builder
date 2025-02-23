import { Box, Flex, Link, Text } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import { SocialMediaItem } from 'pages/dashboard/types/dashboard.types';
import React from 'react';

interface Props {
  linkData: SocialMediaItem;
}

function SocialMediaLink({ linkData }: Props) {
  const { icon, label, hoverEffect, url } = linkData;

  return (
    <Link
      href={url}
      target="_blank"
      display="flex"
      flexDirection="column"
      gap={{ base: 4, md: 6 }}
      padding={{ base: 4, lg: 6 }}
      transition="all 0.2s"
      position="relative"
      overflow="hidden"
      _hover={{
        bg: hoverEffect,
        '.link-arrow': { opacity: 1 },
        '.icon-container': {
          bg: 'rgba(255, 255, 255, 0.20)',
          borderColor: 'rgba(255, 255, 255, 0.20)'
        }
      }}
    >
      {/* Background Icon Layer with Gradient */}
      <Box position="absolute" top={'-24px'} right={'-24px'} bottom={0} pointerEvents="none" zIndex={0} opacity={0.2}>
        <Box
          width="150px"
          height="150px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          sx={{
            '& > *': {
              maskImage: 'radial-gradient(circle at 19px 107px, black 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at 19px 107px, black 0%, transparent 100%)',
              filter: 'brightness(20%)',
              transition: 'filter 0.2s ease'
            },
            '&:hover > *': {
              filter: 'brightness(100%)'
            }
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Original Foreground Icon */}
      <IconWrapper icon={icon} className="icon-container" position="relative" zIndex={1} />

      <Flex alignItems="center" gap="6px" position="relative" zIndex={1}>
        <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#fff">
          {label}
        </Text>
        <Box className="link-arrow" opacity={0}>
          <AppIcons.ExternalArrow />
        </Box>
      </Flex>
    </Link>
  );
}

export default SocialMediaLink;
