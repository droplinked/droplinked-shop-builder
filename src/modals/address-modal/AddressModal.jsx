import { Box, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { useState } from "react";
//
import { useToasty } from "context/toastify/ToastContext";
import { COUNTRIES, US_STATES } from "./address-list-constant";
import {
  postCreateAddress,
  putUpdateAddress,
} from "apis/addressApiService";
import { useApi } from "hooks/useApi/useApi";
import { TopText } from "./AddressModal-style";
//
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SelectInputComponent from "./components/select-input-component/SelectInputComponent";
import InputFieldComponent from "components/shared/input-field-component/InputFieldComponent";
import BasicButton from "components/shared/BasicButton/BasicButton";

export default function AddressModal({
  show,
  updateAddressList,
  addressBook,
  close,
}) {
  // address context functions for add new address or update address
  const { successToast, errorToast } = useToasty();
  const { postApi, putApi } = useApi();
  // form values states
  // if get address book on props set addressBook value for default or not set '' for default value
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
    addressBook ? addressBook.firstName : ""
  );
  const [lastname, setLastname] = useState(
    addressBook ? addressBook.lastName : ""
  );

  // state for show error
  const [error, setError] = useState("Please fill all required fields");
  // state for loading mode
  const [loading, setLoading] = useState(false);

  // change state values
  const ChangeFirstname = (e) => {
    setFirstname(e.target.value);
    if (error == "First Name") setError("");
  };

  const ChangeLastname = (e) => {
    setLastname(e.target.value);
    if (error == "Last Name") setError("");
  };


  const ChangeLine1 = (e) => {
    setLine1(e.target.value);
    if (error === "line1") setError("");
  };

  const ChangeLine2 = (e) => {
    setLine2(e.target.value);
  };

  const ChangeCountry = (country) => {
    setCountry(country);
    if (error === "country") setError("");
  };

  const ChangeCity = (e) => {
    setCity(e.target.value);
    if (error === "city") setError("");
  };

  const ChangeState = (thisState) => {
    setState(thisState);
    if (error === "state") setError("");
  };

  const ChangeZip = (e) => {
    setZip(e.target.value);
    if (error === "zip") setError("");
  };

  const update = async (formData, addressBookId) => {
    let result = await putApi(putUpdateAddress(addressBookId, formData));
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
      setLine1("");
      setLine2("");
      setCountry("");
      setCity("");
      setState("");
      setZip("");
      if (updateAddressList) updateAddressList();
      return true;
    }

    // return result ? true : false;
  };

  // validation form required
  const validationForm = () => {
    if (line1 === "") {
      setError("line1 is Required");
      return false;
    } else if (country === "") {
      setError("country is Required");
      return false;
    } else if (city === "") {
      setError("city is Required");
      return false;
    } else if (state === "") {
      setError("state is Required");
      return false;
    } else if (zip === "") {
      setError("zip is Required");
      return false;
    } else {
      return true;
    }
  };

  // submit form
  const submitForm = async () => {
    // validate form if has invalid data stop function
    let validation = validationForm();
    if (!validation) errorToast(error);
    else {
      const formData = {
        firstName: firstname,
        lastName: lastname,
        addressLine1: line1,
        addressLine2: line2,
        country,
        city,
        state,
        zip,
        addressType: "SHOP",
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
      else errorToast("An error has occurred");
    }
  };

  return (
    <ModalWrapper show={show} close={close}>
      <Stack spacing="36px">
        <Box textAlign="center">
          <TopText>Source Address</TopText>
        </Box>
        <InputFieldComponent
          isRequired
          label="Address line 1"
          placeholder="Number, Street"
          value={line1}
          change={ChangeLine1}
        />
        <InputFieldComponent
          isRequired
          label="Address Line 2"
          placeholder="Number, Street"
          value={line2}
          change={ChangeLine2}
        />

        <Flex justifyContent="space-between" alignItems="center" gap="24px">
          <FormControl isRequired flexGrow="1">
            <FormLabel htmlFor="input-com" color="white">
              Country
            </FormLabel>

            <SelectInputComponent
              height={12}
              valueList={COUNTRIES}
              value={country}
              change={ChangeCountry}
              placeholder={"Country"}
            />
          </FormControl>

          {/* US_STATES */}
          {country === "United States" ? (
            <FormControl>
              <FormLabel htmlFor="input-com" color="white">
                State/province
              </FormLabel>
              <SelectInputComponent
                height={12}
                valueList={US_STATES}
                value={state}
                change={ChangeState}
                placeholder={"State/province"}
              />
            </FormControl>
          ) : (
            <InputFieldComponent
              isRequired
              label="State"
              placeholder="Virginia"
              value={state}
              change={(e) => ChangeState(e.target.value)}
            />
          )}
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" gap="24px">
          <InputFieldComponent
            isRequired
            label="City"
            placeholder="Blacksburg"
            value={city}
            change={ChangeCity}
          />
          <InputFieldComponent
            isRequired
            label="Zip Code"
            placeholder="15227"
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
          <InputFieldComponent
            label="First Name"
            isRequired
            placeholder="First Name"
            value={firstname}
            change={ChangeFirstname}
          />
          <InputFieldComponent
            label="Last Name"
            isRequired
            placeholder="Last Name"
            value={lastname}
            change={ChangeLastname}
          />
        </Flex>

        <Flex justifyContent="space-between">
          <Box w="40%">
            <BasicButton width="100%" click={close} cancelType={true}>
              Cancel
            </BasicButton>
          </Box>
          <Box w="40%">
            <BasicButton
              width="100%"
              click={submitForm}
              disabled={loading}
              loading={loading}
            >
              Save
            </BasicButton>
          </Box>
        </Flex>
      </Stack>
    </ModalWrapper>
  );
}
