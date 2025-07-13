import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EmbedCodeSectionProps {
  embedCode: string;
  configLink: string;
  helpLink: string;
}

const EmbedCodeSection: React.FC<EmbedCodeSectionProps> = ({ embedCode, configLink, helpLink }) => {
  const { t } = useLocaleResources('products');
  const navigate = useNavigate();
  const { showToast } = useAppToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    showToast({ message: t('shareModal.embedCode.copied'), type: 'success', options: { duration: 1500 } });
  };

  const handleNavigate = (link: string) => navigate(link);

  return (
    <Flex width="100%" padding="32px" flexDirection="column" alignItems="flex-start" gap="16px" borderRadius="12px" border="1px solid" borderColor="neutral.gray.800" background="#141414" position="relative" mt="0">
      <Text fontSize="14px" fontWeight="bold" color="white" position="absolute" px="8px" zIndex="1">
        {t('shareModal.embedCode.title')}
      </Text>

      <Box
        as="pre"
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        lineHeight="24px"
        color="#737373"
        overflowX="auto"
        whiteSpace="pre-wrap"
        position="relative"
        width="100%"
        background="neutral.gray.1000"
        borderRadius="8px"
        padding="16px"
        border="1px solid"
        borderColor="neutral.gray.800"
        mt="16px"
      >
        <AppIcons.Copy
          width={20}
          height={20}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer'
          }}
          onClick={handleCopy}
        />
        {embedCode}
      </Box>

      <Flex justifyContent="space-between" pt="16px" mt="16px" width="100%" borderTop="1px solid" borderColor="neutral.gray.800">
        <Button
          leftIcon={<AppIcons.SettingIcon width={20} height={20} />}
          color="#FFF"
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="500"
          lineHeight="20px"
          variant="unstyled"
          display="flex"
          alignItems="center"
          gap="8px"
          onClick={() => handleNavigate(configLink)} // استفاده از handleNavigate برای هدایت
        >
          {t('shareModal.embedCode.configure')}
        </Button>
        <Link href={helpLink} target="_blank" rel="noopener noreferrer">
          <Button
            leftIcon={<AppIcons.HelpCenter />}
            color="#179EF8"
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            {t('shareModal.embedCode.needHelp')}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default EmbedCodeSection;
