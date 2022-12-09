import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { TextComponent } from "./request-style";

const RequestComponent = ({ request }) => {
  return (
    <Box w="100%" p="36px 60px" borderBottom="1px solid" borderColor="line">
      <Flex>
        <Box w="200px" pr="36px" borderRight="1px solid" borderColor="line">
          <Image
            src={request.shopData.imageUrl}
            w="36px"
            h="36px"
            borderRadius="50%"
          />
          <Box mb="8px"></Box>
          <Text fontSize="14px" fontWeight="700" color="primary">
            {request.shopData.shopName}
          </Text>
        </Box>
        <Flex w="100%" pl="36px">
          <Image
            src={request.product.imageUrl}
            w="104px"
            h="104px"
            borderRadius="8px"
            mr="36px"
          />
          <Flex flexDir='column' h='100%' justifyContent='space-between'>
                <TextComponent>{request.product.title}</TextComponent>
                <TextComponent>{request.product.options[0].variantName}: {request.product.options[0].value}</TextComponent>
                <TextComponent>{request.product.options[0].variantName}: {request.product.options[0].value}</TextComponent>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RequestComponent;
