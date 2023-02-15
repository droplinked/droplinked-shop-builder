import { useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SHIPING_TYPES } from "./shippings-type";
import { useApi } from "../../../hooks/useApi/useApi";
import { getProducerProductById } from "../../../api-service/product/productApiService";
import { productIntroReducer } from "./reducer/product-intro-reducer";
import { productTechReducer } from "./reducer/technical-data-reducer";
import { PageWrapper } from "./EditProductPage-style";
import {
  getIntroData,
  getTechnicalData,
  getPropertiesData,
  getSkusData,
} from "./utils";

import ProductIntroComponent from "./components/product-intro-component/ProductIntroComponent";
import TechnicalComponent from "./components/technical-component/TechnicalComponent";
import PropertiesComponent from "./components/PropertiesComponent/PropertiesComponent";
import VariantsComponent from "./components/variants-component/VariantsComponent";

const EditProductPage = () => {
  const [productIntro, dispatchIntro] = useReducer(productIntroReducer, null);
  const [TechnicalData, dispatchTechnical] = useReducer(
    productTechReducer,
    null
  );

  const [OptionList, setOptionList] = useState(null);
  const [skus, setSkus] = useState(null);

  const merchId = useParams().id;
  const { getApi } = useApi();

  const getProductData = async () => {
    let result = await getApi(getProducerProductById(merchId));
    if (result) {
      dispatchIntro({
        type: "initialIntroData",
        payload: getIntroData(result.product),
      });
      dispatchTechnical({
        type: "initialize",
        payload: getTechnicalData(result.product),
      });
      setOptionList(getPropertiesData(result.product));
      setSkus(getSkusData(result.product));
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <PageWrapper>
      {productIntro && (
        <ProductIntroComponent
          productIntro={productIntro}
          dispatchIntro={dispatchIntro}
        />
      )}
      {TechnicalData && (
        <TechnicalComponent
          TechnicalData={TechnicalData}
          dispatchTechnical={dispatchTechnical}
        />
      )}

      {OptionList && (
        <PropertiesComponent
          OptionList={OptionList}
          setOptionList={setOptionList}
        />
      )}
      {skus && (
        <VariantsComponent
          OptionList={OptionList}
          skus={skus}
          productId={merchId}
          updateProduct={getProductData}
        />
      )}
    </PageWrapper>
  );
};

export default EditProductPage;
