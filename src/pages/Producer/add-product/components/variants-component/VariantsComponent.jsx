import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../Add-product-style";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import VariantForm from "./VariantForm";

const VariantsComponent = ({OptionList,  skus, setSkus }) => {
  const [openForm, setOpenForm] = useState(false);

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

  const changeSku = (sku , index) => {
    let currentSkus = Array.from(skus);
    currentSkus = currentSkus.map((current) => {
      if(current.index == index){return {...sku , index:index }}
        else{ return { ...current }}
      });
    setSkus(currentSkus);
  };


  const update = (newSkus) => {
    let currentSkus = Array.from(newSkus);
    setSkus(currentSkus);
  }

  return (
    <ComponentWrapper>
      <ComponentTitle>Variants</ComponentTitle>
      <Box mb="36px" />

      {skus.map((currentSku) => {
        return (
          <VariantForm
            key={currentSku.index}
            sku={currentSku}
            skus={skus}
            OptionList={OptionList}
            deleteSku={() => {
              deleteSku(currentSku.index);
            }}
            changeSku={changeSku}
            // record={RecordSku}
            update={update}
          />
        );
      })}
      {openForm ? (
        <></>
      ) : (
        // <SkuForm
        //   closeForm={openForm}
        //   OptionList={OptionList}
        //   submitForm={submitForm}
        // />
        <Box w="100%">
          <BasicButton cancelType={true} click={openForm}>
            Add variant
          </BasicButton>
        </Box>
      )}
    </ComponentWrapper>
  );
};

export default VariantsComponent;
