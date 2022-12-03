import { AddProductPageWrapper } from "./add-product-style";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useReducer } from "react";
import { productIntroReducer } from "./product-intro-reducer";
import { productTechReducer } from "./product-technical-reducer";
import { postProduct } from "../../api/producer/Product-api";
import { useToasty } from "../../context/toastify/ToastContext";
import { SHIPING_TYPES } from "../../constant/shipping-types";
import { API_STATUS } from "../../constant/api-status";

import BasicButton from "../../components/shared/BasicButton/BasicButton";
import ProductIntroducing from "./product-introducing-component/productn-intoducing";
import TechnicalInformation from "./technical-information/technical-information";
import ProductProperites from "./product-properties/product-properties";
import AddSkuSection from "./add-sku-section/add-sku-section";

const initialProductIntor = {
  title: "",
  description: "",
  media: [],
};

const initialTechnicalInfo = {
  productCollectionID: "",
  shippingType: SHIPING_TYPES.EASY_POST,
  shippingPrice: 0,
};

const AddproductTest = () => {
  const { successToast,errorToast } = useToasty();

  const [productIntro, dispatchInto] = useReducer(
    productIntroReducer,
    initialProductIntor
  );
  const [TechnicalInfo, dispatchTechnical] = useReducer(
    productTechReducer,
    initialTechnicalInfo
  );
  const [OptionList, setOptionList] = useState([]);
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(false);

  const isValidate = () => {
    if (isEmpty(productIntro.title, "title")) return false;
    if (isEmpty(productIntro.description, "description")) return false;
    if (isEmpty(TechnicalInfo.productCollectionID, "collection")) return false;
    return true;
  };

  const isEmpty = (value, name) => {
    if (value == "") {
      errorToast(`Sku ${name} is required`);
      return true;
    }
  };

  const saveProduct = async() => {
    if (isValidate()) {
      const mediaArray = productIntro.media.map((url, i) => {
        return { url: url, isMain: i == 0 ? true : false };
      });
      let finalData = Object.assign(
        { ...productIntro, media: mediaArray },
        TechnicalInfo,
        {
          sku: skus,
        },{
          priceUnit: "USD"
        }
      );
      setLoading(true)
      let result = await postProduct(finalData)
      setLoading(false)
      if(result.status == API_STATUS.SUCCESS)successToast('Done success fully')
      else errorToast(result.data)
    }
  };

  return (
    <AddProductPageWrapper>
      <ProductIntroducing
        productIntro={productIntro}
        dispatchInto={dispatchInto}
      />
      <Box mb="16px"></Box>
      <TechnicalInformation
        TechnicalInfo={TechnicalInfo}
        dispatchTechnical={dispatchTechnical}
      />
      <Box mb="16px"></Box>
      <ProductProperites
        OptionList={OptionList}
        setOptionList={setOptionList}
      />
      <Box mb="16px"></Box>
      <AddSkuSection OptionList={OptionList} skus={skus} setSkus={setSkus} />
      <Box mb="32px"></Box>
      <Flex w="100%" justifyContent="end">
        <Box w="200px">
          <BasicButton click={saveProduct} loading={loading}>Save</BasicButton>
        </Box>
      </Flex>
    </AddProductPageWrapper>
  );
};

export default AddproductTest;
