import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as CopyIcon } from "assest/icon/copy.svg";
import { ReactComponent as ExternalLinkIcon } from "assest/icon/share.svg";
import { ReactComponent as ConfigureIcon } from "assest/icon/share.svg";
import { ReactComponent as DownloadIcon } from "assest/icon/share.svg";

interface PaymentLinkContentProps {
  id: string; // prop `id` برای ساخت لینک
}

const PaymentLinkContent: React.FC<PaymentLinkContentProps> = ({ id }) => {
  // ساخت لینک محصول با استفاده از `id`
  const productLink = `https://droplinked.io/bedi/product/${id}`;
    return (
      <Box width="100%" bg="#292929" padding="32px">
        {/* بخش بالایی: QR کد و دکمه های حالت نمایش */}
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="300px"
          mb="24px"
        >
          {/* تصویر QR کد */}
          <Image
            src="https://upload-file-droplinked.s3.amazonaws.com/3a8f91c98fdbb457d44b0f0eee11a94d7c22ed37801cd06901f1b0a6edd9ce84.png"
            alt="QR Code"
            boxSize="188px"
            mb="24px"
          />
  
          {/* دکمه‌های جابجایی */}
          <Flex gap="8px">
            <Box
              width="37px"
              height="37px"
              borderRadius="50%"
              bg="#1C1C1C"
              border="2px solid #2BCFA1"
            />
            <Box
              width="37px"
              height="37px"
              borderRadius="50%"
              bg="#1C1C1C"
              border="2px solid #FFFFFF"
            />
          </Flex>
        </Flex>
  
        {/* بخش پایینی: لینک محصول و دکمه‌های عمل */}
        <Flex
          flexDirection="column"
          gap="16px"
          alignSelf="stretch"
          borderRadius="12px"
          border="1px solid #292929"
          background="#141414"
          padding="24px"
        >
          {/* نمایش لینک و دکمه‌های کپی و باز کردن */}
          <Flex
            padding="12px 16px"
            alignItems="center"
            gap="16px"
            borderRadius="8px"
            border="1px solid #292929"
            width="100%"
          >
            {/* لینک */}
            <Input
              value={productLink}
              isReadOnly
              variant="unstyled"
              color="white"
              flex="1"
            />
            {/* دکمه کپی */}
            <IconButton
              icon={<CopyIcon width={20} height={20} />}
              aria-label="Copy link"
              colorScheme="whiteAlpha"
              onClick={() => navigator.clipboard.writeText(productLink)}
            />
            {/* دکمه باز کردن لینک */}
            <IconButton
              icon={<ExternalLinkIcon width={20} height={20} />}
              aria-label="Open link"
              background="#2BCFA1"
              _hover={{ bg: "#28B68A" }}
              ml="8px"
            />
          </Flex>
  
          {/* دکمه‌های تنظیم و دانلود QR کد */}
          <Flex justifyContent="space-between" mt="16px">
            <Button
              leftIcon={<ConfigureIcon width={20} height={20} />}
              color="#FFF"
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="500"
              lineHeight="20px"
              variant="unstyled"
              display="flex"
              alignItems="center"
              gap="8px"
            >
              Configure
            </Button>
            <Button
              leftIcon={<DownloadIcon width={20} height={20} />}
              color="#2BCFA1"
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="500"
              lineHeight="20px"
              variant="unstyled"
              display="flex"
              alignItems="center"
              gap="8px"
            >
              Download QR Code
            </Button>
          </Flex>
        </Flex>
      </Box>
    );
  };

export default PaymentLinkContent;
