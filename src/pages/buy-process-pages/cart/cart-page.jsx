import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { creatShopifySession } from "../../../api/base-user/Shopify-api";
import { useNavigate } from "react-router-dom";

import CreditCard from "./CreditCard-component";


const CartPage = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (cardData != null) {
      submitForm()
    }
  }, [cardData]);

  const submitForm = async() => {
    console.log(cardData);
    setLoading(true)
    let result = await creatShopifySession(cardData);
    if (result.status == "success") {
      console.log(result.data);
      localStorage.setItem(
        "session_id",
        JSON.stringify({ sessionId: result.data })
      );
      navigate('/confirm')
    } else {
      setLoading(false)
      console.log(result.data);
    }
    setLoading(false)
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
          <CreditCard setCard={(e) => setCardData(e)} loading={loading} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartPage;
