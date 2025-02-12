import { Box } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { appVersion } from 'lib/utils/app/variable';
import React from 'react';

const AppVersion = () => (
  <Box display="flex" padding="0 16px" justifyContent="space-between">
    <AppTypography color="#7B7B7B" fontSize="14px">Version</AppTypography>
    <AppTypography color="#7B7B7B" fontSize="14px">{appVersion}</AppTypography>
  </Box>
);

export default AppVersion;
