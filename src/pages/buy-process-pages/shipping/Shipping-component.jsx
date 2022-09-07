import { Flex, Text, Box } from "@chakra-ui/react";
import { convertToStandardFormat } from "../../../utils/date.utils/convertDate";

const ShippingComponent = ({ shippingItem, selected, setSelected }) => {
 
  return (
    <Box
      p="10px 15px"
      w="100%"
      mb="30px"
      border="3px solid"
      borderColor={
        selected && selected.id == shippingItem.id ? "#8053ff" : "#4d4d4d"
      }
      borderRadius="30px"
      // justifyContent="space-between"
      cursor="pointer"
      onClick={() => {
        setSelected(shippingItem);
      }}
    >
      <Flex w="100%" justifyContent="space-between" >
        <Text color="#fff">{shippingItem.title}</Text>
        <Text color="#fff">${shippingItem.price}</Text>
      </Flex>
      {(shippingItem.delivery_range !=null ) && (
        <Flex w="100%" justifyContent="space-between" mt="10px">
          <Text color="#fff" fontSize={{base:'12px' , md:'14px'}}>Delivery range</Text>
          <Text color="#fff" fontSize={{base:'12px' , md:'14px'}}>
            {convertToStandardFormat(shippingItem.delivery_range[0])}{" "}_{" "}
            {convertToStandardFormat(shippingItem.delivery_range[1])}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ShippingComponent;
