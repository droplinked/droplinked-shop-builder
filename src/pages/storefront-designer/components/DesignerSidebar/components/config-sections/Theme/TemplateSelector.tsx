import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Layout2Md } from 'assets/icons/StyleDesigner/Layout2/Layout2Md';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';
import SectionItem from '../../common/SectionItem';

const TemplateSelector: React.FC = () => {

  return (
    <SectionItem title="Storefront Template" description="Choose from one of the designs below or order a custom one.">
      <Flex gap="3" w="100%">
        <Box flex="1" borderWidth="1px" borderColor="main.primary" borderRadius="lg" pl={3} pt={3} cursor="pointer">
          <Image
            h={'100%'}
            src="https://upload-file-droplinked.s3.amazonaws.com/db5de5352f04fb252bb5130d5763dcb768b0c9b32ef69228052b4fdc9832dfd1.png"
            alt="defualt template"
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
            Order a customized template
          </Text>
        </Box>
      </Flex>
    </SectionItem>
  );
};

export default TemplateSelector;
