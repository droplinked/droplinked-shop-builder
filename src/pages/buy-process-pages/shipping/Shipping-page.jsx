import { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import {
  getShippingRate,
  updateCheckout,
} from "../../../api/base-user/Shopify-api";
import {
  getEasypostShipping,
  setEasypostShpping,
} from "../../../api/base-user/Cart-api";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart/CartContext";
import { SHOP_TYPES } from "../../../constant/shop-types";

import Loading from "../../../components/shared/loading/Loading";
import ShippingComponent from "./Shipping-component";
import EasypostShipping from "./easypost-shipping-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
const ShippingPage = () => {
  const [shippings, setShippings] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const { successToast, errorToast } = useToasty();
  const { cart } = useCart();

  const getShippingPrice = () => {
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      return selectedShipping.rate;
    } else {
      return selectedShipping.price;
    }
  };

  const checkoutObj = JSON.parse(localStorage.getItem("checkout_id"));
  useEffect(() => {
    getShippings();
  }, [cart]);

  console.log(selectedShipping);

  const getShippings = async () => {
    // get easypost shipping
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      let result = await getEasypostShipping();

      if (result.status == "success") {
        setShippings(result.data.shippingRates);
      } else {
        errorToast(result.reason);
        return;
      }
    } else {
      // get shopify shipping
      let result = await getShippingRate();
      if (result.status == "success") {
        setShippings(result.data.shipping_rates);
      } else {
        errorToast(result.reason);
      }
    }
  };

  const submitForm = async () => {
    if (selectedShipping == null) {
      errorToast("Select a shipping please");
      return;
    }

    if (cart.type == SHOP_TYPES.DROPLINKED) {
      setLoading(true);
      let result = await setEasypostShpping(selectedShipping.id);

      setLoading(false);
      if (result == true) {
        navigate("/payment");
      } else {
        console.log(result);
      }
    } else {
      // add shipping for shopify cart

      setLoading(true);
      let result = await updateCheckout(
        checkoutObj.shopName,
        checkoutObj.checkoutId,
        selectedShipping.handle
      );
      if (result.status == "success") {
        localStorage.setItem(
          "customer-id",
          JSON.stringify({ customerId: "cus_LImymG9KktMZdb" })
        );
        localStorage.setItem(
          "shippingPrice",
          JSON.stringify({
            shippingPrice: result.data.checkout.shipping_rate.price,
          })
        );
        navigate("/card");
        setLoading(false);

        // successToast("");
      } else {
        console.log(result);
      }

      setLoading(false);
    }
  };


  const backButton = () => navigate("/address");

  return (
    <Flex
      w="100%"
      flexDir="column"
      px={{ base: "20px", md: "80px" }}
      justifyContent="center"
      alignItems="center"
    >
      {shippings == null ? (
        <Loading />
      ) : (
        <Flex
          maxW="600px"
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="600"
            color="#fff"
            mb="40px"
          >
            Shipping
          </Text>
          {cart.type == SHOP_TYPES.DROPLINKED ? (
            <>
              {shippings.map((shippingItem, i) => {
                return (
                  <EasypostShipping
                    key={i}
                    shippingItem={shippingItem}
                    selected={selectedShipping}
                    setSelected={setSelectedShipping}
                  />
                );
              })}
            </>
          ) : (
            <>
              {shippings.map((shippingItem, i) => {
                return (
                  <ShippingComponent
                    key={i}
                    shippingItem={shippingItem}
                    selected={selectedShipping}
                    setSelected={setSelectedShipping}
                  />
                );
              })}
            </>
          )}
          <Box borderBottom="3px solid #4d4d4d" w="100%" mb="15px"></Box>

          {selectedShipping && (
            <>
              {/* <Text
                fontWeight="600"
                fontSize="18px"
                color="#fff"
                w="100%"
                mb="10px"
              >
                Merchs: ${selectedShipping.checkout.subtotal_price}
              </Text> */}
              <Text
                fontWeight="600"
                fontSize="18px"
                color="#fff"
                w="100%"
                mb="60px"
              >
                Shipping: ${getShippingPrice()}
              </Text>
              {/* <Text
                fontWeight="600"
                fontSize="18px"
                color="#fff"
                w="100%"
                mb="60px"
              >
                Total price: ${selectedShipping.checkout.total_price}
              </Text> */}
            </>
          )}

          <Flex w="100%" justifyContent="space-between" h="40px">
            <Box w={{ base: "150px", md: "200px" }} h="100%">
              <BasicButton loading={loading} click={backButton}>
                Back
              </BasicButton>
            </Box>
            <Box w={{ base: "150px", md: "200px" }} h="100%">
              <BasicButton click={submitForm} loading={loading}>
                Submit
              </BasicButton>
            </Box>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ShippingPage;
