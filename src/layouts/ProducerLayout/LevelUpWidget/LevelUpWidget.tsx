import { Box, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';

import React, { useEffect, useState } from 'react';
import { getLevelUpSections } from 'data/levelUpSections';
import LevelUpWidgetModal from './LevelUpWidgetModal';
import LevelUpWidgetSection from './LevelUpWidgetSection';
import useLevelUpStore from 'stores/level-up/levelUpStore';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import enLocale from 'locales/layout/levelUp/en.json';
import arLocale from 'locales/layout/levelUp/ar.json';

const LevelUpWidget = () => {
  const { t } = useLocaleResources('layout/levelUp', {
    en: enLocale,
    ar: arLocale
  });
  const levelUpSections = getLevelUpSections(t);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentSubSection, setCurrentSubSection] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { levelUpData, isLoading, fetchLevelUpData } = useLevelUpStore();

  // Fetch level up data if not already loaded
  useEffect(() => {
    if (!levelUpData && !isLoading) fetchLevelUpData();
  }, [levelUpData, isLoading, fetchLevelUpData]);

  // Check if all sections are completed
  const allSectionsCompleted =
    levelUpData &&
    levelUpSections.every(
      (section) => levelUpData.list?.[section.objectField]
    );

  if (allSectionsCompleted) {
    return null;
  }

  return (
    <Box
      padding="16px"
      backgroundImage="https://upload-file-droplinked.s3.amazonaws.com/080341fb6bfdf0e5084f501bfe84500e33e709679e2b0a9aa573b2903010829d.png"
      backgroundSize="cover"
      backgroundPosition="center"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap="16px"
      borderRadius="12px"
      border="1px solid"
      borderColor={'neutral.gray.800'}
      display={{ base: 'none', lg: 'flex' }}
      mt={8}
    >
      {/* Level Up Icon */}
      <Box display="flex" width="32px" height="32px" padding="8px" justifyContent="center" alignItems="center">
        <AppIcons.SidebarAnalytics width="16px" height="16px" />
      </Box>

      {/* Title & Description */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
        <AppTypography color="#FFF" fontSize="14px" fontWeight="500">
          {t('widget.title')}
        </AppTypography>
        <AppTypography color="#FFF" fontSize="12px" fontWeight="400">
          {t('widget.description')}
        </AppTypography>
      </Box>

      {/* Level Up Sections */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius="8px" border="1px solid" borderColor={'neutral.gray.700'}>
        {!isLoading &&
          levelUpSections.map((section, index) => (
            <LevelUpWidgetSection
              key={index}
              index={index}
              section={section}
              isCompleted={levelUpData?.list?.[section.objectField] || false}
              setCurrentSection={setCurrentSection}
              setCurrentSubSection={setCurrentSubSection}
              onOpen={onOpen}
            />
          ))}
      </Box>

      {/* Modal */}
      <LevelUpWidgetModal
        section={levelUpSections[currentSection]}
        currentSubSection={currentSubSection}
        setCurrentSubSection={setCurrentSubSection}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default LevelUpWidget;
