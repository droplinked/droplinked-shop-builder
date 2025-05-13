import { VStack } from '@chakra-ui/react';
import React from 'react';
import ColorSelector from './ColorSelector';
import FontSelector from './FontSelector';
import TemplateSelector from './TemplateSelector';

/**
 * Theme configuration component with template, color, and font selectors
 */
function ThemeConfig(): React.ReactElement {
  return (
    <VStack width="100%" height="auto" display="flex" align="stretch">
      <TemplateSelector />
      <ColorSelector />
      <FontSelector />
    </VStack>
  );
}

export default ThemeConfig;
