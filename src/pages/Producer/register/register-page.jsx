import { FormControl, FormLabel, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  RegisterPageWrapper,
  RegisterContainer,
  ShopInputWrapper,
  ShopnameInput,
  CounterText,
  AddressButton,
} from "./register-page-style";
//import { getShop } from "../../../api/base-user/Profile-api";
import { updateShopApi } from "../../../api/producer/Shop-api";
//import { useShop } from "../../../context/shop/ShopContext";
import { useToasty } from "../../../context/toastify/ToastContext";
import { setCurrentShop } from "../../../store/shop/shop.action";
import { useApi } from "../../../hooks/useApi/useApi";
//import { getAddress } from "../../../api-service/address/addressApiService";
import { getAddressList } from "../../../apis/addressApiService";
import { getUser } from "../../../apis/userApiService";

import FormInput from "../../../components/shared/FormInput/FormInput";
import InputImage from "../../../components/shared/InputImage/InputImage";
import AddressComponent from "../../../components/shared/Address/address-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import AddressModal from "../../../modals/address/AddressModal";
import Loading from "../../../components/shared/loading/Loading";
import FillInput from "../../../components/shared/FillInput/FillInput";

const RegisterPage = () => {
  //states
  const [shop, setShop] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [addressList, setAddressList] = useState([]);
console.log('shop ' , shop)
  //const { updateShop } = useShop();
  //hooks
  const { errorToast, successToast } = useToasty();
  const dispatch = useDispatch();
  const { getApi } = useApi();

  const profile = JSON.parse(localStorage.getItem("profile"));

  let navigate = useNavigate();

  const updateAddressList = async () => {
    let result = await getApi(getAddressList());
    if (result && result.length > 0) setAddressList(result[0]);
  };

  useEffect(() => {
    updateAddressList();
    getShopData();
  }, []);

  let shopAddressBook = addressList.find(
    (address) => address.addressType == "SHOP"
  );

  const getShopData = async () => {
    let result = await getApi(getUser());
    if (result) setShop({ ...result.shop, description: "" });
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
  //   if (shop.description.length < 1) {
  //     errorToast("Shop name is required");
  //     return;
  //   }

  //   if (shopAddressBook == undefined) {
  //     errorToast("Address is required");
  //     return;
  //   }

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

    console.log('shopInformation ' ,shopInformation)

    setDisableBtn(true);

   // let result = await updateShopApi(shopInformation);

    // if (result.status == "success") {
    //   localStorage.setItem("shop", JSON.stringify(result.data.shop));
    //   successToast("Shop info successfully updated");
    //   let newShop = await getShop();
    //   if (newShop) {
    //     dispatch(setCurrentShop(newShop));
    //   }
    //   //  await updateProfileData();
    //   if (profile.status == "VERIFIED") navigate(`/${profile.shopName}`);
    // } else {
    //   errorToast(result.reason);
    // }

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

            <Box mb="20px"></Box>

            <FillInput
              preText={"https://"}
              value={shop.webUrl}
              change={(e) => chageShopInformation("webUrl", e)}
              placeholder={"droplinked.com"}
              label={"Website"}
            />

            <Box mb="20px"></Box>

            <FillInput
              preText={"discord.gg/"}
              value={shop.discordUrl}
              change={(e) => chageShopInformation("discordUrl", e)}
              placeholder={"droplinked"}
              label={"Discord"}
            />

            <Box mb="20px"></Box>
            <FillInput
              preText={"twitter.com/"}
              value={shop.twitterUrl}
              change={(e) => chageShopInformation("twitterUrl", e)}
              placeholder={"droplinked"}
              label={"Twitter"}
            />

            <Box mb="20px"></Box>
            <FillInput
              preText={"instagram.com/"}
              value={shop.instagramUrl}
              change={(e) => chageShopInformation("instagramUrl", e)}
              placeholder={"droplinked"}
              label={"Instagram"}
            />

            <Box mb="20px"></Box>

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

      <AddressModal
        show={addressModal}
        type={"SHOP"}
        close={() => {
          setAddressModal(false);
        }}
      />
    </RegisterPageWrapper>
  );
};
export default RegisterPage;
