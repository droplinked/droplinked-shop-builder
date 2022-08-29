import { Flex, Box, Text } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_live_t7ZN7UCX5c796aGxu65SznV1");

const CartPage = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      p={{ base: "20px", md: "80px" }}
      justifyContent="center"
      alignContent="center"
    >
      <Text
        color="#fff"
        fontSize={{ base: "25px", md: "30px" }}
        fontWeight="600"
        textAlign="center"
        mb="50px"
      >
        Add card
      </Text>

      <Flex w="100%" justifyContent="center" alignContent="center">
        <Box w='100%' maxW='450px' p='10px 20px' border='3px solid #4d4d4d' borderRadius='8px'>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartPage;
