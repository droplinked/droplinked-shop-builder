import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { creatShopifySession } from "../../../api/base-user/Shopify-api";
import { useNavigate ,useParams} from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";

import CreditCard from "./CreditCard-component";

const CartPage = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const { successToast, errorToast } = useToasty();
  let { shopname } = useParams();

  useEffect(() => {
    if (cardData != null) {
      submitForm();
    }
  }, [cardData]);

  const submitForm = async () => {
    setLoading(true);
    let result = await creatShopifySession(cardData);
    if (result.status == "success") {
      localStorage.setItem(
        "session_id",
        JSON.stringify({ sessionId: result.data })
      );
      navigate(`/${shopname}/confirm`);
    } else {
      errorToast("Failed")
      setLoading(false);
    }
    setLoading(false);
  };

  const backButton = () => navigate(`/${shopname}/shipping`);

  return (
    <Flex
      w="100%"
      flexDir="column"
      px={{ base: "20px", md: "80px"}}
      justifyContent="center"
      alignContent="center"
    >
      <Text
        fontSize={{ base: "20px", md: "36px" }}
        fontWeight="600"
        color="#fff"
        m="0px auto 48px auto"
      >
        Add card
      </Text>

      <Flex w="100%" justifyContent="center" alignContent="center">
        <Box
          w="100%"
          maxW="1000px"
         // p="40px 60px"
          py='40px'
          px={{ base: "20px", md: "20px" , lg:'60px'}}
        //  border="3px solid #4d4d4d"
        bgColor='#242424'
          borderRadius="8px"
        >
          <CreditCard
            backToShipping={backButton}
            setCard={(e) => setCardData(e)}
            loading={loading}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartPage;
