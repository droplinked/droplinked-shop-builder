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
import { useReducer } from "react";
import { Box } from "@chakra-ui/react";

import { SHIPING_TYPES } from "../../../constant/shipping-types";
import { productIntroReducer } from "./reducer/product-intro-reducer";
import { productTechReducer } from "./reducer/technical-data-reducer";
import { PageWrapper } from "./Add-product-style";

import ProductIntoComponent from "./components/ProductIntoComponent";
import TechnicalComponent from "./components/technical-component/TechnicalComponent";

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
    </PageWrapper>
  );
}

export default AddProductPage;
