import { Box, Flex, IconButton, FlexProps } from '@chakra-ui/react';
import { FilterSm } from 'assets/icons/Action/Filter/FilterSm';
import { ChevrondownSm } from 'assets/icons/Navigation/ChevronDown/ChevrondownSm';
import { GridSm } from 'assets/icons/Navigation/Grid/GridSm';
import { SortbuttonSm } from 'assets/icons/Navigation/SortButton/SortbuttonSm';
import { SearchSm } from 'assets/icons/System/Search/SearchSm';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useMemo } from 'react';
import PreviewTypo from '../../common/typo/PreviewTypo';

const PreviewActionBar = () => {
  const {
    state: {
      shop: { shopDesign: { backgroundBody, foreground, textColorParagraphs } },
      device
    }
  } = useContext(designerContext);

  const isTablet = useMemo(() => device === 'tablet', [device]);
  const isMobile = useMemo(() => device === 'mobile', [device]);

  const commonButtonStyles = {
    bg: backgroundBody,
    border: '1px solid',
    borderColor: foreground,
    _hover: {}
  };

  const commonFlexStyles: Partial<FlexProps> = {
    direction: 'column' as const,
    justify: 'start',
    align: 'start',
    gap: 2,
    w: 'full'
  };

  const ActionButton = ({ icon, label }) => <IconButton aria-label={label} icon={icon} {...commonButtonStyles} />;

  const ActionInput = ({ icon, placeholder }) => (
    <Box bg={backgroundBody}>
      <Flex {...commonFlexStyles}>
        <Flex w="full" justify="start" align="start">
          <Flex grow={1} p="2" borderRadius="md" border="1px solid" borderColor={foreground} align="center" gap={2}>
            {icon}
            <PreviewTypo
              flex={1}
              color={placeholder ? 'text.subtext.placeholder.dark' : textColorParagraphs}
              fontSize="xs"
              fontWeight="normal"
              fontFamily="Inter"
              lineHeight="normal"
            >
              {placeholder || 'Filter'}
            </PreviewTypo>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );

  if (isMobile) {
    return (
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <Flex gap={2}>
          <ActionButton icon={<FilterSm color={textColorParagraphs} />} label="Menu" />
          <ActionButton icon={<SearchSm color={textColorParagraphs} />} label="Search" />
        </Flex>
        <Flex gap={2}>
          <ActionButton icon={<GridSm color={textColorParagraphs} />} label="Filter" />
          <ActionButton icon={<SortbuttonSm color={textColorParagraphs} />} label="Sort" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" gap={4}>
      <Flex justifyContent="start" alignItems="center" gap={2}>
        {isTablet && <ActionInput icon={<FilterSm color={textColorParagraphs} />} placeholder="Filter" />}
        <ActionInput icon={<SearchSm color={textColorParagraphs} />} placeholder="Search" />
      </Flex>

      <Box>
        <Flex {...commonFlexStyles}>
          <Flex w="full" justify="start" align="start">
            <Flex grow={1} py="2" px="8px" bg={backgroundBody} borderRadius="md" border="1px solid" borderColor={foreground} align="center" gap="8px">
              <PreviewTypo flex={1} color="text.subtext.placeholder.dark" fontSize="xs" fontWeight="normal" fontFamily="Inter" lineHeight="normal">
                Sort Products
              </PreviewTypo>
              <ChevrondownSm color="#B1B1B1" />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PreviewActionBar;
