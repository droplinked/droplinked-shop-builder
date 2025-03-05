import { Box, Button, Icon, Image, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLinkWrapper from '../../../../common/DashboardLinkWrapper';

const DashboardLayoutSidebarGrowthHackModal = ({ section, isOpen, onClose, setCurrentSubSection, currentSubSection }) => {
  const navigate = useNavigate();
  const subSection = section?.subSections?.[currentSubSection];
  const RightIcon = subSection?.buttons?.right?.rightIcon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent backgroundColor="transparent">
        <ModalBody p={0}>
          <Box display="flex" width="625px" flexDirection="column" justifyContent="center" alignItems="center" gap="36px" borderRadius="24px" border="1px solid" borderColor={"neutral.gray.800"} background="neutral.gray.1000">
            <Box display="flex" flexDirection="column" alignItems="center" gap="24px" alignSelf="stretch">
              <Image roundedTop={'24px'} src={subSection?.image} />
            </Box>
            <Box width="full" display="flex" padding="0px 48px 48px 48px" flexDirection="column" alignItems="flex-end" gap="48px" alignSelf="stretch">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap="16px" alignSelf="stretch">
                <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                  {subSection?.title}
                </AppTypography>
                <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                  {subSection?.description}
                </AppTypography>
                {subSection?.link && (
                  <DashboardLinkWrapper linkTo={subSection?.link?.linkTo} isExternalLink={subSection?.link?.isExternal} onClick={subSection?.link?.onClick}>
                    <AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">
                      {subSection?.link?.linkTitle}
                    </AppTypography>
                  </DashboardLinkWrapper>
                )}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="full" gap="24px" alignSelf="stretch">
                {subSection?.buttons?.left && (
                  <Box display="flex" width="full" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="10px" flex="1 0 0">
                    <Button
                      color="#C2C2C2"
                      bgColor="#292929"
                      border="none !important"
                      _hover={{
                        bgColor: '#292929',
                        color: '#C2C2C2'
                      }}
                      padding="12px 20px"
                      variant="ghost"
                      onClick={() => {
                        if (typeof subSection?.buttons?.left.onClick === 'function') {
                          subSection?.buttons?.left.onClick(setCurrentSubSection, onClose, navigate);
                        }
                      }}
                    >
                      {subSection?.buttons.left.label}
                    </Button>
                  </Box>
                )}
                <Box display="flex" width="full" flexDirection="column" justifyContent="center" alignItems="flex-end" gap="10px" flex="1 0 0">
                  <Button
                    role="group"
                    padding="12px 20px"
                    color="#084836"
                    gap="8px"
                    bgColor="#2EC99E"
                    border="2px solid #2EC99E"
                    _hover={{
                      borderColor: '#2EC99E',
                      bgColor: 'unset',
                      color: 'primary'
                    }}
                    onClick={() => {
                      if (typeof subSection?.buttons?.right.onClick === 'function') {
                        subSection.buttons.right.onClick(setCurrentSubSection, onClose, navigate);
                      }
                    }}
                  >
                    {subSection?.buttons?.right?.label}
                    {RightIcon ? <Icon as={RightIcon} _groupHover={{ stroke: '#2EC99E' }} /> : null}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DashboardLayoutSidebarGrowthHackModal;
