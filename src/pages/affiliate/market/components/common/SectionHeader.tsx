import { Box } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SectionHeader Component
 * Displays a title and an optional "See All" link.
 *
 * @param {string} title - The section title.
 * @param {string} linkText - The text for the navigation link.
 * @param {string} linkTo - The destination URL for the link.
 */
export const SectionHeader = ({ title, linkText, linkTo }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
    {/* Section Title */}
    <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontWeight="700" lineHeight="32px" textColor={'white'}>
      {title}
    </AppTypography>

    {/* Optional Navigation Link */}
    <Link to={linkTo}>
      <AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontWeight="500" lineHeight="24px" textDecorationLine="underline">
        {linkText}
      </AppTypography>
    </Link>
  </Box>
);
