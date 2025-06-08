import { Box } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface LevelUpWidgetSectionProps {
  index: number;
  section: {
    title: string;
    objectField: string;
  };
  isCompleted: boolean;
  setCurrentSection: (index: number) => void;
  setCurrentSubSection: (index: number) => void;
  onOpen: () => void;
}

const LevelUpWidgetSection = ({ index, section, isCompleted, setCurrentSection, setCurrentSubSection, onOpen }: LevelUpWidgetSectionProps) => {
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
      {isCompleted ? (
        <AppIcons.SidebarTickedCircle width={16} height={16} />
      ) : (
        <AppIcons.SidebarCircle width={16} height={16} />
      )}

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
      <AppIcons.SidebarChevronright width={16} height={16} />
    </Box>
  );
};

export default LevelUpWidgetSection;
