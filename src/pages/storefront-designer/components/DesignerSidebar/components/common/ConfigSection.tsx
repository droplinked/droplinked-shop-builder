import React, { useEffect } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger, useAppAccordionItemContext } from 'components/redesign/accordion/AppAccordion';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

/**
 * Props for ConfigSection component
 */
interface ConfigSectionProps {
  title: string;
  icon: React.ReactElement;
  component?: React.ComponentType;
  itemId: string;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

/**
 * ConfigSection component
 *
 * Renders a collapsible section in the designer sidebar with a title,
 * icon, and content component. Used for different configuration categories.
 */
function ConfigSection({ title, icon, component: SectionComponent, itemId, defaultOpen = false, onToggle }: ConfigSectionProps): React.ReactElement {
  const { isRTL } = useLocaleResources('storefront');
  
  return (
    <AppAccordionItem width="100%" height="auto" display="flex" flexDirection="column" alignItems="flex-start" borderRadius="8px" itemId={itemId} defaultOpen={defaultOpen}>
      <ToggleObserver onToggle={onToggle} />
      <AppAccordionTrigger width="100%" height="auto" display="flex" background="neutral.gray.900" padding="12px 16px" borderRadius="8px">
        <Flex width="100%" height="auto" display="flex" alignItems="center">
          <IconButton
            width="auto"
            height="auto"
            aria-label={title}
            icon={icon}
            backgroundColor="neutral.gray.900"
            color="white"
            _hover={{ backgroundColor: '#222' }}
            {...(isRTL ? { marginLeft: 2 } : { marginRight: 2 })}
          />
          <AppTypography color="white" fontSize="base">
            {title}
          </AppTypography>
        </Flex>
        <AppAccordionChevron />
      </AppAccordionTrigger>
      <AppAccordionPanel width="100%" height="auto" padding="16px 12px">
        {SectionComponent && <SectionComponent />}
      </AppAccordionPanel>
    </AppAccordionItem>
  );
}

/**
 * Helper component that observes accordion toggle state changes
 */
function ToggleObserver({ onToggle }): React.ReactElement | null {
  const { isOpen } = useAppAccordionItemContext();

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  return null;
}

export default ConfigSection;
