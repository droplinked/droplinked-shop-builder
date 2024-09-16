import React from "react";
import { Box, Flex, Text, Link , Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // وارد کردن useNavigate از react-router-dom
import AppIcons from "assest/icon/Appicons";
import useAppToast from 'functions/hooks/toast/useToast'

interface EmbedCodeSectionProps {
  embedCode: string; // متن کد تعبیه شده
  configLink: string; // لینک صفحه تنظیمات
  helpLink: string; // لینک صفحه کمک
}

const EmbedCodeSection: React.FC<EmbedCodeSectionProps> = ({
  embedCode,
  configLink,
  helpLink,
}) => {
  const navigate = useNavigate(); // استفاده از useNavigate برای ناوبری
  const { showToast } = useAppToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    showToast({ message: 'Copied', type: "success", options: { autoClose: 200, hideProgressBar: true } })
  };

  const handleNavigate = (link: string) => {
    navigate(link); // هدایت به مسیر با استفاده از useNavigate
  };

  return (
    <Flex
      width="100%"
      padding="32px"
      flexDirection="column"
      alignItems="flex-start"
      gap="16px"
      borderRadius="12px"
      border="1px solid #292929"
      background="#141414"
      position="relative"
      mt="0"
    >
      <Text fontSize="14px" fontWeight="bold" color="white" mb="16px">
        Embed Code
      </Text>
      {/* کد تعبیه */}
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
        background="#1C1C1C"
        borderRadius="8px"
        padding="16px"
        border="1px solid #292929"
      >
        {/* دکمه کپی بالا سمت راست */}
        <AppIcons.Copy
          width={20}
          height={20}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            cursor: "pointer",
          }}
          onClick={handleCopy}
        />

        {embedCode}
      </Box>

      {/* بخش پایینی: دکمه تنظیم و کمک */}
      <Flex justifyContent="space-between" pt='16px' mt="16px" width="100%" borderTop='1px solid 292929'>
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
          Configure
        </Button>
        <Link href={helpLink} target="_blank" rel="noopener noreferrer">
        <Button
          leftIcon={<AppIcons.HelpCenter width={20} height={20} />}
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
          Need Help? Visit Help Center
        </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default EmbedCodeSection;
