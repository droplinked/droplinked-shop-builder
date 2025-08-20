import React from 'react';
import { Flex, IconButton, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChevronleftLg } from 'assets/icons/Navigation/ChevronLeft/ChevronleftLg';
import { ChevronrightLg } from 'assets/icons/Navigation/ChevronRight/ChevronrightLg';

export interface SliderControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
  visibleItems: number;
  showProgress?: boolean;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  onPrevious,
  onNext,
  currentIndex,
  totalItems,
  visibleItems
}) => {
  const { t } = useTranslation('public-pages/public-blogs');
  const maxIndex = Math.max(0, totalItems - visibleItems);
  const progress = totalItems > 0 ? (currentIndex / maxIndex) * 100 : 0;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <Flex align="center" gap={2} justifyContent="space-between">
      <IconButton
        aria-label={t('SliderControls.previousAriaLabel')}
        icon={<ChevronleftLg />}
        variant="ghost"
        size="lg"
        rounded="lg"
        onClick={onPrevious}
        isDisabled={!canGoPrevious}
        opacity={canGoPrevious ? 1 : 0.5}
        _hover={canGoPrevious ? { bg: 'whiteAlpha.100' } : {}}
      />

      <Flex
        w="16"
        h="1"
        bg="neutral.gray.900"
        rounded="md"
        overflow="hidden"
        align="flex-start"

      >
        <Box
          w={`${progress}%`}
          h="1"
          bg="white"
          rounded="md"
          transition="width 0.3s ease"
        />
      </Flex>

      <IconButton
        aria-label={t('SliderControls.nextAriaLabel')}
        icon={<ChevronrightLg />}
        variant="ghost"
        size="lg"
        rounded="lg"
        onClick={onNext}
        isDisabled={!canGoNext}
        opacity={canGoNext ? 1 : 0.5}
        _hover={canGoNext ? { bg: 'whiteAlpha.100' } : {}}
      />
    </Flex>
  );
};

export default SliderControls;
