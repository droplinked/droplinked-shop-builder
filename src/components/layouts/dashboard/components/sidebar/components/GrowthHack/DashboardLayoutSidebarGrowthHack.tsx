import { Box, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useGrowthHackStore from 'lib/stores/growth-hack/useGrowthHackStore';
import React, { useEffect, useState } from 'react';
import { GROWTH_HACK_CONSTANTS } from '../../../../constants';
import DashboardLayoutSidebarGrowthHackModal from './components/DashboardLayoutSidebarGrowthHackModal';
import GrowthHackSection from './components/GrowthHackSection';

const DashboardLayoutSidebarGrowthHack = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentSubSection, setCurrentSubSection] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { growthHackData, isLoading, fetchGrowthHackData } = useGrowthHackStore();

  // Fetch growth hack data if not already loaded
  useEffect(() => {
    if (!growthHackData && !isLoading) fetchGrowthHackData();
  }, [growthHackData, isLoading, fetchGrowthHackData]);

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
      border="1px solid #292929"
      display={{ base: 'none', lg: 'flex' }}
      mt={8}
    >
      {/* Growth Hack Icon */}
      <Box display="flex" width="32px" height="32px" padding="8px" justifyContent="center" alignItems="center">
        <AppIcons.SidebarAnalytics width="16px" height="16px" />
      </Box>

      {/* Title & Description */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
        <AppTypography color="#FFF" fontSize="14px" fontWeight="500">
          Level Up
        </AppTypography>
        <AppTypography color="#FFF" fontSize="12px" fontWeight="400">
          Take meaningful actions to drive your business forward and unlock new opportunities.
        </AppTypography>
      </Box>

      {/* Growth Hack Sections */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius="8px" border="1px solid #3C3C3C">
        {!isLoading &&
          GROWTH_HACK_CONSTANTS.map((section, index) => (
            <GrowthHackSection
              key={index}
              index={index}
              section={section}
              isCompleted={growthHackData?.list?.[section.objectField] || false}
              setCurrentSection={setCurrentSection}
              setCurrentSubSection={setCurrentSubSection}
              onOpen={onOpen}
            />
          ))}
      </Box>

      {/* Modal */}
      <DashboardLayoutSidebarGrowthHackModal
        section={GROWTH_HACK_CONSTANTS[currentSection]}
        currentSubSection={currentSubSection}
        setCurrentSubSection={setCurrentSubSection}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default DashboardLayoutSidebarGrowthHack;
