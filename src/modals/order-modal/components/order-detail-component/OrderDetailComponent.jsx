import {
  Box,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import ItemsComponent from "./components/items-component/ItemsComponent";
const OrderDetailComponent = ({ order }) => {
  return (
    <Box w="100%">
      <Text
        fontFamily="Avenir Next"
        fontWeight="700"
        fontSize="18px"
        color="lightGray"
        w="100%"
        textAlign="center"
        mb="36px"
      >
        Order Details
      </Text>

     {order?.items.length > 0 && <ItemsComponent items={order.items} /> } 
     <Box w="36px" />
     
    </Box>
  );
};

export default OrderDetailComponent;
