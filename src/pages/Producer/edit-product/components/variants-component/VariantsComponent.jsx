import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../EditProductPage-style";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { useApi } from "../../../../../hooks/useApi/useApi";
import { postAddSkuToProduct , deleteRemoveSku } from "../../../../../api-service/product/productApiService";
import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import SkuForm from "./SkuForm";
import VariantForm from "./VariantForm";

const VariantsComponent = ({ OptionList, skus, productId, updateProduct }) => {
  
  const [openForm, setOpenForm] = useState(false);

  const { errorToast } = useToasty();
  const { postApi , deleteApi} = useApi();

  const toggleForm = () => setOpenForm((p) => !p);

  const deleteSku =async (skuId) => {
 let result = await deleteApi(deleteRemoveSku(skuId))
 if(result) updateProduct()
  };

  const changeSku = (sku, index) => {
    // let currentSkus = Array.from(skus);
    // currentSkus = currentSkus.map((current) => {
    //   if (current.index == index) {
    //     return { ...sku, index: index };
    //   } else {
    //     return { ...current };
    //   }
    // });
    // setSkus(currentSkus);
  };

  const update = () => {
    updateProduct()
  };

  const submitForm = async (sku) => {
    if (existSameOptions(sku)) return false;
    console.log('submitForm  ' , sku)
    let result = await postApi(postAddSkuToProduct(productId, sku));
    if (result) {
      updateProduct();
      return true;
    }
  };

  const existSameOptions = (sku) => {
    if (sku.options.length == 0) return false;
    let result = false;
    let thisSkuOption = sku.options;
    skus.forEach((currentSku) => {
      let isSame = true;
      currentSku.options.forEach((option) => {
        let find = thisSkuOption.find((op) => op.variantID == option.variantID);
        if (find.value == "") isSame = false;
        if (find.value != option.value) isSame = false;
      });
      if (isSame) {
        errorToast(`There is same sku`);
        result = true;
        return;
      }
    });
    return result;
  };

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
            // record={RecordSku}
            update={update}
            productId={productId}
            deleteSku={deleteSku}
          />
        );
      })}
      {openForm ? (
        <SkuForm
          closeForm={toggleForm}
          OptionList={OptionList}
          submitForm={submitForm}
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
