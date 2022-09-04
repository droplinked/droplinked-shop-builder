import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { confirmPayment } from "../../../api/base-user/Shopify-api";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useCart } from "../../../context/cart/CartContext";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";

const ConfirmPage = () => {
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToasty();
  const { clearCart } = useCart();
  let navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart"));
  const checkoutId = JSON.parse(localStorage.getItem("checkout_id"));
  const sessionId = JSON.parse(localStorage.getItem("session_id"));
  const shippingPrice = JSON.parse(localStorage.getItem("shippingPrice"));

  const getItemsPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.amount * parseFloat(item.variant.price);
    });
    return total;
  };

  const confirm = async () => {
    setLoading(true);
    let result = await confirmPayment(
      cart[0].shopName,
      checkoutId.checkoutId,
      sessionId.sessionId
    );
    if (result == true) {
      localStorage.removeItem('session_id');
      localStorage.removeItem('checkout_id');
      localStorage.removeItem('shippingPrice');
      clearCart();
      navigate("/purchseHistory?redirect_status=succeeded");
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  return (
    <Box w="100%" maxW="1000px" mx="auto" px={{ base: "20px", md: "80px" }}>
      <Box
        display="flex"
        wrap="wrap"
        row-gap="10px"
        w="100%"
        flexDirection="column"
      >
        {/* top side */}
        <Box p="10px 5px" mb="50px" w={{ base: "100%", md: "100%" }}>
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
            Shipping: ${shippingPrice.shippingPrice}
          </Text>
          <Text
            color="#ddd"
            mb="20px"
            fontSize={{ base: "18px", md: "22px" }}
            fontWeight="600"
          >
            Total price: $
            {parseFloat(shippingPrice.shippingPrice) + getItemsPrice()}
          </Text>
        </Box>

        <Flex w="100%" maxW="400px" mx="auto">
          <BasicButton click={confirm} loading={loading}>
            Confirm order
          </BasicButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ConfirmPage;
