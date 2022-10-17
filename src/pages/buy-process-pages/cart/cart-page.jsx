import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { creatShopifySession } from "../../../api/base-user/Shopify-api";
import { useNavigate, useParams } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { confirmPayment } from "../../../api/base-user/Shopify-api";
import { useCart } from "../../../context/cart/CartContext";


import CreditCard from "./CreditCard-component";

const CartPage = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("PAY");

  let navigate = useNavigate();
  const { successToast, errorToast } = useToasty();
  let { shopname } = useParams();
  const { clearCart } = useCart();

  const cart = JSON.parse(localStorage.getItem("cart"));
  const shippingPrice = parseFloat(
    JSON.parse(localStorage.getItem("shippingPrice")).shippingPrice
  ).toFixed(2);
  const checkoutId = JSON.parse(localStorage.getItem("checkout_id"));

  useEffect(() => {
    if (cardData != null) {
      submitForm();
    }
  }, [cardData]);

  const submitForm = async () => {
    setLoading(true);
    setButtonText("Adding card ...")
    let result = await creatShopifySession(cardData);
    if (result.status == "success") {
      // localStorage.setItem(
      //   "session_id",
      //   JSON.stringify({ sessionId: result.data })
      // );
      // navigate(`/${shopname}/confirm`);
      confirmOrder(result.data)

    } else {
      setButtonText("PAY")
      errorToast("Failed");
      setLoading(false);
    }
    setLoading(false);
  };

  const getItemsPrice = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.amount * parseFloat(item.variant.price);
    });
    return total.toFixed(2);
  };

  const getTotal = () => {
    return (parseFloat(shippingPrice) + parseFloat(getItemsPrice())).toFixed(2);
  };

  const confirmOrder = async(sessionId) => {
    setButtonText("Confirming...")
    let result = await confirmPayment(
      cart.items[0].shopName,
      checkoutId.checkoutId,
      sessionId
    );
    if (result == true) {
      navigate("/purchseHistory?redirect_status=succeeded");
      localStorage.removeItem("session_id");
      localStorage.removeItem("checkout_id");
      localStorage.removeItem("shippingPrice");
      clearCart();
    } else {
      setButtonText("PAY")
      errorToast(result);
    }
    

  };

  const backButton = () => navigate(`/${shopname}/shipping`);

  return (
    <Flex
      w="100%"
      flexDir="column"
      px={{ base: "20px", md: "80px" }}
      justifyContent="center"
      alignContent="center"
    >
  
      <Box
        mx="auto"
        maxW="500px"
        p="10px 5px"
        mb="50px"
        w={{ base: "100%", md: "100%" }}
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Text
          color="#ddd"
          mb="20px"
          fontSize={{ base: "18px", md: "22px" }}
          fontWeight="600"
        >
          Items: ${getItemsPrice()}
        </Text>
        <Text
          color="#ddd"
          mb="20px"
          fontSize={{ base: "18px", md: "22px" }}
          fontWeight="600"
        >
          Shipping: ${shippingPrice}
        </Text>
        <Text
          color="#ddd"
          mb="20px"
          fontSize={{ base: "18px", md: "22px" }}
          fontWeight="600"
        >
          Total price: ${getTotal()}
        </Text>
      </Box>

      <Flex w="100%" justifyContent="center" alignContent="center">
        <Box
          w="100%"
          maxW="500px"
          // p="40px 60px"
          py="40px"
          px={{ base: "20px", md: "20px", lg: "60px" }}
          //  border="3px solid #4d4d4d"
          bgColor="#242424"
          borderRadius="8px"
        >
          <CreditCard
            backToShipping={backButton}
            setCard={(e) => setCardData(e)}
            loading={loading}
            buttonText={buttonText}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartPage;
