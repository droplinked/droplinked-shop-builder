import { Box, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import OnboardingPageHeader from '../common/OnboardingPageHeader';

interface OnboardingLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode | null;
  isMobileAuthStep?: boolean;
}

export default function OnboardingLayout({ leftContent, rightContent, isMobileAuthStep = false }: OnboardingLayoutProps) {
  if (!rightContent) return leftContent;

  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '1fr 1.5fr', '3xl': '1fr 2fr' }} h="100vh">
      <Box
        bg={{
          base: 'transparent',
          md: isMobileAuthStep
            ? "url('https://upload-file-droplinked.s3.amazonaws.com/7ff3462bc4e35c7199627f5817a9b8e3d96c2f44baa405af4b53a4422d4d6278.png') no-repeat center center"
            : 'transparent',
          lg: 'transparent'
        }}
        backgroundSize={{ md: isMobileAuthStep ? 'cover' : 'auto' }}
      >
        <Flex
          direction="column"
          gap={isMobileAuthStep ? { base: 4, lg: 12 } : 12}
          p={isMobileAuthStep ? { base: 0, md: '24px', lg: 16 } : { base: 4, md: 6, lg: 16 }}
          borderRadius={isMobileAuthStep ? { md: '16px' } : 'none'}
          bg={isMobileAuthStep ? { base: 'transparent', md: 'neutral.background' } : 'transparent'}
          m={{ base: 0, md: 4, lg: 0 }}
        >
          <OnboardingPageHeader showOnlyImage={isMobileAuthStep} />
          <Box p={isMobileAuthStep ? { base: 4 } : 0}>{leftContent}</Box>
        </Flex>
      </Box>
      {rightContent}
    </Grid>
  );
}
