import { SkuContent, SkuLable, SkuInput } from "./Sku-modal-style";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { updateSku } from "../../../../../api/producer/Product-api";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";

const SkuModal = ({ open, close, sku, update }) => {

  const [price, setPrice] = useState(sku.price);
  const [externalID, setExternalID] = useState(sku.externalID);
  const [quantity, setQuantity] = useState(sku.quantity);
  const [options, setOptions] = useState(sku.options);
  const [length, setLength] = useState(sku.dimensions.length);
  const [width, setWidth] = useState(sku.dimensions.width);
  const [height, setHeight] = useState(sku.dimensions.height);
  const [weight, setWeight] = useState(sku.weight);
  const [loading, setLoading] = useState(false);

  const {successToast , errorToast } = useToasty();
console.log(sku)

  // chnage options input function
  const changeOption = (id, value) => {
    let newOptionArray = [];
    for (let item of options) newOptionArray.push(item);

    newOptionArray = newOptionArray.map((opt) => {
      if (opt.variantID == id) return { ...opt, value: value };
      else return opt;
    });

    setOptions(newOptionArray);
  };
  /// change inputs
  const changePrice = (e) => setPrice(parseFloat(e.target.value));
  const changeQuantity = (e) => setQuantity(parseInt(e.target.value));
  const changeExternallId = (e) => setExternalID(e.target.value);
  const changeLength = (e) => setLength(parseFloat(e.target.value));
  const changeWidth = (e) => setWidth(parseFloat(e.target.value));
  const changeHeight = (e) => setHeight(parseFloat(e.target.value));
  const changesetWeight = (e) => setWeight(parseFloat(e.target.value));

  // function validate each value
  const checkValidation = (value, lowerText, UpperText) => {
    let validate = true;
    if (!value) {
      errorToast(`Sku ${lowerText} is required`);
      validate = false;
    }
    if (value <= 0) {
      errorToast(`${UpperText} should be greater than zero`);
      validate = false;
    }
    return validate;
  };

  // validation form's values
  const validateForm = () => {
    let validateOption = true;
    options.forEach((opt) => {
      if (opt.value.length == 0) {
        validateOption = false;
      }
    });
    if (!validateOption) {
      errorToast("Sku options is required");
      return false;
    }

    if (!checkValidation(price, "price", "Price")) return false;

    if (!checkValidation(quantity, "quantity", "Quantity")) return false;

    if (!checkValidation(length, "length", "Length")) return false;

    if (!checkValidation(width, "width", "Width")) return false;

    if (!checkValidation(height, "height", "Height")) return false;

    if (!checkValidation(weight, "weight", "Weight")) return false;

    return true;
  };

  // submit add sku function
  const submitForm = async () => {
    let dimensions = {
      length: length,
      width: width,
      height: height,
    };

    if (!validateForm()) return;

    let obj = {
      price: price,
      externalID: externalID,
      quantity: quantity,
      options: options,
      dimensions: dimensions,
      weight: weight,
    };

   
    setLoading(true);
    let result = await updateSku(sku._id, obj);
    if (result) {
      successToast("New SKU added")
      update()
      close()
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent
          bgColor="#202020"
          minW={{ base: "90%", md: "700px" }}
          w={{ base: "90%", md: "700px" }}
        >
          <ModalHeader color="#fff" textAlign="center">
            Variant Form
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody w="100%">
            {options.map((option) => {
              return (
                <SkuContent>
                  <SkuLable>{option.variantName}</SkuLable>
                  <SkuInput
                    type="text"
                    onChange={(e) =>
                      changeOption(option.variantID, e.target.value)
                    }
                    value={option.value}
                    placeholder={option.variantName}
                  />
                </SkuContent>
              );
            })}

            <SkuContent>
              <SkuLable>Price</SkuLable>
              <SkuInput
                type="number"
                value={price}
                placeholder={"$100"}
                onChange={changePrice}
              />
            </SkuContent>
            <SkuContent>
              <SkuLable>Quantity</SkuLable>
              <SkuInput
                type="number"
                value={quantity}
                placeholder={"15"}
                onChange={changeQuantity}
              />
            </SkuContent>
            <SkuContent>
              <SkuLable>External ID</SkuLable>
              <SkuInput
                type="text"
                value={externalID}
                placeholder={"123467"}
                onChange={changeExternallId}
              />
            </SkuContent>

            <Text fontSize="18px" color="#fff" fontWeight="600" mb="20px">
              Delivery
            </Text>

            <SkuContent>
              <SkuLable>Length</SkuLable>
              <SkuInput
                type="number"
                value={length}
                onChange={changeLength}
                placeholder={"inch"}
              />
            </SkuContent>
            <SkuContent>
              <SkuLable>Width</SkuLable>
              <SkuInput
                type="number"
                value={width}
                onChange={changeWidth}
                placeholder={"inch"}
              />
            </SkuContent>
            <SkuContent>
              <SkuLable>Height</SkuLable>
              <SkuInput
                type="number"
                value={height}
                onChange={changeHeight}
                placeholder={"inch"}
              />
            </SkuContent>
            <SkuContent>
              <SkuLable>Weight</SkuLable>
              <SkuInput
                type="number"
                value={weight}
                onChange={changesetWeight}
                placeholder={"oz"}
              />
            </SkuContent>
            <Box mb="60px"></Box>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justifyContent="space-between">
              <Box w="40%">
                <BasicButton click={close} loading={loading}>
                  Cancel
                </BasicButton>
              </Box>
              <Box w="40%">
                <BasicButton click={submitForm} loading={loading}>
                  Add
                </BasicButton>
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SkuModal;
