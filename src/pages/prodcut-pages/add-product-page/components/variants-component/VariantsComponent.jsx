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

import { ComponentWrapper, ComponentTitle } from "../../AddProductPage-style";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import SkuForm from "./SkuForm";
import VariantForm from "./VariantForm";

const VariantsComponent = ({ OptionList, skus, setSkus }) => {
  const [openForm, setOpenForm] = useState(false);

  const { errorToast } = useToasty();

  const toggleForm = () => setOpenForm((p) => !p);

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

  const changeSku = (sku, index) => {
    let currentSkus = Array.from(skus);
    currentSkus = currentSkus.map((current) => {
      if (current.index == index) {
        return { ...sku, index: index };
      } else {
        return { ...current };
      }
    });
    setSkus(currentSkus);
  };

  const update = (newSkus) => {
    let currentSkus = Array.from(newSkus);
    setSkus(currentSkus);
  };

  const submitForm = (sku) => {
    if (existSameOptions(sku)) return false;
    let currentSkus = Array.from(skus);
    currentSkus.push({ ...sku, index: currentSkus.length, record: false });
    setSkus(currentSkus);
    return true;
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

      {skus?.length && (
        <TableContainer width="100%" mb="36px">
          <Table>
            <Thead borderY="1px solid" borderColor="line">
              <Tr>
                {[
                  {
                    width: "20%",
                    label: "Size",
                  },
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
                    w={item.width}
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
              </Tbody>
            )}
          </Table>
        </TableContainer>
      )}

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
