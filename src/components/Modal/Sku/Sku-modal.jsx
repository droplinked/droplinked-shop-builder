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
//import AddressComponent from "../../shared/Address/address-component";
import BasicButton from "../../shared/BasicButton/BasicButton";

const SkuModal = ({
  open,
  close,
  optionTypes,
  skuArray,
  setSkuArray,
  defaultValue,
}) => {


  const [price, setPrice] = useState(() => {
    return defaultValue != undefined ? defaultValue.price : "";
  });
  const [externalID, setExternalID] = useState(() => {
    return defaultValue != undefined ? defaultValue.externalID : "";
  });
  const [quantity, setQuantity] = useState(() => {
    return defaultValue != undefined ? defaultValue.quantity : "";
  });
  const [options, setOptions] = useState(() => {
    return defaultValue != undefined ? defaultValue.options : [];
  });
  const [length, setLength] = useState(() => {
    return defaultValue != undefined ? defaultValue.dimensions.length : "";
  });
  const [width, setWidth] = useState(() => {
    return defaultValue != undefined ? defaultValue.dimensions.width : "";
  });
  const [height, setHeight] = useState(() => {
    return defaultValue != undefined ? defaultValue.dimensions.height : "";
  });
  const [weight, setWeight] = useState(() => {
    return defaultValue != undefined ? defaultValue.weight : "";
  });

  // chnage options input function
  const changeOption = (id, value) => {
    let newOptionArray = [];
    for (let item of options) newOptionArray.push(item);

    let find = options.find((op) => op.variantID == id);

    if (find) {
      newOptionArray = newOptionArray.map((opt) => {
        if (opt.variantID == id) return { ...opt, value: value };
        else return opt;
      });
    } else {
      let newObj = { variantID: id, value: value };
      newOptionArray.push(newObj);
    }
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
  // submit add sku function
  const submitForm = () => {
    let dimensions = {
      length: length,
      width: width,
      height: height,
    };

    let obj = {
      price: price,
      externalID: externalID,
      quantity: quantity,
      options: options,
      dimensions: dimensions,
      weight: weight,
    };
    let newArray;

    if (defaultValue == undefined) {
      newArray = Array.from(skuArray);
      newArray.push(obj);
    } else {
      newArray = skuArray.map((sku, i) => {
        if (i == defaultValue.index) return obj;
        else return sku;
      });
    }

    setSkuArray(newArray);
    close();
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
            {optionTypes.map((option) => {
              let find = options.find((op) => op.variantID == option.optionID);
              let value = find ? find.value : "";
              return (
                <SkuContent>
                  <SkuLable>{option.optionName}</SkuLable>
                  <SkuInput
                    type="text"
                    onChange={(e) =>
                      changeOption(option.optionID, e.target.value)
                    }
                    value={value}
                    placeholder={option.optionName}
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
            {/* <Text fontSize="18px" color="#fff" fontWeight="600" mb="20px">
              Orgin address
            </Text> */}
            {/* <AddressComponent
              address={exAddress}
              selectAble={false}
              deleteable={false}
            />
            <AddressComponent
              address={exAddress}
              selectAble={false}
              deleteable={false}
            /> */}
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justifyContent="space-between">
              <Box w="40%">
                <BasicButton click={close}>Cancel</BasicButton>
              </Box>
              <Box w="40%">
                <BasicButton click={submitForm}>Add</BasicButton>
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SkuModal;
