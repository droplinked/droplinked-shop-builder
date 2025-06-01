import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Layout2Md } from 'assets/icons/StyleDesigner/Layout2/Layout2Md';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';
import SectionItem from '../../common/SectionItem';
import useLocaleResources from '../../../../../../../hooks/useLocaleResources/useLocaleResources';
import localEn from '../../../../../../../locales/storefront/en.json';
import localAr from '../../../../../../../locales/storefront/ar.json';

const TemplateSelector: React.FC = () => {
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  return (
    <SectionItem 
      title={t('designerSidebar.themeConfig.template.title')} 
      description={t('designerSidebar.themeConfig.template.description')}
    >
      <Flex gap="3" w="100%">
        <Box flex="1" borderWidth="1px" borderColor="main.primary" borderRadius="lg" pl={3} pt={3} cursor="pointer">
          <Image
            h={'100%'}
            src="https://upload-file-droplinked.s3.amazonaws.com/db5de5352f04fb252bb5130d5763dcb768b0c9b32ef69228052b4fdc9832dfd1.png"
            alt={t('designerSidebar.themeConfig.template.defaultTemplate')}
          />
        </Box>

        <Box
          flex="1"
          borderWidth="1px"
          p={3}
          borderColor="neutral.gray.800"
          borderRadius="lg"
          cursor="pointer"
          onClick={() => window.open('mailto:support@droplinked.com')}
        >
          <IconWrapper icon={<Layout2Md color="white" />}></IconWrapper>
          <Text color="white" fontSize="sm" mt={2}>
            {t('designerSidebar.themeConfig.template.customTemplate')}
          </Text>
        </Box>
      </Flex>
    </SectionItem>
  );
};

export default TemplateSelector;
