import { useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SHIPING_TYPES } from "./shippings-type";
import { useApi } from "../../../hooks/useApi/useApi";
import { getProducerProductById } from "../../../api-service/product/productApiService";
import { productIntroReducer } from "./reducer/product-intro-reducer";
import { PageWrapper } from "./EditProductPage-style";
import { getIntroData } from "./utils";

import ProductIntroComponent from "./components/product-intro-component/ProductIntroComponent";

const EditProductPage = () => {
  const [productIntro, dispatchIntro] = useReducer(productIntroReducer, null);

  const merchId = useParams().id;
  const { getApi } = useApi();
  console.log("productIntro : ", productIntro);
  useEffect(async () => {
    let result = await getApi(getProducerProductById(merchId));
    if (result) {
      dispatchIntro({
        type: "initialIntroData",
        payload: getIntroData(result.product),
      });
    }
  }, []);

  return (
    <PageWrapper>
      {productIntro && (
        <ProductIntroComponent
          productIntro={productIntro}
          dispatchIntro={dispatchIntro}
        />
      )}
    </PageWrapper>
  );
};

export default EditProductPage;
