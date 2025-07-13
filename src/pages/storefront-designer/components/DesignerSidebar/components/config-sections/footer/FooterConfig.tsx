import { Box, Divider, Flex, FormControl, Text, VStack } from '@chakra-ui/react';
import { EditMd } from 'assets/icons/Action/Edit/EditMd';
import { LinkMd } from 'assets/icons/Action/Link/LinkMd';
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd';
import AppInput from 'components/common/form/textbox/AppInput';
import AppButton from 'components/redesign/button/AppButton';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import { AdditionalLinks } from 'pages/storefront-designer/types/designerTypes';
import React, { useCallback, useContext } from 'react';
import SectionItem from '../../common/SectionItem';
import useLocaleResources from '../../../../../../../hooks/useLocaleResources/useLocaleResources';
import localEn from '../../../../../../../locales/storefront/en.json';
import localAr from '../../../../../../../locales/storefront/ar.json';

/**
 * Footer configuration component for managing footer links
 */
function FooterConfig(): React.ReactElement {
  const {
    methods: { dispatch },
    state: {
      shop: { shopDesign }
    }
  } = useContext(designerContext);

  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  /**
   * Handle link field value changes
   */
  const handleChange = useCallback(
    (index: number, value: string, field: 'caption' | 'link') => {
      const updatedLinks = shopDesign.footerLinks.map((link: AdditionalLinks, i: number) => ({
        ...link,
        [field]: i === index ? value : link[field]
      }));
      dispatch({ type: 'updateShop', params: { shopDesign: { footerLinks: updatedLinks } } });
    },
    [dispatch, shopDesign.footerLinks]
  );

  /**
   * Add a new empty link
   */
  const addLink = useCallback(() => {
    const newLink = { caption: '', link: '', save: false };
    dispatch({
      type: 'updateShop',
      params: {
        shopDesign: { footerLinks: [...shopDesign.footerLinks, newLink] }
      }
    });
  }, [dispatch, shopDesign.footerLinks]);

  /**
   * Delete a link at specified index
   */
  const deleteLink = useCallback(
    (index: number) => {
      const filteredLinks = shopDesign.footerLinks.filter((_, i) => i !== index);
      dispatch({
        type: 'updateShop',
        params: { shopDesign: { footerLinks: filteredLinks } }
      });
    },
    [dispatch, shopDesign.footerLinks]
  );

  return (
    <VStack width="100%" height="auto" display="flex" align="stretch" spacing={3}>
      <SectionItem title={t('designerSidebar.footerConfig.linkManagement.title')}>
        <Box width="100%" height="auto" borderRadius="lg" borderWidth="1px" borderColor="neutral.gray.800" overflow="hidden">
          <Flex width="100%" height="auto" display="flex" alignItems="center" justifyContent="space-between" padding={3} backgroundColor="neutral.gray.800">
            <Text fontSize="sm" fontWeight="medium" color="white">
              {t('designerSidebar.footerConfig.linkManagement.column', { number: 1 })}
            </Text>
            <EditMd color="white" />
          </Flex>

          {shopDesign.footerLinks.map((item, index) => (
            <Flex width="100%" height="auto" display="flex" flexDirection="column" gap={3} key={index}>
              <Flex width="100%" height="auto" display="flex" alignItems="center" justifyContent="space-between" padding="16px 16px 0 16px">
                <Text fontSize="sm" fontWeight="medium" color="white">
                  {t('designerSidebar.footerConfig.linkManagement.link', { number: index + 1 })}
                </Text>
                <Box width="auto" height="auto" cursor="pointer" onClick={() => deleteLink(index)}>
                  <TrashMd color="#FF2244" />
                </Box>
              </Flex>

              <VStack width="100%" height="auto" display="flex" align="stretch" padding="0 16px 16px 16px">
                <FormControl>
                  <AppInput
                    width="100%"
                    height="48px"
                    placeholder={t('designerSidebar.footerConfig.linkManagement.inputs.label')}
                    name="caption"
                    value={item.caption}
                    onChange={(e) => handleChange(index, e.target.value, 'caption')}
                    borderColor="neutral.gray.800"
                    backgroundColor="#1A1A1A"
                    color="white"
                    _placeholder={{ color: 'text.subtext.placeholder.dark' }}
                  />
                </FormControl>

                <FormControl>
                  <AppInput
                    width="100%"
                    height="48px"
                    placeholder={t('designerSidebar.footerConfig.linkManagement.inputs.url')}
                    name="link"
                    value={item.link}
                    onChange={(e) => handleChange(index, e.target.value, 'link')}
                    borderColor="neutral.gray.800"
                    backgroundColor="#1A1A1A"
                    color="white"
                    _placeholder={{ color: 'text.subtext.placeholder.dark' }}
                  />
                </FormControl>
              </VStack>

              {index < shopDesign.footerLinks.length - 1 && <Divider borderColor="neutral.gray.800" />}
            </Flex>
          ))}

          <AppButton
            width="100%"
            height="auto"
            variant="outlined"
            leftIcon={<LinkMd />}
            borderColor="neutral.gray.800"
            color="text.link"
            marginTop={2}
            onClick={addLink}
            _hover="none"
          >
            {t('designerSidebar.footerConfig.linkManagement.newLink')}
          </AppButton>
        </Box>
      </SectionItem>
    </VStack>
  );
}

export default FooterConfig;
