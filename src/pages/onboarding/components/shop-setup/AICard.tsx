import { Box, Flex, Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import React, { useState } from 'react';
import { SuitcaseSm } from 'assets/icons/System/SuitCase/SuitcaseSm';
import { AILg } from 'assets/icons/AI';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import AppSelect from 'components/redesign/select/AppSelect';
import AppButton from 'components/redesign/button/AppButton';
import Textarea from 'components/redesign/textarea/Textarea';
import { ChevronupLg } from 'assets/icons/Navigation/ChevronUp/ChevronupLg';
import ProTrialModal from 'components/modals/pro-trial-modal/ProTrialModal';

function AICard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProTrialModalOpen, setIsProTrialModalOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleGenerateWithAI = () => {
    setIsProTrialModalOpen(true);
  };

  const handleCloseProTrialModal = () => {
    setIsProTrialModalOpen(false);
  };

  return (
    <Box
      bg={isOpen ? 'transparent' : 'label.primary'}
      borderRadius="2xl"
      border="1px"
      borderColor={isOpen ? 'neutral.gray.800' : 'label.primary'}
      display="inline-flex"
      flexDir="column"
      overflow="hidden"
    >
      <Flex
        p={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottom={isOpen ? '1px' : 'none'}
        borderColor={isOpen ? 'neutral.gray.800' : 'label.primary'}
        cursor="pointer"
        onClick={toggleOpen}
        transition="border-bottom 0.3s ease"
      >
        <Flex gap={3}>
          <IconWrapper
            bg={isOpen ? 'transparent' : 'label.primary'}
            borderColor={isOpen ? 'neutral.gray.800' : 'label.primary'}
            icon={<AILg color={isOpen ? 'white' : '#2BCFA1'} />}
          />
          <Flex flexDir="column" gap="2px">
            <DotSeparatedList>
              <Text color="white" fontWeight="medium">
                Generate with AI
              </Text>
              <Flex alignItems="center" gap={1}>
                <SuitcaseSm color="#2BCFA1" />
                <Text color="main.primary" fontSize="sm">
                  Pro Feature
                </Text>
              </Flex>
            </DotSeparatedList>
            <Text color="text.subtext.placeholder.dark" fontSize="sm">
              Customize your shop with droplinked AI
            </Text>
          </Flex>
        </Flex>
        <Box transform={isOpen ? 'rotate(0deg)' : 'rotate(180deg)'} transition="transform 0.3s ease">
          <ChevronupLg color="white" />
        </Box>
      </Flex>

      <Box maxHeight={isOpen ? '500px' : '0px'} opacity={isOpen ? 1 : 0} overflow="hidden" transition="all 0.3s ease-in-out">
        <Box p={4} display="flex" flexDir="column" gap={6}>
          <Textarea
            label="Describe Your Business"
            fontFamily="14px"
            isRequired
            placeholder="Please describe your shop to help our AI create a more accurate and efficient representation of your business."
            value=""
            onChange={() => {}}
          />

          <AppSelect
            label="Business Category"
            isRequired
            items={[]}
            valueAccessor="id"
            labelAccessor="name"
            selectProps={{
              placeholder: 'Select Category',
              value: '',
              onChange: () => {}
            }}
          />

          <AppButton size="lg" onClick={handleGenerateWithAI}>Generate Shop Details with AI</AppButton>
        </Box>
      </Box>

      <ProTrialModal
        isOpen={isProTrialModalOpen}
        onClose={handleCloseProTrialModal}
        unlockedMonths={1}
      />
    </Box>
  );
}

export default AICard;
