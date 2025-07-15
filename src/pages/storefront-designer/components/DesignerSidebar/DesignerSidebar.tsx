import { Flex, useMediaQuery } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import { CollapsedHeader, ExpandedHeader } from './components/common/Headers';
import { CollapsedContent, ExpandedContent } from './components/common/Contents';
import { getConfigSections } from './configData';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/storefront/en.json';
import localAr from 'locales/storefront/ar.json';

/**
 * Sidebar component for the storefront designer with collapsible sections
 */
function DesignerSidebar(): React.ReactElement {
  const { methods: { dispatch }  } = useContext(designerContext);
  const [openSection, setOpenSection] = useState<string>('theme');
  const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const [isCollapsed, setIsCollapsed] = useState(isTablet);

  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  // Set the initial active section
  useEffect(() => {
    dispatch({ type: 'updateState', params: { activeSection: 'theme' } });
  }, [dispatch]);

  // Update collapsed state when screen size changes
  useEffect(() => {
    setIsCollapsed(isTablet);
  }, [isTablet]);

  // Handle section opening and closing
  const handleSectionToggle = (sectionId: string, isExpanded: boolean): void => {
    if (isExpanded) {
      dispatch({ type: 'updateState', params: { activeSection: sectionId } });
      setOpenSection(sectionId);
    } else if (sectionId === openSection) {
      setOpenSection('');
      dispatch({ type: 'updateState', params: { activeSection: null } });
    }
  };

  // Toggle sidebar between collapsed and expanded states
  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  const configSections = getConfigSections(t);

  return (
    <Flex
      width={isCollapsed ? '80px' : { base: '324px', lg: '336px' }}
      minWidth={isCollapsed ? '80px' : { base: '324px', lg: '336px' }}
      height="auto"
      display="flex"
      position="relative"
      flexDirection="column"
      flex="0 0 auto"
      padding={isCollapsed ? '24px 16px' : '24px'}
      bgColor="neutral.gray.1000"
      border="1px solid"
      borderRadius="16px"
      borderColor="neutral.gray.800"
      transition="width 0.3s, min-width 0.3s"
    >
      {isCollapsed ? <CollapsedHeader toggleSidebar={toggleSidebar} /> : <ExpandedHeader toggleSidebar={toggleSidebar} />}

      {isCollapsed ? (
        <CollapsedContent sections={configSections} dispatch={dispatch} setIsCollapsed={setIsCollapsed} />
      ) : (
        <ExpandedContent sections={configSections} openSection={openSection} handleSectionToggle={handleSectionToggle} />
      )}
    </Flex>
  );
}

export default DesignerSidebar;
