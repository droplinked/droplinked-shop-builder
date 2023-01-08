import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

import { useAddress } from "../../context/address/AddressContext";
import { COUNTRIES, US_STATES } from "./address-list-constant";

import FormInput from "../../components/shared/FormInput/FormInput";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SelectInput from "../../components/shared/SelectInput/SelectInput";

export default function AddressModal({show ,  type, addressBook, close }) {
  // address context functions for add new address or update address
  const { addAddress, updateAddress } = useAddress();

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

  // submit form
  const submitForm = async () => {
    // validate form if has invalid data stop function
    let validation = validationForm();
    if (!validation) return;

    let formData;

    // object for customer or producer
    if (type == "CUSTOMER") {
      formData = {
        firstname: firstname,
        lastname: lastname,
        addressLine1: line1,
        addressLine2: line2,
        country: country,
        city: city,
        state: state,
        zip: zip,
        addressType: type,
      };
    } else {
      formData = {
        addressLine1: line1,
        addressLine2: line2,
        country: country,
        city: city,
        state: state,
        zip: zip,
        addressType: type,
      };
    }

    setLoading(true);

    let result;

    if (addressBook) {
      result = await updateAddress(formData, addressBook._id);
    } else {
      result = await addAddress(formData);
    }
    setLoading(false);

    if (result == true) close();
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
      <Box>
        <FormInput
          mb="30px"
          label={"Address line 1"}
          placeholder={"Address line 1"}
          value={line1}
          changeValue={ChangeLine1}
          isError={error == "line1" && "Address line1 is required"}
        />
        <FormInput
          mb="30px"
          label={"Address line 2 ( building or unit #)"}
          placeholder={"Address line 2 ( building or unit #)"}
          value={line2}
          changeValue={ChangeLine2}
        />
        <Flex mb="30px" justifyContent="space-between" alignItems="center">
          <FormControl maxW="45%" w="45%">
            <FormLabel
              w="100%"
              htmlFor="input-com"
              fontWeight="600"
              fontSize={{ base: "14px", md: "20px" }}
              color="white"
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
            <FormControl maxW="45%" w="45%">
              <FormLabel
                w="100%"
                htmlFor="input-com"
                fontWeight="600"
                fontSize={{ base: "14px", md: "20px" }}
                color="white"
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
            <FormInput
              w="45%"
              label={"State/province"}
              placeholder={"State/province"}
              value={state}
              changeValue={(e)=>ChangeState(e.target.value)}
              isError={error == "state" && "State/province is required"}
            />
          )}

          {/* <FormInput
                        w='45%'
                        label={"Country"}
                        placeholder={"Country"}
                        value={country}
                        changeValue={ChangeCountry}
                        isError={(error == "country") && "Country is required"}
                    /> */}
        </Flex>

        <Flex mb="30px" justifyContent="space-between" alignItems="center">
          <FormInput
            w="45%"
            label={"City"}
            placeholder={"City"}
            value={city}
            changeValue={ChangeCity}
            isError={error == "city" && "City is required"}
          />

          <FormInput
            w="45%"
            label={"Zip"}
            placeholder={"Zip"}
            value={zip}
            changeValue={ChangeZip}
            isError={error == "zip" && "Zip is required"}
          />
        </Flex>

        {type == "CUSTOMER" ? (
          <Flex mb="60px" justifyContent="space-between" alignItems="center">
            <FormInput
              w="45%"
              label={"First Name"}
              placeholder={"First Name"}
              value={firstname}
              changeValue={ChangeFirstname}
              isError={error == "First Name" && "First Name is required"}
            />
            <FormInput
              w="45%"
              label={"Last Name"}
              placeholder={"Last Name"}
              value={lastname}
              changeValue={ChangeLastname}
              isError={error == "Last Name" && "Last Name is required"}
            />
          </Flex>
        ) : (
          <Box mb="20px"></Box>
        )}

        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="0px"
          w="100%"
        >
          <BasicButton
            w="45%"
            p="12px 16px"
            click={close}
            disable={loading}
            cancelType={true}
          >
            Cancel
          </BasicButton>
          <BasicButton
            w="45%"
            p="12px 16px"
            click={submitForm}
            loading={loading}
            disabled={loading}
          >
            Submit
          </BasicButton>
        </Flex>
      </Box>
    </ModalWrapper>
  );
}
