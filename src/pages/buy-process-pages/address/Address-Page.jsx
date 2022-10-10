import React, { useState, useEffect } from "react";
import { Flex, Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useAddress } from "../../../context/address/AddressContext";
import { addCheckoutAddress } from "../../../api/base-user/Cart-api";
import { createCheckout } from "../../../api/producer/Shopify-api";
import { useCart } from "../../../context/cart/CartContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import { SHOP_TYPES } from "../../../constant/shop-types";
import { useParams } from "react-router-dom";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import AddressComponent from "../../../components/shared/Address/address-component";
import Loading from "../../../components/shared/loading/Loading";
import AddressForm from "../../../components/Modal/Address/Address-modal";

function AddressPage() {
  // navigate if not user
  let navigate = useNavigate();
  const { profile } = useProfile();
  let { shopname } = useParams();
  
  let token = JSON.parse(localStorage.getItem("token"));
  if (!token) navigate("/");

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const { addressList } = useAddress();
  const { cart } = useCart();

  

  const toggleAddressForm = () => {
    setAddressModal((p) => !p);
  };

  useEffect(() => {
    if (addressList.length > 0) setSelectedAddress(addressList[0]);
    else setSelectedAddress(null);
  }, [addressList]);

  const ProccessToPayment = async () => {
    if (selectedAddress == null) {
      errorToast("Please choose an address");
      return;
    }
    // add address for droplinked cart
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      setLoading(true);
      let result = await addCheckoutAddress(selectedAddress._id);
      setLoading(false);
      if (result == true) {
       // successToast("Address successfully added");
        navigate(`/${shopname}/shipping`);
      } else {
        errorToast(result);
      }
    } else {
      // add address for shopify cart
      let addressObj = {
        first_name: selectedAddress.firstname,
        last_name: selectedAddress.lastname,
        country: selectedAddress.country,
        province: selectedAddress.state,
        city: selectedAddress.city,
        address1: selectedAddress.addressLine1,
        address2: selectedAddress.addressLine2,
        zip: selectedAddress.zip,
        phone: "",
      };
      let itemsArray = cart.items.map((item) => {
        return {
          variant_id: item.variant.id,
          quantity: item.amount,
          product_id: item.productId,
        };
      });
      let data = {
        checkout: {
          billing_address: addressObj,
          shipping_address: addressObj,
          line_items: itemsArray,
          email: profile.email,
        },
      };
      setLoading(true);
      let result = await createCheckout(cart.items[0].shopName, data);
      setLoading(false);
      if (result.status == "success") {
        let checkoutId = {
          checkoutId: result.data.checkout.token,
          shopName: cart.items[0].shopName,
        };
        localStorage.setItem("checkout_id", JSON.stringify(checkoutId));
        //successToast("Address successfully added");
        navigate(`/${shopname}/shipping`);
      } else {
        errorToast("Failed");
      }
      setLoading(false);
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="100%"
      h="auto"
    //  px={{ base: "20px", md: "80px" }}
    >
      <Text
        fontSize={{ base: "20px", md: "36px" }}
        fontWeight="600"
        color="#fff"
        m="0px auto 48px auto"
      >
        Select Address
      </Text>

      <Box w="100%" maxW="1000px" m="auto">
        {addressList == [] ? (
          <Loading />
        ) : (
          <>
            {addressList.map((address, i) => {
              if (address.addressType != "SHOP") {
                return (
                  <AddressComponent
                    key={i}
                    address={address}
                    selected={selectedAddress}
                    setSelect={setSelectedAddress}
                    selectAble={true}
                    deleteable={true}
                  />
                );
              }
            })}
            <Box mt="40px"></Box>
            {addressModal ? (
              <AddressForm close={toggleAddressForm} type={"CUSTOMER"} />
            ) : (
              <Flex
                w="100%"
                border="1px"
                borderColor="#fff"
                borderRadius="8px"
                p="24px 20px 16px 20px"
                justifyContent="center"
                alignItems="center"
                color="#fff"
                fontSize="20px"
                fontWeight="600"
                _hover={{ borderColor: "#8053ff", color: "#8053ff" }}
                cursor="pointer"
                onClick={toggleAddressForm}
              >
                + Add new address
              </Flex>
            )}

            <Flex
              w="100%"
              mt="40px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box w="30%">
                <BasicButton
                  cancelType={true}
                  click={() => {
                    navigate(`/${shopname}/checkout`);
                  }}
                  loading={loading}
                >
                  Back
                </BasicButton>
              </Box>
              <Box w="30%">
                <BasicButton click={ProccessToPayment} loading={loading}>
                  Payment
                </BasicButton>
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default AddressPage;
