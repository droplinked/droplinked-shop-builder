import {
  VariantComponentWrapper,
  DetailWrapper,
  DetailText,
  Line,
} from "./variant-conponent-style";

import { Image, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

import SkuForm from "../sku-form/sku-form";
import deleteIcon from "../../../../../assest/icon/delete-icon.svg";
import editIcon from "../../../../../assest/icon/edit-icon.svg";
import RecordModal from "../../../../../components/Modal/record/record-modal";

const VariantComponent = ({
  sku,
  OptionList,
  deleteSku,
  changeSku,
  skus,
  update,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleForm = () => setShowForm((p) => !p);
  const toggleRecordModal = () => setShowRecordModal((p) => !p);

  const submitForm = (thisSku) => {
    changeSku(thisSku, sku.index);
    return true;
  };

  const RecordSku = () => {
    setLoading(true);
    setTimeout(function () {
      let currentSkus = Array.from(skus);
      currentSkus = currentSkus.map((current) => {
        if (current.index == sku.index) {
          return { ...current, record: true };
        } else {
          return { ...current };
        }
      });
      update(currentSkus);
      setLoading(false);
      toggleRecordModal();
    }, 2000);
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
                  <DetailText>
                    {option.variantName}: {option.value}
                  </DetailText>
                  <Line></Line>
                </>
              );
            })}

            <DetailText>Price: ${sku.price}</DetailText>
            <Line></Line>
            <DetailText>Quantity: {sku.quantity}</DetailText>
            <Line></Line>
            <DetailText>External ID: {sku.externalID}</DetailText>
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
                <Text fontSize="18px" fontWeight="500" color="lightGray">
                  recorded
                </Text>
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
              onClick={deleteSku}
              src={deleteIcon}
              w="24px"
              h="24px"
              mr="16px"
            />
            <Image onClick={toggleForm} src={editIcon} w="24px" h="24px" />
          </Flex>

          {showRecordModal && (
            <RecordModal
              close={toggleRecordModal}
              submit={RecordSku}
              loading={loading}
            />
          )}
        </VariantComponentWrapper>
      )}
    </>
  );
};

export default VariantComponent;
