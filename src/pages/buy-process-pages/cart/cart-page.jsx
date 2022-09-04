import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "../payment/stripe.key";
import CheckoutForm from "./CheckoutForm";
import CreditCard from "./CreditCard-component";
import { creatShopifySession } from "../../../api/base-user/Shopify-api";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(STRIPE_KEY.LIVE);

const CartPage = () => {
  const [cardData, setCardData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (cardData != null) {
      submitForm()
    }
  }, [cardData]);

  const submitForm = async() => {
    console.log(cardData);
    let result = await creatShopifySession(cardData);
    if (result.status == "success") {
      console.log(result.data);
      localStorage.setItem(
        "session_id",
        JSON.stringify({ sessionId: result.data })
      );
      navigate('/confirm')
    } else {
      console.log(result.data);
    }
    
  }


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
        <Box
          w="100%"
          maxW="450px"
          p="10px 20px"
          border="3px solid #4d4d4d"
          borderRadius="8px"
        >
          {/* <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements> */}
          <CreditCard setCard={(e) => setCardData(e)} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartPage;
