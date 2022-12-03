import { AddProductPageWrapper } from "./add-product-style";
import { Box } from "@chakra-ui/react";
import { useState, useReducer } from "react";
import { productIntroReducer } from "./product-intro-reducer";
import { productTechReducer } from "./product-technical-reducer";

import ProductIntroducing from "./product-introducing-component/productn-intoducing";
import TechnicalInformation from "./technical-information/technical-information";
import ProductProperites from "./product-properties/product-properties";
import AddSkuSection from "./add-sku-section/add-sku-section";

// const SHIPPING_TYPE = {
//   EASY_POST: "EASY_POST",
//   CUSTOM: "CUSTOM",
// };

const initialProductIntor = {
  title: "",
  description: "",
  media: [],
};

const initialTechnicalInfo = {
  collectionID: "",
  shippingType: "",
  shippingPrice: "",
};

const AddproductTest = () => {
  //useReducer(reducer, initial());
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

  console.log("TechnicalInfo", TechnicalInfo);

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
    </AddProductPageWrapper>
  );
};

export default AddproductTest;

// "priceUnit": "USD",
// "productCollectionID": "62eaab4e27d6d30ba22955ab",
// "shippingType": "CUSTOM",
// "shippingPrice": 20,
