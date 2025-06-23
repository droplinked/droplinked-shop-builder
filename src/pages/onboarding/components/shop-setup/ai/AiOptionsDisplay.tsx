import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { AISm } from 'assets/icons/AI';
import { Refresh1Sm } from 'assets/icons/Action/Refresh1/Refresh1Sm';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';
import { useAiGeneratedContent } from '../../../hooks/useAiGeneratedContent';
import useOnboardingStore from '../../../stores/useOnboardingStore';
import { ImageSlider } from './ImageSlider';

interface AiOptionsDisplayProps {
  type: 'logos' | 'covers' | 'urls' | 'names';
  title: string;
  onSelect: (value: string) => void;
  selectedValue?: string;
}

const AiOptionsDisplay: React.FC<AiOptionsDisplayProps> = ({ type, title, onSelect, selectedValue }) => {
  const { isLoading, generateContent } = useAiGeneratedContent();
  const { aiGeneratedContent } = useOnboardingStore();

  const options = aiGeneratedContent[type];
  const isContentLoading = isLoading[type];

  const handleRegenerate = () => {
    generateContent(type);
  };

  // Common header component
  const OptionsHeader = () => (
    <Flex justify="space-between" align="center" mb={4}>
      <Text display="flex" alignItems="center" gap={1} color="main.primary" fontSize="sm">
        <AISm color="#2BCFA1" /> AI Suggestions
      </Text>
      <AppButton variant="normal" color="main.primary" leftIcon={<Refresh1Sm />} onClick={handleRegenerate} isLoading={isContentLoading}>
        Generate Again
      </AppButton>
    </Flex>
  );

  // Text-based options (URLs & Names) - Horizontal scrollable design
  const TextBasedOptions = () => (
    <Box>
      {isContentLoading ? (
        <Flex justify="center" py={8}>
          <Spinner />
        </Flex>
      ) : (
        <Box overflowX="auto" pb={2}>
          <Flex flexWrap="wrap" gap={4} minW="max-content">
            {options.map((option, index) => (
              <Box
                key={index}
                px={4}
                py={3}
                borderWidth="1px"
                borderRadius="8px"
                cursor="pointer"
                borderColor={selectedValue === option ? 'main.primary' : 'neutral.gray.800'}
                bg={selectedValue === option ? 'label.primary' : 'transparent'}
                onClick={() => onSelect(option)}
                minW="fit-content"
              >
                <Text fontWeight={selectedValue === option ? '500' : '400'} color={selectedValue === option ? 'main.primary' : 'neutral.white'} textAlign="center">
                  {option}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );

  // Logo options - Square grid with circular selection
  const LogoOptions = () => (
    <Box>
      {isContentLoading ? (
        <Flex justify="center" py={8}>
          <Spinner />
        </Flex>
      ) : (
        <Flex flexWrap="wrap" gap={4} minW="max-content">
          {options.map((option, index) => (
            <Box key={index} cursor="pointer" onClick={() => onSelect(option)}>
              <Box
                width="64px"
                height="64px"
                borderRadius="8px"
                borderWidth="1px"
                borderColor={selectedValue === option ? 'main.primary' : 'neutral.gray.800'}
                bg="neutral.gray.1000"
              >
                <Image p={2} src={option} alt={`${title} option ${index + 1}`} width="100%" height="100%" objectFit="cover" />
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );

  // Cover options - Landscape cards with overlay selection
  const CoverOptions = () => (
    <Box>
      {isContentLoading ? (
        <Flex justify="center" py={8}>
          <Spinner />
        </Flex>
      ) : (
        <Flex alignItems="center" gap={4}>
          <ImageSlider images={options} onChange={onSelect} isLoading={isContentLoading} selectedValue={selectedValue} />
        </Flex>
      )}
    </Box>
  );

  if (options.length === 0 && !isContentLoading) {
    return null;
  }

  return (
    <Box p={4} w="100%" borderWidth="1px" borderRadius="16px" borderColor="neutral.gray.800">
      <OptionsHeader />
      {type === 'urls' || type === 'names' ? <TextBasedOptions /> : type === 'logos' ? <LogoOptions /> : <CoverOptions />}
    </Box>
  );
};

export default AiOptionsDisplay;
