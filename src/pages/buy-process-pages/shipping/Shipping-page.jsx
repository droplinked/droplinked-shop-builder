import { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import {
  getShippingRate,
  updateCheckout,
} from "../../../api/base-user/Shopify-api";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/shared/loading/Loading";
import ShippingComponent from "./Shipping-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
const ShippingPage = () => {

  const [shippings, setShippings] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const { successToast, errorToast } = useToasty();
  const checkoutObj = JSON.parse(localStorage.getItem("checkout_id"));
  useEffect(() => {
    getShippings();
  }, []);

  const getShippings = async () => {
    let result = await getShippingRate();
    if (result.status == "success") {
      setShippings(result.data.shipping_rates);
    } else {
      console.log(result.reason);
    }
  };

  const submitForm = async () => {
    if (selectedShipping == null) {
      errorToast("Select a shipping please");
      return;
    }

    setLoading(true)
    let result = await updateCheckout(checkoutObj.shopName , checkoutObj.checkoutId,selectedShipping.handle) 
    if(result.status == 'success'){
      navigate("/card")
     // successToast("");
    }else{
     //   console.log(result);
    }

    setLoading(false)
  };


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
          <Box borderBottom="3px solid #4d4d4d" w="100%" mb="15px"></Box>

          {selectedShipping && (
            <>
              <Text
                fontWeight="600"
                fontSize="18px"
                color="#fff"
                w="100%"
                mb="10px"
              >
                Merchs: ${selectedShipping.checkout.subtotal_price}
              </Text>
              <Text
                fontWeight="600"
                fontSize="18px"
                color="#fff"
                w="100%"
                mb="10px"
              >
                Shipping: ${selectedShipping.price}
              </Text>
              <Text
                fontWeight="600"
                fontSize="18px"
                color="#fff"
                w="100%"
                mb="60px"
              >
                Total price: ${selectedShipping.checkout.total_price}
              </Text>
            </>
          )}

          <Flex w="100%" justifyContent="space-between" h="40px">
            <Box w={{ base: "150px", md: "200px" }} h="100%">
              <BasicButton loading={loading}> Back</BasicButton>
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
