import { AddProductPageWrapper } from "./add-product-style";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

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

const AddproductTest = () => {
  const [productIntro, setProductIntro] = useState(initialProductIntor);
  const [OptionList, setOptionList] = useState([]);
  const [skus, setSkus] = useState([]);

  return (
    <AddProductPageWrapper>
      <ProductIntroducing />
      <Box mb="16px"></Box>
      <TechnicalInformation />
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

// "title": "title",
// "description": "descr",
// "priceUnit": "USD",
// "productCollectionID": "62eaab4e27d6d30ba22955ab",
// "shippingType": "CUSTOM",
// "shippingPrice": 20,
// "media": [
//     {
//         "url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
//         "isMain": true
//     }
// ],
