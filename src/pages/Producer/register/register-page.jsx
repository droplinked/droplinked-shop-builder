import {
  RegisterPageWrapper,
  RegisterContainer,
  ShopInputWrapper,
  ShopnameInput,
  CounterText,
  AddressButton,
} from "./register-page-style";
import { FormControl, FormLabel, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAddress } from "../../../context/address/AddressContext";
import { getShop } from "../../../api/base-user/Profile-api";
import { updateShopApi } from "../../../api/producer/Shop-api";
import { useShop } from "../../../context/shop/ShopContext";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext";

import FormInput from "../../../components/shared/FormInput/FormInput";
import InputImage from "../../../components/shared/InputImage/InputImage";
import AddressComponent from "../../../components/shared/Address/address-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import AddressForm from "../../../components/Modal/Address/Address-modal";
import Loading from "../../../components/shared/loading/Loading";
import FillInput from "../../../components/shared/FillInput/FillInput";

const RegisterPage = () => {
  const [shop, setShop] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const { addressList } = useAddress();
  const { errorToast, successToast } = useToasty();
  const { updateShop } = useShop();
  const { updateProfileData } = useProfile();

  const profile = JSON.parse(localStorage.getItem("profile"));

  let navigate = useNavigate();

  useEffect(() => {
    getShopData();
  }, []);

  let shopAddressBook = addressList.find(
    (address) => address.addressType == "SHOP"
  );

  const getShopData = async () => {
    let result = await getShop();
    if (result) setShop({ ...result, description: "" });
  };

  const chageShopInformation = (type, e) => {
    let newObject = { ...shop, [type]: e.target.value };
    setShop(newObject);
  };

  const changeShopLogo = (imageUrl) => {
    let newObject = { ...shop, logo: imageUrl };
    setShop(newObject);
  };

  const changeShopname = (e) => {
    if (e.target.value.length < 31) chageShopInformation("description", e);
  };

  const submitForm = async () => {
    if (shop.description.length < 1) {
      errorToast("Shop name is required");
      return;
    }

    if (shopAddressBook == undefined) {
      errorToast("Address is required");
      return;
    }

    let shopInformation = {
      social: {
        discordUrl: shop.discordUrl,
        twitter: shop.twitterUrl,
        instagram: shop.instagramUrl,
        webUrl: shop.webUrl,
      },
      shopLogo: shop.logo,
      shopAddressID: shop.addressBookID,
      description: shop.description,
    };

    setDisableBtn(true);

    let result = await updateShopApi(shopInformation);

    if (result.status == "success") {
      localStorage.setItem("shop", JSON.stringify(result.data.shop));
      successToast("Shop info successfully updated");
      updateShop();
      await updateProfileData();
      if (profile.status == "VERIFIED") navigate(`/${profile.shopName}`);
    } else {
      errorToast(result.reason);
    }

    setDisableBtn(false);
  };

  return (
    <RegisterPageWrapper>
      <RegisterContainer>
        {shop != null ? (
          <>
            <InputImage image={shop.logo} setImage={changeShopLogo} />

            <FormControl>
              <FormLabel
                htmlFor="input-com"
                fontWeight="600"
                fontSize={{ base: "14px", md: "20px" }}
                color="white"
              >
                Shop name
              </FormLabel>
              <ShopInputWrapper>
                <ShopnameInput
                  id="input-com"
                  value={shop.description}
                  onChange={changeShopname}
                  placeholder="Shop name"
                />
                <CounterText
                  color={shop.description.length < 30 ? "white" : "red"}
                >
                  {shop.description.length}/30
                </CounterText>
              </ShopInputWrapper>
            </FormControl>
            <Box mb="20px"></Box>

            <FormInput value={`droplinked.com/${shop.name}`} label={"Domain"} />

            <Box mb="40px"></Box>

            <FillInput
              preText={"https://"}
              value={shop.webUrl}
              change={(e) => chageShopInformation("webUrl", e)}
              placeholder={"droplinked.com"}
            />

            <Box mb="40px"></Box>

            <FillInput
              preText={"discord.gg/"}
              value={shop.discordUrl}
              change={(e) => chageShopInformation("discordUrl", e)}
              placeholder={"droplinked"}
            />

            <Box mb="40px"></Box>
            <FillInput
              preText={"twitter.com/"}
              value={shop.twitterUrl}
              change={(e) => chageShopInformation("twitterUrl", e)}
              placeholder={"droplinked"}
            />

            <Box mb="40px"></Box>
            <FillInput
              preText={"instagram.com/"}
              value={shop.instagramUrl}
              change={(e) => chageShopInformation("instagramUrl", e)}
              placeholder={"droplinked"}
            />

            <Box mb="40px"></Box>

            {shopAddressBook ? (
              <Box w="100%">
                <AddressComponent address={shopAddressBook} />
              </Box>
            ) : (
              <AddressButton
                onClick={() => {
                  setAddressModal(true);
                }}
              >
                Add address
              </AddressButton>
            )}
            <Box mb="40px"></Box>

            <BasicButton
              w={{ base: "100%", md: "45%" }}
              p="12px 16px"
              disabled={disableBtn || shop.description.length > 30}
              onClick={submitForm}
            >
              Submit
            </BasicButton>
          </>
        ) : (
          <Loading />
        )}
      </RegisterContainer>
      {addressModal && (
        <AddressForm
          type={"SHOP"}
          close={() => {
            setAddressModal(false);
          }}
        />
      )}
    </RegisterPageWrapper>
  );
};
export default RegisterPage;
