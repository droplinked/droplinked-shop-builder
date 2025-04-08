import { Box } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

const GrowthHackSection = ({ index, section, isCompleted, setCurrentSection, setCurrentSubSection, onOpen }) => {
  return (
    <Box
      display="flex"
      padding="12px"
      alignItems="center"
      gap="12px"
      alignSelf="stretch"
      onClick={() => {
        setCurrentSection(index);
        setCurrentSubSection(0);
        onOpen();
      }}
      width="100%"
      cursor="pointer"
    >
      {/* Status Icon */}
      {isCompleted ? <AppIcons.SidebarTickedCircle width="16px" height="16px" /> : <AppIcons.SidebarCircle width="16px" height="16px" />}

      {/* Section Title */}
      <AppTypography
        align="left"
        width="full"
        flex="1 0 0"
        color={isCompleted ? '#2BCFA1' : '#FFF'}
        fontSize="12px"
        fontWeight="500"
        lineHeight="16px"
        textDecoration={isCompleted ? 'line-through' : 'none'}
      >
        {section?.title}
      </AppTypography>

      {/* Arrow Icon */}
      <AppIcons.SidebarChevronright color='white' />
    </Box>
  );
};

export default GrowthHackSection;
