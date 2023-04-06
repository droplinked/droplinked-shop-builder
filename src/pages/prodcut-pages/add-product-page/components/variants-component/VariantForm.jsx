import { useState } from "react";
import { Flex, Text, Image, Tr, Td, IconButton } from "@chakra-ui/react";

import { Text16px } from "../../AddProductPage-style";
import SkuForm from "./SkuForm";

import editIcon from "../../../../../assest/icon/edit-icon.svg";
import tearIcon from "../../../../../assest/icon/tear-icon.svg";
import infoIcon from "../../../../../assest/icon/info-icon.svg";

const VariantForm = ({
  sku,
  OptionList,
  deleteSku,
  changeSku,
  // record={RecordSku}
  update,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const toggleForm = () => setShowForm((p) => !p);
  const toggleRecordModal = () => setShowRecordModal((p) => !p);

  const submitForm = (thisSku) => {
    changeSku(thisSku, sku.index);
    return true;
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
      <Tr
        sx={{
          "& td": {
            borderColor: "line",
            fontFamily: "Avenir Next",
            fontWeight: "500",
            fontSize: "sm",
            color: "lightGray",
          },
        }}
      >
        <Td>
          <Text>{sku.size}</Text>
        </Td>
        <Td>
          <Text>{sku.quantity}</Text>
        </Td>
        <Td>
          <Text>{sku.externalID}</Text>
        </Td>
        <Td>
          <Text>${sku.price}</Text>
        </Td>
        <Td>
          <Flex alignItems="center">
            {sku.record ? (
              <Flex
                w="100px"
                borderRadius="35px"
                bg="subLayer"
                justifyContent="center"
                alignItems="center"
                p="8px 16px"
              >
                <Text16px>recorded</Text16px>
              </Flex>
            ) : (
              <IconButton
                variant="unstyled"
                size="sm"
                _focus={{ border: "none" }}
                onClick={toggleRecordModal}
              >
                <Image src={tearIcon} w="16px" h="16px" />
              </IconButton>
            )}
            <IconButton
              variant="unstyled"
              size="sm"
              _focus={{ border: "none" }}
              onClick={toggleForm}
            >
              <Image src={editIcon} w="16px" h="16px" />
            </IconButton>
            <IconButton
              variant="unstyled"
              size="sm"
              _focus={{ border: "none" }}
            >
              <Image src={infoIcon} w="16px" h="16px" />
            </IconButton>
          </Flex>
        </Td>
      </Tr>

      {showForm && (
        <Td colSpan={5} px={0} border="none">
          <SkuForm
            deleteSku={deleteSku}
            closeForm={toggleForm}
            OptionList={OptionList}
            submitForm={submitForm}
            defaultValue={sku}
          />
        </Td>
      )}
    </>
  );
};

export default VariantForm;
