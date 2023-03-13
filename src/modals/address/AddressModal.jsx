import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

import { useToasty } from "../../context/toastify/ToastContext";
import { COUNTRIES, US_STATES } from "./address-list-constant";
import {
  postAddress,
  patchAddress,
} from "../../api-service/address/addressApiService";
import { postCreateAddress } from "../../apis/addressApiService";
import { useApi } from "../../hooks/useApi/useApi";
import { TopText, SaveButton } from "./AddressModal-style";

import FormInput from "../../components/shared/FormInput/FormInput";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SelectInput from "../../components/shared/SelectInput/SelectInput";
import InputComponent from "./InputComponent";

export default function AddressModal({
  show,
  updateAddressList,
  type,
  addressBook,
  close,
}) {
  // address context functions for add new address or update address
  const { successToast, errorToast } = useToasty();
  const { postApi, patchApi } = useApi();
  // form values states
  // if get address book on props set addressbook value for default or not set '' for default value
  const [line1, setLine1] = useState(
    addressBook ? addressBook.addressLine1 : ""
  );
  const [line2, setLine2] = useState(
    addressBook ? addressBook.addressLine2 : ""
  );
  const [country, setCountry] = useState(
    addressBook ? addressBook.country : ""
  );
  const [city, setCity] = useState(addressBook ? addressBook.city : "");
  const [state, setState] = useState(addressBook ? addressBook.state : "");
  const [zip, setZip] = useState(addressBook ? addressBook.zip : "");
  const [firstname, setFirstname] = useState(
    addressBook ? addressBook.firstname : ""
  );
  const [lastname, setLastname] = useState(
    addressBook ? addressBook.lastname : ""
  );
  // state for show wrror
  const [error, setError] = useState("");
  // state for loading mode
  const [loading, setLoading] = useState(false);

  // change state valuse
  const ChangeLine1 = (e) => {
    setLine1(e.target.value);
    if (error == "line1") setError("");
  };

  const ChangeLine2 = (e) => {
    setLine2(e.target.value);
  };

  const ChangeCountry = (country) => {
    setCountry(country);
    if (error == "country") setError("");
  };

  const ChangeCity = (e) => {
    setCity(e.target.value);
    if (error == "city") setError("");
  };

  const ChangeState = (thisState) => {
    setState(thisState);
    if (error == "state") setError("");
  };

  const ChangeZip = (e) => {
    setZip(e.target.value);
    if (error == "zip") setError("");
  };

  const ChangeFirstname = (e) => {
    setFirstname(e.target.value);
    if (error == "First Name") setError("");
  };

  const ChangeLastname = (e) => {
    setLastname(e.target.value);
    if (error == "Last Name") setError("");
  };

  const update = async (formData, addressBookId) => {
    let result = await patchApi(patchAddress(formData, addressBookId));
    if (result) {
      successToast("Address updated successfully");
      if (updateAddressList) updateAddressList();
      return true;
    }
  };

  const addAddress = async (formData) => {
    let result = await postApi(postCreateAddress(formData));
    if (result) {
      successToast("Address added successfully");
      if (updateAddressList) updateAddressList();
      return true;
    }

    // return result ? true : false;
  };

  // submit form
  const submitForm = async () => {
    // validate form if has invalid data stop function
    let validation = validationForm();
    if (!validation) return;

    const formData = {
      firstName: firstname,
      lastName: lastname,
      addressLine1: line1,
      addressLine2: line2,
      country: country,
      city: city,
      state: state,
      zip: zip,
      addressType: type,
    };

    setLoading(true);

    let result;

    if (addressBook) {
      result = await update(formData, addressBook._id);
    } else {
      result = await addAddress(formData);
    }
    setLoading(false);
    if (result) close();
  };

  // validation form required
  const validationForm = () => {
    if (line1 == "") {
      setError("line1");
      return false;
    } else if (country == "") {
      setError("country");
      return false;
    } else if (city == "") {
      setError("city");
      return false;
    } else if (state == "") {
      setError("state");
      return false;
    } else if (zip == "") {
      setError("zip");
      return false;
    } else if (type == "CUSTOMER") {
      let flag = true;
      if (firstname == "") {
        setError("First Name");
        flag = false;
      }
      if (lastname == "") {
        setError("Last Name");
        flag = false;
      }
      return flag;
    } else {
      return true;
    }
  };

  return (
    <ModalWrapper show={show} close={close}>
      <Flex w="100%" justifyContent="center" alignItems="center" mb="36px">
        <TopText>Address</TopText>
      </Flex>
      <Box>
        <InputComponent
          label="Address line 1"
          placeHolder="Number, Street"
          isRequired={true}
          value={line1}
          change={ChangeLine1}
        />
        <Box mb="36px" />
        <InputComponent
          label="Address Line 2"
          placeHolder="Number, Street"
          value={line2}
          change={ChangeLine2}
        />

        <Box mb="36px" />
        <Flex
          mb="36px"
          justifyContent="space-between"
          alignItems="center"
          gap="24px"
        >
          <FormControl maxW="50%" w="50%">
            <FormLabel
              w="100%"
              htmlFor="input-com"
              fontWeight="500"
              fontSize="18px"
              color="#C2C2C2"
            >
              Country
            </FormLabel>

            <SelectInput
              valueList={COUNTRIES}
              value={country}
              change={ChangeCountry}
              placeholder={"Country"}
            />
          </FormControl>

          {/* US_STATES */}
          {country == "United States" ? (
            <FormControl w="50%">
              <FormLabel
                w="100%"
                htmlFor="input-com"
                fontWeight="500"
                fontSize="18px"
                color="#C2C2C2"
              >
                State/province
              </FormLabel>

              <SelectInput
                valueList={US_STATES}
                value={state}
                change={ChangeState}
                placeholder={"State/province"}
              />
            </FormControl>
          ) : (
            <Box w="50%">
              <InputComponent
                label="State"
                isRequired={true}
                placeHolder="Virginia"
                value={state}
                change={(e) => ChangeState(e.target.value)}
              />
            </Box>
          )}
        </Flex>

        <Flex
          mb="36px"
          justifyContent="space-between"
          alignItems="center"
          gap="24px"
        >
          <InputComponent
            label="City"
            isRequired={true}
            placeHolder="Blacksburg"
            value={city}
            change={ChangeCity}
          />
          <InputComponent
            label="Zip Code*"
            isRequired={true}
            placeHolder="15227"
            value={zip}
            change={ChangeZip}
          />
        </Flex>

        <Flex
          mb="36px"
          justifyContent="space-between"
          alignItems="center"
          gap="24px"
        >
          <InputComponent
            label="First Name"
            isRequired={true}
            placeHolder="First Name"
            value={firstname}
            change={ChangeFirstname}
          />
          <InputComponent
            label="Last Name"
            isRequired={true}
            placeHolder="Last Name"
            value={lastname}
            change={ChangeLastname}
          />
        </Flex>
        <SaveButton w='100%' onClick={submitForm} disabled={loading} >Save</SaveButton>

      </Box>
    </ModalWrapper>
  );
}
