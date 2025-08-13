import { Box } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import D3D3Border from '../../../../assets/D3Border';
import D3D3BorderRed from '../../../../assets/D3BorderRed';
import D3DroplinkedBorder from '../../../../assets/D3DroplinkedBorder';
import D3DroplinkedBorderRed from '../../../../assets/D3DroplinkedBorderRed';
import UDBorder from '../../../../assets/UDBorder';
import UDBorderRed from '../../../../assets/UDBorderRed';
import BaseBorder from 'pages/public-pages/landings/partner-pages/assets/baseBorder';
import BaseBorderRed from 'pages/public-pages/landings/partner-pages/assets/baseBorderRed';

interface SideIconsProps {
  children: React.ReactNode;
  isGreen: boolean;
  color: string;
  partnerId: string;
  sideIconsSize: number;
  sideIconsSizeSm: number;
}

const SideIcons: React.FC<SideIconsProps> = ({
  children,
  isGreen,
  color,
    partnerId,
  sideIconsSize,
  sideIconsSizeSm
}) => {
  // Conditional rendering for partner logos
  const partnerLogo: ReactElement =
    partnerId === 'd3' ? (
      <D3D3Border width="full" height="full" />
    ) : partnerId === 'base' ? (
      <BaseBorder width="full" height="full" />
    ) : (
      <UDBorder width="full" height="full" />
    );
  const partnerLogoRed: ReactElement =
    partnerId === 'd3' ? (
      <D3D3BorderRed width="full" height="full" />
    ) : partnerId === 'Base' ? (
      <BaseBorderRed width="full" height="full" />
    ) : (
      <UDBorderRed width="full" height="full" />
    );

  return (
    <Box
      width="full"
      height="full"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="0px"
    >
      <Box
        width={{ base: '55px', md: '96px' }}
        height={{ base: '55px', md: '96px' }}
      >
        {isGreen ? (
          <D3DroplinkedBorder width="full" height="full" />
        ) : (
          <D3DroplinkedBorderRed width="full" height="full" />
        )}
      </Box>
      <Box
        display="flex"
        width={{ base: `${sideIconsSizeSm}px`, md: `${sideIconsSize}px` }}
        height="2px"
        rounded="full"
        alignItems="flex-start"
        gap="8px"
        flexShrink="0"
        background={`linear-gradient(270deg, ${
          isGreen ? '#2D9275' : color
        } 0%, rgba(34, 34, 34, 0.00) 100%)`}
      />
      {children}
      <Box
        display="flex"
        width={{ base: `${sideIconsSizeSm}px`, md: `${sideIconsSize}px` }}
        height="2px"
        rounded="full"
        alignItems="flex-start"
        gap="8px"
        flexShrink="0"
        background={`linear-gradient(90deg, ${
          isGreen ? '#2D9275' : color
        } 0%, rgba(34, 34, 34, 0.00) 100%)`}
      />
      <Box
        width={{ base: '55px', md: '96px' }}
        height={{ base: '55px', md: '96px' }}
      >
        {isGreen ? partnerLogo : partnerLogoRed}
      </Box>
    </Box>
  );
};

export default SideIcons;
