import React, { ReactNode } from 'react';
import { Box, Text } from '@chakra-ui/react';

/**
 * Props for SectionItem component
 */
interface SectionItemProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

/**
 * SectionItem component
 * 
 * Renders a titled section with optional description and children
 * Used within designer sidebar configuration sections
 */
function SectionItem({ 
  title, 
  description, 
  children 
}: SectionItemProps): React.ReactElement {
  return (
    <Box width="100%" height="auto" role="region" aria-label={title}>
      {title && (
        <Box 
          width="100%" 
          height="auto"
          padding="12px 0"
          borderRadius="md"
        >
          <Text 
            fontSize="16px" 
            fontWeight="500" 
            color="#fff" 
            marginBottom={1}
          >
            {title}
          </Text>

          {description && (
            <Text 
              fontSize="14px" 
              color="text.subtext.placeholder.dark"
            >
              {description}
            </Text>
          )}
        </Box>
      )}
      {children && (
        <Box width="100%" height="auto">
          {children}
        </Box>
      )}
    </Box>
  );
}

export default SectionItem;
