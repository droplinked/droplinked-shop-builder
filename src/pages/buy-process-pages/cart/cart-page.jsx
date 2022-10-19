import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { creatShopifySession } from "../../../api/base-user/Shopify-api";
import { useNavigate, useParams } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { confirmPayment } from "../../../api/base-user/Shopify-api";
import { useCart } from "../../../context/cart/CartContext";

import CreditCard from "./CreditCard-component";
import Item from "./pitem";

const CartPage = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("PAY");

  let navigate = useNavigate();
  const { errorToast } = useToasty();
  let { shopname } = useParams();
  const { clearCart } = useCart();

  const cart = JSON.parse(localStorage.getItem("cart"));
  const shippingPrice = parseFloat(
    JSON.parse(localStorage.getItem("shippingPrice")).shippingPrice
  ).toFixed(2);
  const checkoutId = JSON.parse(localStorage.getItem("checkout_id"));
  const selectedAddress = JSON.parse(localStorage.getItem("selected_address"));

  console.log(selectedAddress);

  useEffect(() => {
    if (cardData != null) {
      submitForm();
    }
  }, [cardData]);

  const submitForm = async () => {
    setLoading(true);
    setButtonText("Adding card ...");
    let result = await creatShopifySession(cardData);
    if (result.status == "success") {
      // localStorage.setItem(
      //   "session_id",
      //   JSON.stringify({ sessionId: result.data })
      // );
      // navigate(`/${shopname}/confirm`);
      confirmOrder(result.data);
    } else {
      setButtonText("PAY");
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

  const confirmOrder = async (sessionId) => {
    setButtonText("Confirming...");
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
      setButtonText("PAY");
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
      maxW="1000px"
      mx="auto"
    >
      <Box w="100%" mx="auto" bg="gray" p="40px" borderRadius="8px" mb="24px">
        {cart.items.map((item, i) => {
          return <Item key={i} product={item} />;
        })}
        <Text
          textAlign="end"
          w="100%"
          mt="20px"
         // mb="15px"
          color="#fff"
          fontWeight="400"
          fontSize={{ base: "16px", md: "20px" }}
        >
          Total price: ${getItemsPrice()}
        </Text>
      </Box>

      <Box
        w="100%"
        mx="auto"
        bg="gray"
        p="40px 40px"
        borderRadius="8px"
        mb="24px"
      >
        <Text
          w="100%"
          mb="7px"
          color="#fff"
          fontWeight="500"
          fontSize={{ base: "18px", md: "24px" }}
        >
          {selectedAddress.country} - {selectedAddress.state} ,{" "}
          {selectedAddress.firstname} {selectedAddress.lastname}
        </Text>
        <Text
          w="100%"
          mb="5px"
          color="#fff"
          fontWeight="400"
          fontSize={{ base: "16px", md: "20px" }}
        >
          {selectedAddress.addressLine1}
        </Text>

        <Flex w="100%" justifyContent="space-between" >
          <Text
            color="#fff"
            fontWeight="400"
            fontSize={{ base: "12px", md: "20px" }}
          >
            {selectedAddress.city} {selectedAddress.zip}{" "}
          </Text>

          <Text
            color="#fff"
            fontWeight="400"
            fontSize={{ base: "16px", md: "20px" }}
          >
            Shipping price: ${shippingPrice}
          </Text>
        </Flex>
      </Box>
      <Box w="100%" borderBottom="1px solid #757575" mb="32px"></Box>
      <Text
      w="100%"
      textAlign='start'
        mb="32px"
        color="#fff"
        fontWeight="400"
        fontSize={{ base: "16px", md: "20px" }}
      >
        Total payment: ${getTotal()}
      </Text>

      {/* <Flex w="100%" justifyContent="end">
        <Box
          p="10px 5px"
          mb="20px"
          w="50%"
          display="flex"
          flexDir="column"
          borderBottom="2px solid gray"
        >
          <Flex w="100%" justifyContent="space-between">
            <Text
              color="#ddd"
              mb="10px"
              fontSize={{ base: "18px", md: "18px" }}
              fontWeight="600"
            >
              Items:
            </Text>
            <Text
              color="#ddd"
              mb="10px"
              fontSize={{ base: "18px", md: "18px" }}
              fontWeight="600"
            >
              ${getItemsPrice()}
            </Text>
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <Text
              color="#ddd"
              mb="10px"
              fontSize={{ base: "18px", md: "18px" }}
              fontWeight="600"
            >
              Shipping:
            </Text>
            <Text
              color="#ddd"
              mb="10px"
              fontSize={{ base: "18px", md: "18px" }}
              fontWeight="600"
            >
              ${shippingPrice}
            </Text>
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <Text
              color="#ddd"
              fontSize={{ base: "18px", md: "18px" }}
              fontWeight="600"
            >
              Taxes:
            </Text>
            <Text
              color="#ddd"
              fontSize={{ base: "18px", md: "18px" }}
              fontWeight="600"
            >
              $0
            </Text>
          </Flex>
        </Box>
      </Flex> */}

      {/* <Flex w="100%" justifyContent="end" mb="20px">
        <Flex w="50%" justifyContent="space-between">
          <Text
            color="#ddd"
            mb="20px"
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="600"
          >
            Total price:
          </Text>
          <Text
            color="#ddd"
            mb="20px"
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="600"
          >
            ${getTotal()}
          </Text>
        </Flex>
      </Flex> */}

      <Flex w="100%" justifyContent="center" alignContent="center">
        <Box
          w="100%"
          
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
