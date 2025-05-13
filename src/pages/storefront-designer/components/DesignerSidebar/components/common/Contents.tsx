import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { AppAccordion } from 'components/redesign/accordion/AppAccordion';
import ConfigSection from './ConfigSection';
import { ConfigSectionData } from '../../configData';

/**
 * Props for CollapsedContent component
 */
interface CollapsedContentProps {
  sections: ConfigSectionData[];
  dispatch: (action: { type: string; params: any }) => void;
  setIsCollapsed: (value: boolean) => void;
}

/**
 * Collapsed sidebar content with icon buttons
 */
export function CollapsedContent({ sections, dispatch, setIsCollapsed }: CollapsedContentProps): React.ReactElement {
  return (
    <Flex width="auto" height="auto" display="flex" flexDirection="column" alignItems="center" gap={2}>
      {sections.map((section) => (
        <IconButton
          key={section.id}
          width="auto"
          height="auto"
          padding="12px 14px"
          aria-label={section.title}
          icon={section.icon}
          backgroundColor="neutral.gray.900"
          color="white"
          onClick={() => {
            dispatch({ type: 'updateState', params: { activeSection: section.id } });
            setIsCollapsed(false);
          }}
          _hover={{ backgroundColor: '#222' }}
        />
      ))}
    </Flex>
  );
}

/**
 * Props for ExpandedContent component
 */
interface ExpandedContentProps {
  sections: ConfigSectionData[];
  openSection: string;
  handleSectionToggle: (sectionId: string, isExpanded: boolean) => void;
}

/**
 * Expanded sidebar content with collapsible sections
 */
export function ExpandedContent({ sections, openSection, handleSectionToggle }: ExpandedContentProps): React.ReactElement {
  return (
    <AppAccordion multiCollapse={false} display="flex" flexDir="column" gap={2}>
      {sections.map((section) => (
        <ConfigSection
          key={section.id}
          title={section.title}
          itemId={section.id}
          icon={section.icon}
          component={section.component}
          defaultOpen={section.id === openSection}
          onToggle={(isOpen) => handleSectionToggle(section.id, isOpen)}
        />
      ))}
    </AppAccordion>
  );
}
