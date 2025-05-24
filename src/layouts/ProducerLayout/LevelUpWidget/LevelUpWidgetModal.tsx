import { Box, Icon, Image, Link, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LevelUpWidgetModalProps {
  section: {
    title: string;
    subSections: Array<{
      title: string;
      description: string;
      link?: {
        linkTitle: string;
        linkTo: string;
        isExternal?: boolean;
      };
      image: string;
      buttons: {
        left?: {
          label: string;
          onClick: (setCurrentSubSection: (fn: (prev: number) => number) => void, onClose?: () => void, navigate?: any) => void;
        };
        right: {
          label: string;
          rightIcon?: any;
          onClick: (setCurrentSubSection: (fn: (prev: number) => number) => void, onClose?: () => void, navigate?: any) => void;
        };
      };
    }>;
  };
  currentSubSection: number;
  setCurrentSubSection: (fn: (prev: number) => number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LevelUpWidgetModal = ({ section, currentSubSection, setCurrentSubSection, isOpen, onClose }: LevelUpWidgetModalProps) => {
  const navigate = useNavigate();
  const currentSubSectionData = section?.subSections[currentSubSection];
  const RightIcon = currentSubSectionData?.buttons?.right?.rightIcon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent backgroundColor="transparent">
        <ModalBody p={0}>
          <Box display="flex" width="625px" flexDirection="column" justifyContent="center" alignItems="center" gap="36px" borderRadius="24px" border="1px solid" borderColor={"neutral.gray.800"} background="neutral.gray.1000">
            <Box display="flex" flexDirection="column" alignItems="center" gap="24px" alignSelf="stretch">
              <Image roundedTop={'24px'} src={currentSubSectionData?.image} />
            </Box>
            <Box width="full" display="flex" padding="0px 48px 48px 48px" flexDirection="column" alignItems="flex-end" gap="48px" alignSelf="stretch">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap="16px" alignSelf="stretch">
                <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                  {currentSubSectionData?.title}
                </AppTypography>
                <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                  {currentSubSectionData?.description}
                </AppTypography>
                {currentSubSectionData?.link && (
                  <Link
                    href={currentSubSectionData.link.linkTo}
                    isExternal={currentSubSectionData.link.isExternal}
                  >
                    <AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">
                      {currentSubSectionData.link.linkTitle}
                    </AppTypography>
                  </Link>
                )}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="full" gap="24px" alignSelf="stretch">
                {currentSubSectionData?.buttons?.left && (
                  <Box display="flex" width="full" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="10px" flex="1 0 0">
                    <AppButton
                      variant="secondary"
                      size='lg'
                      onClick={() => {
                        if (typeof currentSubSectionData?.buttons?.left?.onClick === 'function') {
                          currentSubSectionData.buttons.left.onClick(setCurrentSubSection, onClose, navigate);
                        }
                      }}
                    >
                      {currentSubSectionData.buttons.left.label}
                    </AppButton>
                  </Box>
                )}
                <Box display="flex" width="full" flexDirection="column" justifyContent="center" alignItems="flex-end" gap="10px" flex="1 0 0">
                  <AppButton
                    size='lg'
                    rightIcon={RightIcon ? <Icon as={RightIcon} /> : null}
                    onClick={() => {
                      if (typeof currentSubSectionData?.buttons?.right?.onClick === 'function') {
                        currentSubSectionData.buttons.right.onClick(setCurrentSubSection, onClose, navigate);
                      }
                    }}
                  >
                    {currentSubSectionData?.buttons?.right?.label}
                  </AppButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LevelUpWidgetModal;
