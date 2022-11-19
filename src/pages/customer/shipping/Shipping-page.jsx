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
import { useNavigate, useParams } from "react-router-dom";
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
  const { cart, updateCart } = useCart();
  let { shopname } = useParams();

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

  const getShippings = async () => {
    // get easypost shipping
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      let result = await getEasypostShipping();
      //
      if (result.status == "success") {
        if (
          result.data.shippingRates &&
          result.data.shippingRates.type == "CUSTOM"
        ) {
          navigate(`/${shopname}/payment`);
        } else {
          setShippings(result.data.shippingRates);
          if (result.data.shippingRates.length > 0)
            setSelectedShipping(result.data.shippingRates[0]);
        }
      } else {
        errorToast(result.reason);
        return;
      }
    } else {
      // get shopify shipping
      let result = await getShippingRate();
      if (result.status == "success") {
        setShippings(result.data.shipping_rates);
        if (result.data.shipping_rates.length > 0)
          setSelectedShipping(result.data.shipping_rates[0]);
      } else {
        errorToast(result.reason);
      }
    }
  };

  const getTotalPrice = () => {
    if (cart == null) return 0;
    let total = 0;
    // calculate for shopify products
    if (cart.type == SHOP_TYPES.SHOPIFY) {
      cart.items.forEach(
        (item) => (total += parseFloat(item.variant.price) * item.amount)
      );
    } else {
      // calculate for ims products
      cart.items.forEach(
        (item) => (total += parseFloat(item.sku.price) * item.quantity)
      );
    }
    total += parseFloat(getShippingPrice());
    return total.toFixed(2);
  };

  const submitForm = async () => {
    if (selectedShipping == null) {
      errorToast("Select a shipping please");
      return;
    }

    if (cart.type == SHOP_TYPES.DROPLINKED) {
      setLoading(true);
      let result = await setEasypostShpping(selectedShipping.id);
      await updateCart();
      setLoading(false);
      if (result == true) {
        navigate(`/${shopname}/payment`);
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
        navigate(`/${shopname}/payment`);
        setLoading(false);
      } else {
        console.log(result);
      }

      setLoading(false);
    }
  };

  const backButton = () => navigate(`/${shopname}/address`);

  return (
    <Flex
      w="100%"
      flexDir="column"
      //  px={{ base: "20px", md: "80px" }}
      justifyContent="center"
      alignItems="center"
    >

      {shippings == null ? (
        <Loading />
      ) : (
        <Flex
          maxW="1000px"
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <Text
            fontSize={{ base: "20px", md: "36px" }}
            fontWeight="600"
            color="#fff"
            m="0px auto 48px auto"
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
          <Box borderBottom="3px solid #242424" w="100%"></Box>

          {selectedShipping && (
            <>
              <Text
                textAlign="end"
                fontWeight="600"
                fontSize={{ base: "18px", md: "24px" }}
                color="#fff"
                w="100%"
                px="22px"
                mb="60px"
                mt="30px"
              >
                Total price: ${getTotalPrice()}
              </Text>
            </>
          )}

          <Flex w="100%" justifyContent="space-between" h="40px" px="22px">
            <Box w={{ base: "150px", md: "200px" }} h="100%">
              <BasicButton
                disable={loading}
                click={backButton}
                cancelType={true}
              >
                Back
              </BasicButton>
            </Box>
            <Box w={{ base: "150px", md: "200px" }} h="100%">
              <BasicButton click={submitForm} loading={loading}>
                Next
              </BasicButton>
            </Box>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ShippingPage;
