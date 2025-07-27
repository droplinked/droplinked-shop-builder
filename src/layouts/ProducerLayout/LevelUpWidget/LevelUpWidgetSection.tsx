import { Box } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import { ChevronleftSm } from 'assets/icons/Navigation/ChevronLeft/ChevronleftSm';
import { ChevronrightSm } from 'assets/icons/Navigation/ChevronRight/ChevronrightSm';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
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
  const {isRTL} = useLocaleResources('common')

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
        textAlign={isRTL ? 'right' : 'left'}
      >
        {section?.title}
      </AppTypography>

      {/* Arrow Icon */}
     {isRTL ? <ChevronleftSm /> : <ChevronrightSm />}
    </Box>
  );
};

export default LevelUpWidgetSection;
