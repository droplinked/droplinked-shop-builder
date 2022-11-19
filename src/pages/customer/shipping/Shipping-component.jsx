import { Flex, Text, Box } from "@chakra-ui/react";
import { convertToStandardFormat } from "../../../utils/date.utils/convertDate";

const ShippingComponent = ({ shippingItem, selected, setSelected }) => {
 
  return (
    <Box
      p="12px 18px"
      w="100%"
      mb="30px"
      border="3px solid"
      bgColor='#242424'
      borderColor={
        selected && selected.id == shippingItem.id ? "primary" : "#242424"
      }
      borderRadius="8px"
      // justifyContent="space-between"
      cursor="pointer"
      onClick={() => {
        setSelected(shippingItem);
      }}
    >
      <Flex w="100%" justifyContent="space-between" >
        <Text color="#fff" fontSize='20px' >{shippingItem.title}</Text>
        <Text color="#fff" fontSize='20px'>${shippingItem.price}</Text>
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
