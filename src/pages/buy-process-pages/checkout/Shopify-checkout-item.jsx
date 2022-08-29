import {
  Flex,
  Text,
  Image,
  ButtonGroup,
  IconButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";

const ShopifyCheckoutItem = ({ product, variant, amount }) => {
  console.log(product);
  console.log(variant);
  console.log(amount);
  return (
    <Flex
      w="100%"
      p="5px"
      bgColor="#333"
      h="auto"
      mb="10px"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Flex w={{ base: "100%", md: "50%" }} flexDirection="row">
        <Image
          src={product.images[0].src}
          alt="product image"
          w="80px"
          h="80px"
          mr="20px"
          cursor="pointer"
         // onClick={clickOnProduct}
        />
        <Flex flexDirection="column" align="start" maxW="100%">
          <Text
            color="#fff"
            fontWeight="600"
            fontSize={{ base: "16px", md: "18px" }}
            mb="5px"
            overflow="hidden"
            cursor="pointer"
          //  onClick={clickOnProduct}
          >
             {product.title} 
          </Text>

           {variant&& (
            <Text
              color="#ddd"
              fontWeight="500"
              fontSize={{ base: "14px", md: "13px" }}
            >
              {variant.option_values[0].name} : {variant.option_values[0].value}
            </Text>
          )} 
        </Flex>
      </Flex>

      <Flex
        w={{ base: "100%", md: "45%" }}
        mr="20px"
        h={{ base: "60px", md: "80px" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonGroup size="md" isAttached variant="outline">
          <IconButton
            aria-label="delete"
            icon={
              <AiOutlineDelete
                color="#fd4545"
                size="sm"
                style={{ maxHeight: "100%" }}
              />
            }
            _hover={{ bgColor: "none", borderColor: "#8053ff" }}
            _focus={{ bgColor: "none", borderColor: "#8053ff" }}
            _active={{ bgColor: "none", borderColor: "#8053ff" }}
           // onClick={deleteMerch}
           // disabled={disableDeleteBtn}
          />
          <Input
            value={amount}
            borderRadius="0px"
            cursor="pointer"
            w="80px"
            textAlign="center"
            color="#fff"
            fontSize="20px"
            fontWeight="600"
            _hover={{ bgColor: "none", borderColor: "#8053ff" }}
            _focus={{ bgColor: "none", borderColor: "#8053ff" }}
          //  onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            color="#fff"
            fontSize="20px"
            fontWeight="600"
            _hover={{ bgColor: "none", borderColor: "#8053ff" }}
            _focus={{ bgColor: "none", borderColor: "#8053ff" }}
          //  onClick={updateQ}
          //  disabled={disableEditBtn}
          >
            Submit
          </Button>
        </ButtonGroup>

        <Text color="#fff" fontWeight="600" fontSize="18">
           ${variant.price} 
        </Text>
      </Flex>
    </Flex>
  );
};
export default ShopifyCheckoutItem;
