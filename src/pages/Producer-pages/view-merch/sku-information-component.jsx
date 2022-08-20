import { useState, useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  addSkuToProduct,
  updateSku,
  deleteSku,
} from "../../../api/producer/Product-api";
import { useToasty } from "../../../context/toastify/ToastContext";

import VariantItem from "../components/variant-item-component/Variant-item-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import SkuForm from "../add-product/sku-form-component";

const SkuInformation = ({ skus, merchId, updateMerch }) => {
  // state for show and hide sku form
  const [showSkuForm, setShowSkuForm] = useState(false);
  // state for intergrate with SkuForm and add new sku
  const [skuData, setSkuData] = useState(null);
  // state for edit exsiting skus
  const [editSku, setEditSku] = useState(null);

  const { successToast, errorToast } = useToasty();

  let optionsType = useMemo(() => {
    return skus[0].options.map((opt) => {
      return { optionID: opt.variantID };
    });
  }, [skus]);

  // add new sku to product
  const submitAddNewSku = async () => {
    let result = await addSkuToProduct(merchId, [skuData]);
    if (result == true) {
         successToast("New SKU added")
    } else {
      errorToast(result);
    }
    setShowSkuForm(false);
    updateMerch();
  };

  const cancelAddNewSku = () => {
    setShowSkuForm(false);
    setSkuData(null);
    setEditSku(null)
  };

  // set selected sku detail in ( editSku ) state
  const onClickEditSku = (sku, id) => {
    setEditSku({
      externalID: sku.externalID,
      price: sku.price,
      quantity: sku.quantity,
      options: sku.options,
      id: id,
    });
  };

  // submit sku changes and update
  const submitEditSku = async () => {
    let result = await updateSku(editSku.id, editSku);
    if (result == true) {
      successToast("SKU update confirmed");
    } else {
      errorToast(result);
    }
    setEditSku(null);
    updateMerch();
  };

  // delete sku and update
  const deleteSkuFunction = async (id) => {
    let result = await deleteSku(id);
    if (result == true) {
      successToast("SKU successfully deleted ");
    } else {
      errorToast(result);
    }
    setEditSku(null);
    updateMerch();
  };

  return (
    <Box w="100%">
      {skus.map((sku) => (
        <VariantItem
          key={sku._id}
          id={sku._id}
          variant={sku}
          deleteVariant={deleteSkuFunction}
          editVariant={onClickEditSku}
        />
      ))}

      <Flex w="100%" justifyContent="center" alignItems="center" mt="40px">
        {editSku != null ? (
          <SkuForm
            skuData={editSku}
            setSkuData={setEditSku}
            optionsType={optionsType}
            onSubmit={submitEditSku}
            onCancel={cancelAddNewSku}
          />
        ) : (
          <>
            {showSkuForm == false ? (
              <Box w={{ base: "100%", md: "250px" }}>
                <BasicButton
                  onClick={() => {
                    setShowSkuForm(true);
                  }}
                >
                  Add variant
                </BasicButton>
              </Box>
            ) : (
              <SkuForm
                skuData={skuData}
                setSkuData={setSkuData}
                optionsType={optionsType}
                onSubmit={submitAddNewSku}
                onCancel={cancelAddNewSku}
              />
            )}
          </>
        )}
      </Flex>
    </Box>
  );
};

export default SkuInformation;
