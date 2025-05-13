import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useMemo } from 'react';
import SectionItem from '../../common/SectionItem';
import { useQuery } from 'react-query';
import { availableTemplateService } from 'lib/apis/shop/shopServices';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';

/**
 * Color palette selection component
 */
const ColorSelector: React.FC = () => {
  const {
    methods: { dispatch },
    state: {
      shop: {
        shopDesign: { backgroundBody, foreground },
      },
    },
  } = useContext(designerContext);

  // Fetch theme data from API
  const { data, isLoading } = useQuery({
    queryFn: availableTemplateService,
    queryKey: ['color-themes'],
  });

  const selectedColor = {
    backgroundBody: backgroundBody,
    foreground: foreground,
  };

  // Properly access the nested theme data and categorize them
  const { lightThemes, darkThemes } = useMemo(() => {
    const themes = data?.data?.data || [];
    return {
      lightThemes: themes.filter((theme) => theme.background && isLightColor(theme.background)).reverse(),
      darkThemes: themes.filter((theme) => theme.background && !isLightColor(theme.background)).reverse(),
    };
  }, [data]);

  // Helper function to determine if a color is light or dark
  function isLightColor(color) {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > 128;
    }
    return true;
  }

  const renderThemeCircles = (themes) => {
    return themes.map((theme, i) => {
      const isSelected =
        theme.background === selectedColor.backgroundBody && theme.foreground === selectedColor.foreground;
      return (
        <Box
          key={`theme-${i}`}
          position="relative"
          cursor="pointer"
          onClick={() => {
            dispatch({
              type: 'updateShop',
              params: {
                shopDesign: {
                  backgroundBody: theme.background,
                  foreground: theme.foreground,
                  textColorParagraphs: theme.textColor,
                },
              },
            });
          }}
        >
          <Circle size="36px" border="1px solid" borderColor={isSelected ? 'main.primary' : 'neutral.gray.800'}>
            <Circle size="28px" bg={theme.background}>
              <Circle size="18px" bg={theme.foreground} />
            </Circle>
          </Circle>
        </Box>
      );
    });
  };

  // Render theme section (light or dark)
  const renderThemeSection = (title, themes, description?) => {
    if (!Array.isArray(themes) || themes.length <= 0) return null;

    return (
      <Box mt={title === 'Dark' ? 4 : 0}>
        <DotSeparatedList mb={2}>
          <Text color="white" fontSize="sm" fontWeight="medium">
            {title}
          </Text>
          {description && (
            <Text flex="1" color="neutral.gray.500" fontSize="sm">
              {description}
            </Text>
          )}
        </DotSeparatedList>

        <Flex gap={3} flexWrap="wrap">
          {renderThemeCircles(themes)}
        </Flex>
      </Box>
    );
  };

  return (
    <SectionItem title="Color Palette" description="Choose a preferred color scheme.">
      <VStack spacing={4} align="stretch" w="100%" mt={2}>
        {/* Light Themes Section */}
        {renderThemeSection('Light', lightThemes, 'Frost Gray (optimized)')}

        {/* Dark Themes Section */}
        {renderThemeSection('Dark', darkThemes)}

        {/* Show message if no themes are available */}
        {!isLoading && lightThemes.length === 0 && darkThemes.length === 0 && <Text>No themes available</Text>}
      </VStack>
    </SectionItem>
  );
};

export default ColorSelector;
