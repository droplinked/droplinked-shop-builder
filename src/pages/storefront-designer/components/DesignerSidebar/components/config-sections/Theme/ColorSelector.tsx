import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useMemo } from 'react';
import SectionItem from '../../common/SectionItem';
import { useQuery } from 'react-query';
import { availableTemplateService } from 'services/shop/shopServices';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/storefront/en.json';
import localAr from 'locales/storefront/ar.json';

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

  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

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
  const renderThemeSection = (title: 'light' | 'dark', themes, description?: string) => {
    if (!Array.isArray(themes) || themes.length <= 0) return null;

    return (
      <Box mt={title === 'dark' ? 4 : 0}>
        <DotSeparatedList mb={2}>
          <Text color="white" fontSize="sm" fontWeight="medium">
            {t(`designerSidebar.themeConfig.colorPalette.${title}`)}
          </Text>
          {description && (
            <Text flex="1" color="neutral.gray.500" fontSize="sm">
              {t('designerSidebar.themeConfig.colorPalette.lightOptimized')}
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
    <SectionItem 
      title={t('designerSidebar.themeConfig.colorPalette.title')} 
      description={t('designerSidebar.themeConfig.colorPalette.description')}
    >
      <VStack spacing={4} align="stretch" w="100%" mt={2}>
        {/* Light Themes Section */}
        {renderThemeSection('light', lightThemes, 'optimized')}

        {/* Dark Themes Section */}
        {renderThemeSection('dark', darkThemes)}

        {/* Show message if no themes are available */}
        {!isLoading && lightThemes.length === 0 && darkThemes.length === 0 && (
          <Text>{t('designerSidebar.themeConfig.colorPalette.noThemes')}</Text>
        )}
      </VStack>
    </SectionItem>
  );
};

export default ColorSelector;
