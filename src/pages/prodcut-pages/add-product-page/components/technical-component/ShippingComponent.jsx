import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Box,
  Flex,
} from "@chakra-ui/react";

import { SHIPING_TYPES } from "../../../../../constant/shipping-types";
import {
  Text16px,
  SelectComponent,
  OptionComponent,
} from "../../AddProductPage-style";

const ShippingComponent = ({ TechnicalData, dispatchTechnical }) => {
  const changeShippingDropdown = (e) =>
    dispatchTechnical({ type: "updateShippingType", payload: e.target.value });

  const changeShippingPrice = (e) =>
    dispatchTechnical({
      type: "updateShippingPrice",
      payload: parseFloat(e.target.value),
    });
  return (
    <>
      <Text16px>Shipping</Text16px>
      <Box mb="16px" />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        gap="14px"
      >
        <SelectComponent
          value={TechnicalData.shippingType}
          onChange={changeShippingDropdown}
        >
          <OptionComponent value={SHIPING_TYPES.EASY_POST}>
            {SHIPING_TYPES.EASY_POST}
          </OptionComponent>
          <OptionComponent value={SHIPING_TYPES.CUSTOM}>
            {SHIPING_TYPES.CUSTOM}
          </OptionComponent>
        </SelectComponent>

        {TechnicalData.shippingType == SHIPING_TYPES.CUSTOM && (
          <FormControl w="100%" h="100%">
            {/* <FormLabel fontWeight="500" fontSize="18px" color="#C2C2C2">
              {label}
            </FormLabel> */}
            <InputGroup size="sm" w="100%" h="100%">
              <InputLeftAddon
                bg="line"
                borderColor="subLayer"
                borderRadius="8px"
                fontWeight="500"
                fontSize="16px"
                color="#fff"
                children="$"
                h="100%"
                minH='100%'
                p="18px 18px"
              />
              <Input
                h="100%"
                placeholder="Shipping price"
                value={TechnicalData.shippingPrice}
                onChange={changeShippingPrice}
                type="number"
                p="18px 18px"
                background="subLayer"
                borderRadius="8px"
                fontSize="20px"
                fontWeight="500"
                color="#fff"
                border="none"
                _focus={{
                  border: "none",
                }}
                _placeholder={{
                  color: "#666666",
                }}
              />
              {/* <InputComponent
                type="number"
                value={TechnicalData.shippingPrice}
                placeholder="Shipping price"
                onChange={changeShippingPrice}
              /> */}
            </InputGroup>
          </FormControl>
        )}
      </Flex>
    </>
  );
};

export default ShippingComponent;
