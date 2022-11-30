import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useAddress } from "../../../context/address/AddressContext";
import { addCheckoutAddress } from "../../../api/base-user/Cart-api";
import { createCheckout } from "../../../api/producer/Shopify-api";
import { useCart } from "../../../context/cart/CartContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import { SHOP_TYPES } from "../../../constant/shop-types";
import { UseWalletInfo } from "../../../context/wallet/WalletContext";
import { useParams } from "react-router-dom";
import { API_STATUS } from "../../../constant/api-status";
import {
  AddressPageWrapper,
  PageTitle,
  AddAddressButton,
  ButtonWrapper,
} from "./Address-page-style";
import { getAddressObject, getShopifyData } from "./address-utils";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import AddressComponent from "../../../components/shared/Address/address-component";
import Loading from "../../../components/shared/loading/Loading";
import AddressForm from "../../../components/Modal/Address/Address-modal";

function AddressPage() {
  // hooks
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { shopname } = useParams();
  const { getStxAddress } = UseWalletInfo();
  const { errorToast } = useToasty();
  const { addressList } = useAddress();
  const { cart } = useCart();
  // state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);

  let token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    // navigate if not user
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    if (addressList) {
      if (addressList.length > 0) setSelectedAddress(addressList[0]);
      else setSelectedAddress(null);
    }
  }, [addressList]);

  const toggleAddressForm = () => setAddressModal((p) => !p);

  const submitAddressForDroplinked = async () => {
    return await addCheckoutAddress(selectedAddress._id);
  };

  const submitAddressForShopify = async () => {
    let addressObj = getAddressObject(selectedAddress);
    let shopifyData = getShopifyData(
      addressObj,
      cart.wallet ? getStxAddress() : "",
      cart,
      profile.email
    );
    let result =  await createCheckout(cart.items[0].shopName, shopifyData);
    return result 
  };

  const ProccessToPayment = async () => {
    if (selectedAddress == null) {
      errorToast("Please choose an address");
      return;
    }
    let result;
    setLoading(true);
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      result = await submitAddressForDroplinked();
    } else {
      result = await submitAddressForShopify();
    }
    setLoading(false);
    if (result.status == API_STATUS.SUCCESS) {
      if (cart.type == SHOP_TYPES.SHOPIFY) {
            let checkoutId = {
          checkoutId: result.data.checkout.token,
          shopName: cart.items[0].shopName,
        };
        localStorage.setItem("checkout_id", JSON.stringify(checkoutId));
      }

        localStorage.setItem("selected_address",JSON.stringify(selectedAddress));
        navigate(`/${shopname}/shipping`);
      
    } else {
      cart.type == SHOP_TYPES.DROPLINKED
        ? errorToast(result.data)
        : errorToast(result.data);
    }

  
  };

  return (
    <AddressPageWrapper>
      <PageTitle>Address</PageTitle>

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
              <AddAddressButton onClick={toggleAddressForm}>
                + Add new address
              </AddAddressButton>
            )}

            <ButtonWrapper>
              <Box w="30%">
                <BasicButton
                  cancelType={true}
                  click={() => {
                    navigate(`/${shopname}/checkout`);
                  }}
                  disable={loading}
                >
                  Back
                </BasicButton>
              </Box>
              <Box w="30%">
                <BasicButton click={ProccessToPayment} loading={loading}>
                  Next
                </BasicButton>
              </Box>
            </ButtonWrapper>
          </>
        )}
      </Box>
    </AddressPageWrapper>
  );
}

export default AddressPage;
