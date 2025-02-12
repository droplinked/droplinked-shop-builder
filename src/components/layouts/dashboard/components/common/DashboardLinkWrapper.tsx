import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/**
 * DashboardLinkWrapper
 * --------------------
 * A wrapper component that conditionally renders either:
 * - A React Router `Link` for internal navigation
 * - A Chakra UI `ChakraLink` for external navigation
 * - Directly renders children if no `linkTo` is provided
 *
 * @param {string | null} linkTo - The URL to navigate to (internal or external)
 * @param {boolean} [isExternalLink] - Determines if the link is external (opens in a new tab)
 * @param {React.ReactNode} children - The content inside the link
 */
const DashboardLinkWrapper = ({ linkTo, isExternalLink, children }: { linkTo: string | null; isExternalLink?: boolean; children: React.ReactNode }) => {
  // If no link is provided, render children as-is
  if (!linkTo) return <>{children}</>;

  // Render a React Router Link for internal navigation
  if (!isExternalLink) {
    return (
      <Link style={{ width: '100%' }} to={linkTo}>
        {children}
      </Link>
    );
  }

  // Render a Chakra UI Link for external navigation (opens in a new tab)
  return (
    <ChakraLink style={{ width: '100%' }} href={linkTo} target="_blank" rel="noopener noreferrer">
      {children}
    </ChakraLink>
  );
};

export default DashboardLinkWrapper;
