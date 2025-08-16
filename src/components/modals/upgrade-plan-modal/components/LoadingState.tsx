import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

interface LoadingStateProps {
  isDrawer?: boolean;
}

export function LoadingState({ isDrawer = false }: LoadingStateProps) {
  return (
    <Box
      w="100%"
      minHeight={isDrawer ? 'auto' : '432px'}
      p={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="lg" color="main.primary" />
    </Box>
  );
}