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
//
import { ComponentWrapper, ComponentTitle } from "../../AddProductPage-style";
import { useToasty } from "context/toastify/ToastContext";
//
import BasicButton from "components/shared/BasicButton/BasicButton";
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
    if (existSameOptions(sku)) errorToast(`There is same sku`);
    let currentSkus = Array.from(skus);
    currentSkus.push({ ...sku, index: currentSkus.length, record: false });
    setSkus(currentSkus);
    return true;
  };

  const existSameOptions = (sku) => {
    if (sku.options.length === 0) return false;
    const isSame = skus?.some((skuItem) => {
      const skuOption = sku.options;
      const skuItemOption = skuItem.options;
      const findByVariantName = (variantName, data) => {
        return data?.find((item) => item.variantName === variantName) ?? null;
      };
      return skuOption.every(
        (opt) =>
          findByVariantName(opt.variantName, skuItemOption)?.value ===
          opt?.value
      );
    });
    return isSame;
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
