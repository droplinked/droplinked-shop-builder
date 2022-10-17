import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { confirmPayment } from "../../../api/base-user/Shopify-api";
import { useNavigate, useParams } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useCart } from "../../../context/cart/CartContext";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";

const ConfirmPage = () => {
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToasty();
  const { clearCart } = useCart();

  let navigate = useNavigate();
  let { shopname } = useParams();

  const cart = JSON.parse(localStorage.getItem("cart"));
  const checkoutId = JSON.parse(localStorage.getItem("checkout_id"));
  const sessionId = JSON.parse(localStorage.getItem("session_id"));
  const shippingPrice = parseFloat(
    JSON.parse(localStorage.getItem("shippingPrice")).shippingPrice
  ).toFixed(2);

  const getItemsPrice = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.amount * parseFloat(item.variant.price);
    });
    return total.toFixed(2);
  };

  const confirm = async () => {
    setLoading(true);
    let result = await confirmPayment(
      cart.items[0].shopName,
      checkoutId.checkoutId,
      sessionId.sessionId
    );
    if (result == true) {
      navigate("/purchseHistory?redirect_status=succeeded");
      localStorage.removeItem("session_id");
      localStorage.removeItem("checkout_id");
      localStorage.removeItem("shippingPrice");
      clearCart();
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  const getTotal = () => {
    return (parseFloat(shippingPrice) + parseFloat(getItemsPrice())).toFixed(2);
  };

  const backButton = () => navigate(`${shopname}/card`);

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
        

        <Flex w="100%" justifyContent="space-between">
          <BasicButton
            w="30%"
            click={backButton}
            loading={loading}
            cancelType={true}
          >
            Back
          </BasicButton>
          <BasicButton w="50%" click={confirm} loading={loading}>
            Confirm order
          </BasicButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ConfirmPage;
