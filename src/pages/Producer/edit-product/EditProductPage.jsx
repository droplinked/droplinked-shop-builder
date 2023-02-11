import { useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { SHIPING_TYPES } from "./shippings-type";
import { useApi } from "../../../hooks/useApi/useApi";
import { getProducerProductById } from "../../../api-service/product/productApiService";
import { productIntroReducer } from "./reducer/product-intro-reducer";
import { PageWrapper } from "./EditProductPage-style";

const EditProductPage = () => {
  const [productIntro, dispatchIntro] = useReducer(productIntroReducer, null);

  const merchId = useParams().id;
  const { getApi } = useApi()

  useEffect(async() => {
    let result = await getApi(getProducerProductById(merchId))
    if(result) console.log("product data  : " , result.product)
  }, []);

  return <PageWrapper></PageWrapper>;
};

export default EditProductPage;
