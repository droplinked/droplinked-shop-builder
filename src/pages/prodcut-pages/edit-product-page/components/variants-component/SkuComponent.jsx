import { useState } from "react";
import { Flex, IconButton, Image, Td, Text, Tr } from "@chakra-ui/react";

import { Text16px } from "../../EditProductPage-style";
import SkuForm from "./SkuForm";
import { useApi } from "../../../../../hooks/useApi/useApi";

import editIcon from "../../../../../assest/icon/edit-icon.svg";
import tearIcon from "../../../../../assest/icon/tear-icon.svg";
import infoIcon from "../../../../../assest/icon/info-icon.svg";

const SkuComponent = ({
  sku,
  OptionList,
  updateProduct,
  skus,
  // record={RecordSku}
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const { deleteApi } = useApi();

  const toggleForm = () => setShowForm((p) => !p);
  const toggleRecordModal = () => setShowRecordModal((p) => !p);

  const deleteSku = async () => {
    //let result = await deleteApi(deleteRemoveSku(sku._id));
    // if (result) updateProduct();
  };

  const RecordSku = () => {};

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
        {OptionList?.length &&
          OptionList?.map((option) => (
            <Td key={option?.optionName}>
              <Text>
                {sku?.options?.find(
                  (item) => item?.variantName === option?.optionName
                )?.value ?? "-"}
              </Text>
            </Td>
          ))}
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
        <Td colSpan={10} px={0} border="none">
          <SkuForm
            deleteSku={deleteSku}
            skus={skus}
            closeForm={toggleForm}
            OptionList={OptionList}
            defaultValue={sku}
            updateProduct={updateProduct}
          />
        </Td>
      )}
    </>
  );
};

export default SkuComponent;
