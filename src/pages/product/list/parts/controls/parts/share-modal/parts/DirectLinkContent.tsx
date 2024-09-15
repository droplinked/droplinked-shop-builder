import { Box, Flex, Image, Input, Button, IconButton } from "@chakra-ui/react";
import { ReactComponent as CopyIcon } from "assest/icon/copy.svg";
import { ReactComponent as ExternalLinkIcon } from "assest/icon/share.svg";

const DirectLinkContent = () => {
  const productLink = "https://droplinked.io/bedi/product/digital-pr...";

  return (
    <Box width="100%" bg="#292929" padding="32px">
      {/* بخش بالایی */}
      <Flex
        justifyContent="center"
        alignItems="center"
        flex="1 0 0"
        alignSelf="stretch"
        height="300px"
      >
        <Image
          src="https://upload-file-droplinked.s3.amazonaws.com/cc82d904fa5afa573b2994a2f4afbccd81caad24a773e9063f451860f158d892.png"
          alt="Centered Icon"
        />
      </Flex>

      {/* بخش پایینی */}
      <Flex
        padding="32px"
        alignItems="center"
        gap="16px"
        alignSelf="stretch"
        borderRadius="12px"
        border="1px solid #292929"
        background="#141414"
        mt="24px"
      >
        {/* نمایش لینک و دکمه‌های کپی و باز کردن */}
        <Flex
          padding="12px 16px"
          alignItems="center"
          gap="16px"
          flex="1 0 0"
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
          <CopyIcon
            icon={<CopyIcon />}
            aria-label="Copy link"
            colorScheme="whiteAlpha"
            onClick={() => navigator.clipboard.writeText(productLink)}
          />
        </Flex>

        {/* دکمه باز کردن لینک */}
        <Button
          display="flex"
          padding="14px"
          justifyContent="center"
          alignItems="center"
          gap="4px"
          borderRadius="8px"
          background="#2BCFA1"
          _hover={{ bg: "#28B68A" }}
        >
          <ExternalLinkIcon w={5} h={5} />
        </Button>
      </Flex>
    </Box>
  );
};

export default DirectLinkContent;
