import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";

import { useToasty } from "../../../../../context/toastify/ToastContext";
import { useApi } from "../../../../../hooks/useApi/useApi";
//import { putUpdateProduct } from "../../../../../api-service/product/productApiService";
import { putProductById } from "../../../../../apis/productsApiService";
import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";

const ButtonComponent = ({ productIntro, TechnicalData, skus, productId }) => {
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const { putApi } = useApi();

  const backToPriviesPage = () => {};

  const isValidate = () => {
    if (isEmpty(productIntro.title, "title")) return false;
    if (isEmpty(productIntro.description, "description")) return false;
    if (isEmpty(TechnicalData.productCollectionID, "collection")) return false;
    return true;
  };

  const isEmpty = (value, name) => {
    if (value == "") {
      errorToast(`Sku ${name} is required`);
      return true;
    }
  };

  const saveProduct = async () => {
    if (isValidate()) {
      const mediaArray = productIntro.media.map((url, i) => {
        return { url: url, isMain: i == 0 ? true : false };
      });
      let finalData = Object.assign(
        { ...productIntro, media: mediaArray },
        TechnicalData,
        {
          sku: skus,
        },
        {
          priceUnit: "USD",
        }
      );
      setLoading(true);
      let result = await putApi(putProductById(productId, finalData));
      setLoading(false);
      if (result) successToast("Done success fully");
    }
  };
  return (
    <Flex
      w="100%"
      maxW="1000px"
      alignItems="center"
      justifyContent="space-between"
      pt="20px"
    >
      <Box w="200px">
        <BasicButton
          cancelType={true}
          click={backToPriviesPage}
          loading={loading}
        >
          Back
        </BasicButton>
      </Box>
      <Box w="200px">
        <BasicButton click={saveProduct} loading={loading}>
          Save
        </BasicButton>
      </Box>
    </Flex>
  );
};

export default ButtonComponent;
