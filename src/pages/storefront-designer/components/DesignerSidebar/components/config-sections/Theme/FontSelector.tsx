import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext } from 'react';
import SectionItem from '../../common/SectionItem';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/storefront/en.json';
import localAr from 'locales/storefront/ar.json';

/**
 * Typography and font selection component
 */
const FontSelector: React.FC = () => {
  const {
    methods: { dispatch },
    state: {
      shop: {
        shopDesign: { fontfamily },
      },
    },
  } = useContext(designerContext);

  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  const fonts = ['Inter', 'Nunito Sans', 'Montserrat', 'Manrope', 'Source Serif Pro', 'Fredoka One', 'Allerta'];
  const selectedFont = fontfamily;

  return (
    <SectionItem 
      title={t('designerSidebar.themeConfig.fontStyle.title')} 
      description={t('designerSidebar.themeConfig.fontStyle.description')}
    >
      <VStack spacing={3} align="stretch" w="100%" mt={2}>
        {fonts.map((font, i) => {
          const isSelected = selectedFont === font;
          return (
            <Flex
              key={`font-${i}`}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={isSelected ? 'main.primary' : 'neutral.gray.800'}
              bg={isSelected ? 'button.hover.transparent' : 'transparent'}
              justifyContent="space-between"
              alignItems="center"
              overflow="hidden"
              gap={3}
              cursor="pointer"
              onClick={() =>
                dispatch({
                  type: 'updateShop',
                  params: { shopDesign: { fontfamily: font } },
                })
              }
            >
              <Box flex="1" minW="0">
                <Text color={isSelected ? 'main.primary' : 'white'} fontSize="sm" fontWeight="medium">
                  {t(`designerSidebar.themeConfig.fontStyle.fonts.${font.toLowerCase().replace(/\s+/g, '')}`)}
                </Text>
                <Text color="text.subtext.placeholder.dark" fontSize="12px" fontFamily={font}>
                   The Next Generation of Commerce
                </Text>
              </Box>
              <Text
                color={isSelected ? 'main.primary' : 'neutral.gray.800'}
                fontSize="4xl"
                fontWeight={400}
                fontFamily={font}
                flexShrink={0}
              >
            Aa
              </Text>
            </Flex>
          );
        })}
      </VStack>
    </SectionItem>
  );
};

export default FontSelector;
