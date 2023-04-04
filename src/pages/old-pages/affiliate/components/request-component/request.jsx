import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { TextComponent , RequestButton} from "./request-style";

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
        <Flex w="100%" pl="36px" justifyContent='space-between'>

          <Flex>
            <Image
              src={request.product.imageUrl}
              w="104px"
              h="104px"
              borderRadius="8px"
              mr="36px"
            />
            <Flex flexDir="column" h="100%" justifyContent="space-between">
              <TextComponent>{request.product.title}</TextComponent>

              <Flex>
                <TextComponent>
                  {request.product.options[0].variantName}:{" "}
                  {request.product.options[0].value}
                </TextComponent>
                <Box
                  w="1px"
                  h="100%"
                  borderRight="2px solid"
                  borderColor="line"
                  mx="14px"
                ></Box>
                <TextComponent>
                  Quantity: {request.product.quantity}
                </TextComponent>
                <Box
                  w="1px"
                  h="100%"
                  borderRight="2px solid"
                  borderColor="line"
                  mx="14px"
                ></Box>
                <TextComponent>
                  Commision: {request.product.Commision}%
                </TextComponent>
              </Flex>

              <TextComponent>Price: {request.product.price}ETH</TextComponent>
              <TextComponent>Your earning: 12 ETH /each</TextComponent>
            </Flex>
          </Flex>

          <Flex w='auto' flexDir='column' justifyContent='space-between'  h='100%'>

           <RequestButton bg='primaryDark' color='primary'>Accept</RequestButton>

           <RequestButton bg='mainLayer' color='lightGray'>Reject</RequestButton>

          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RequestComponent;
