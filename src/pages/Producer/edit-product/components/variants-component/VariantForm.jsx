import { useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

import {
  VariantComponentWrapper,
  DetailWrapper,
  Text16px,
  Line,
} from "../../EditProductPage-style";
import SkuForm from "./SkuForm";
import { useApi } from "../../../../../hooks/useApi/useApi";
import { putUpdateSku } from "../../../../../api-service/product/productApiService";

import editIcon from "../../../../../assest/icon/edit-icon.svg";
import deleteIcon from "../../../../../assest/icon/delete-icon.svg";

const VariantForm = ({
  sku,
  OptionList,
  productId,
  // record={RecordSku}
  update,
  deleteSku
}) => {

    console.log('current sku , ' , sku)
  const [showForm, setShowForm] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { patchApi } = useApi();

  const toggleForm = () => setShowForm((p) => !p);
  const toggleRecordModal = () => setShowRecordModal((p) => !p);

  const submitForm = async (sku) => {
    console.log('update sku : ' , sku)
    let result = await patchApi(
      putUpdateSku(
        sku._id,
        sku.externalID,
        sku.price,
        sku.quantity,
        sku.options
      )
    );
    if (result) {
      update();
      return true;
    }
  };

  const RecordSku = () => {
    //   setLoading(true);
    //   setTimeout(function () {
    //     let currentSkus = Array.from(skus);
    //     currentSkus = currentSkus.map((current) => {
    //       if (current.index == sku.index) {
    //         return { ...current, record: true };
    //       } else {
    //         return { ...current };
    //       }
    //     });
    //     update(currentSkus);
    //     setLoading(false);
    //     toggleRecordModal();
    //   }, 2000);
  };



  return (
    <>
      {showForm ? (
        <SkuForm
          closeForm={toggleForm}
          OptionList={OptionList}
          submitForm={submitForm}
          defaultValue={sku}
        />
      ) : (
        <VariantComponentWrapper>
          <DetailWrapper>
            {sku.options.map((option) => {
              return (
                <>
                  <Text16px>
                    {option.variantName}: {option.value}
                  </Text16px>
                  <Line></Line>
                </>
              );
            })}

            <Text16px>Price: ${sku.price}</Text16px>
            <Line></Line>
            <Text16px>Quantity: {sku.quantity}</Text16px>
            <Line></Line>
            <Text16px>External ID: {sku.externalID}</Text16px>
          </DetailWrapper>
          <Flex alignItems="center">
            {sku.record ? (
              <Flex
                w="100px"
                borderRadius="35px"
                bg="subLayer"
                justifyContent="center"
                alignItems="center"
                p="8px 16px"
                mr="16px"
              >
                <Text16px>recorded</Text16px>
              </Flex>
            ) : (
              <Flex
                w="24px"
                h="24px"
                bg="#FEB900"
                borderRadius="50% 50% 0px 50% "
                justifyContent="center"
                alignItems="center"
                mr="16px"
                cursor="pointer"
                onClick={toggleRecordModal}
              >
                <Flex w="10px" h="10px" bg="#1C1C1C" borderRadius="50%"></Flex>
              </Flex>
            )}
            <Image
              onClick={()=>{deleteSku(sku._id)}}
              src={deleteIcon}
              w="24px"
              h="24px"
              mr="16px"
            />
            <Image onClick={toggleForm} src={editIcon} w="24px" h="24px" />
          </Flex>

          {/* <RecordModal
            show={showRecordModal}
            close={toggleRecordModal}
            submit={RecordSku}
            loading={loading}
          /> */}
        </VariantComponentWrapper>
      )}
    </>
  );
};

export default VariantForm;
