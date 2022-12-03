import { AddProductPageWrapper } from "./add-product-style";
import { Box , Flex} from "@chakra-ui/react";
import { useState, useReducer } from "react";
import { productIntroReducer } from "./product-intro-reducer";
import { productTechReducer } from "./product-technical-reducer";
import { postProduct } from "../../api/producer/Product-api";

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

  // Object.assign(person, job)

  const saveProduct = () => {
  //  let finalData = Object.assign(productIntro, TechnicalInfo, { skus: skus });
   // console.log("finalData : ", finalData);
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
          <BasicButton click={saveProduct}>Save</BasicButton>
        </Box>
      </Flex>
    </AddProductPageWrapper>
  );
};

export default AddproductTest;
