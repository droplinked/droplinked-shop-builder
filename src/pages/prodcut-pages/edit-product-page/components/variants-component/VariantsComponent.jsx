import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../EditProductPage-style";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import SkuForm from "./SkuForm";
import SkuComponent from "./SkuComponent";

// this component handle skus
const VariantsComponent = ({ OptionList, skus, productId, updateProduct }) => {
  const [openForm, setOpenForm] = useState(false);

  const toggleForm = () => setOpenForm((p) => !p);

  return (
    <ComponentWrapper>
      <ComponentTitle>Variants</ComponentTitle>
      <Box mb="36px" />

      {skus.map((currentSku) => {
        return (
          <SkuComponent
            key={currentSku.index}
            sku={currentSku}
            skus={skus}
            OptionList={OptionList}
            // record={RecordSku}
            updateProduct={updateProduct}
          />
        );
      })}
      {openForm ? (
        <SkuForm
          closeForm={toggleForm}
          OptionList={OptionList}
          skus={skus}
          updateProduct={updateProduct}
          productId={productId}
        />
      ) : (
        <Box w="100%">
          <BasicButton cancelType={true} click={toggleForm}>
            Add variant
          </BasicButton>
        </Box>
      )}
    </ComponentWrapper>
  );
};

export default VariantsComponent;
