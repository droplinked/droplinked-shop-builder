import { Box, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect, useReducer, useMemo } from "react";
import {
  SkuFormWrapper,
  LeftSideText,
  InputWrapper,
  FieldInput,
  SmallInput,
  GrayLine,
  SelectComponent,
  OptionComponent,
} from "./add-sku-section-style";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { skuReducer } from "../../reducer/add-sku-reducer";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import VariantComponent from "../variant-component/variant-component";
import SkuForm from "../sku-form/sku-form";

const AddSkuSection = ({ OptionList, skus, setSkus }) => {
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen((p) => !p);

  console.log("skus ", skus);

  const deleteSku = (index) => {
    let currentSkus = Array.from(skus);
    currentSkus = currentSkus
      .filter((sku) => {
        return sku.index != index;
      })
      .map((sku, i) => {
        return { ...sku, index: i };
      });
    setSkus(currentSkus);
  };

  const submitForm = (sku) => {
    let currentSkus = Array.from(skus);
    currentSkus.push({ ...sku, index: currentSkus.length });
    setSkus(currentSkus);
  };

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Variants
      </Text>
      <Box mb="48px"></Box>
      {skus.map((currentSku) => {
        return (
          <VariantComponent
            key={currentSku.index}
            sku={currentSku}
            deleteSku={() => {
              deleteSku(currentSku.index);
            }}
          />
        );
      })}
      {open ? (
        <SkuForm
          skus={skus}
          closeForm={openForm}
          OptionList={OptionList}
          submitForm={submitForm}
        />
      ) : (
        <Box w="100%">
          <BasicButton cancelType={true} click={openForm}>
            Add variant
          </BasicButton>
        </Box>
      )}
    </Box>
  );
};

export default AddSkuSection;
