import { useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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

      {skus?.length && (
        <TableContainer width="100%" mb="36px">
          <Table>
            <Thead borderY="1px solid" borderColor="line">
              <Tr>
                {OptionList?.length &&
                  OptionList?.map((option, index) => (
                    <Th
                      py={4}
                      fontSize="12px"
                      fontWeight="500"
                      color="lightGray"
                      border="none"
                      key={index}
                    >
                      {option?.optionName}
                    </Th>
                  ))}
                {[
                  {
                    width: "16%",
                    label: "Quantity",
                  },
                  {
                    width: "16%",
                    label: "External ID",
                  },
                  {
                    width: "32%",
                    label: "Price",
                  },
                  {
                    width: "16%",
                    label: "Options",
                  },
                ].map((item) => (
                  <Th
                    py={4}
                    fontSize="12px"
                    fontWeight="500"
                    key={item.label}
                    // w={item.width}
                    color="lightGray"
                    border="none"
                  >
                    {item.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {skus.length > 0 && (
              <Tbody>
                {skus.map((currentSku) => {
                  return (
                    <SkuComponent
                      updateProduct={updateProduct}
                      key={currentSku.index}
                      sku={currentSku}
                      skus={skus}
                      OptionList={OptionList}
                      // deleteSku={() => {
                      //   deleteSku(currentSku.index);
                      // }}
                      // changeSku={changeSku}
                      // // record={RecordSku}
                      // update={update}
                    />
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      )}
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
