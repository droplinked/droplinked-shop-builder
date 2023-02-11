// import BasicButton from "../../../components/shared/BasicButton/BasicButton";
// import ProductInformation from "../components/product-information-component";
// import OptionCheckboxes from "./option-checkbox-component/option-checkbox";
// import SkusComponent from "./skus-component/Skus-component";
// import AddSkuModal from "../../../modals/add-sku/AddSkuModal";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getVariants, postProduct } from "../../../api/producer/Product-api";
// import { useToasty } from "../../../context/toastify/ToastContext";
// import {
//   ModalContainerWrapper,
//   TitleText,
//   TypeSelect,
//   LableInput,
//   InputComponent,
// } from "./Add-product-style";
// import { Flex, Box } from "@chakra-ui/react";
// import { SHIPING_TYPES } from "./shippings-type";
// import { API_STATUS } from "../../../constant/api-status";
import { useReducer, useState } from "react";
import { Box } from "@chakra-ui/react";

import { SHIPING_TYPES } from "../../../constant/shipping-types";
import { productIntroReducer } from "./reducer/product-intro-reducer";
import { productTechReducer } from "./reducer/technical-data-reducer";
import { PageWrapper } from "./Add-product-style";

import ProductIntoComponent from "./components/ProductIntoComponent";
import TechnicalComponent from "./components/technical-component/TechnicalComponent";
import PropertiesComponent from "./components/properties-component/PropertiesComponent";
import VariantsComponent from "./components/variants-component/VariantsComponent";
import ButtonComponent from "./components/buttons-component/ButtonComponent";

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

function AddProductPage() {
  const [productIntro, dispatchIntro] = useReducer(
    productIntroReducer,
    initialProductIntor
  );

  const [TechnicalData, dispatchTechnical] = useReducer(
    productTechReducer,
    initialTechnicalInfo
  );
  const [OptionList, setOptionList] = useState([]);
  const [skus, setSkus] = useState([]);

  return (
    <PageWrapper>
      <ProductIntoComponent
        productIntro={productIntro}
        dispatchIntro={dispatchIntro}
      />
      <TechnicalComponent
        TechnicalData={TechnicalData}
        dispatchTechnical={dispatchTechnical}
      />
      <PropertiesComponent
        OptionList={OptionList}
        setOptionList={setOptionList}
      />
      <VariantsComponent
        OptionList={OptionList}
        skus={skus}
        setSkus={setSkus}
      />
      <ButtonComponent productIntro={productIntro} TechnicalData={TechnicalData} skus={skus} />
    </PageWrapper>
  );
}

export default AddProductPage;
