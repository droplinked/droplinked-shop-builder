import { Box, Text } from "@chakra-ui/react";
import { useState} from "react";
import { useToasty } from "../../../../../context/toastify/ToastContext";


import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import VariantComponent from "../variant-component/variant-component";
import SkuForm from "../sku-form/sku-form";

const AddSkuSection = ({ OptionList, skus, setSkus }) => {
  const [open, setOpen] = useState(false);

  const { errorToast } = useToasty();

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

  const submitForm = (sku) => {
    if (existSameOptions(sku)) return false
    let currentSkus = Array.from(skus);
    currentSkus.push({ ...sku, index: currentSkus.length, record:false });
    setSkus(currentSkus);
    return true
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
      {open ? (
        <SkuForm
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
