import { useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//
import { useApi } from "hooks/useApi/useApi";
import {
  productIntroReducer,
  INTRO_REDUCER_TYPES,
} from "../reducer/product-intro-reducer";
import {
  productTechReducer,
  TECH_REDUCER_TYPES,
} from "../reducer/technical-data-reducer";
import { PageWrapper } from "./EditProductPage-style";
import { getPublicProductById } from "apis/productsApiService";
import {
  getIntroData,
  getTechnicalData,
  getPropertiesData,
  getSkusData,
} from "./utils";
//
import ProductIntroComponent from "../components/product-intro-conponent/ProductIntroComponent";
import TechnicalComponent from "../components/technical-component/TechnicalComponent";
import PropertiesComponent from "./components/PropertiesComponent/PropertiesComponent";
import VariantsComponent from "./components/variants-component/VariantsComponent";
import ButtonComponent from "./components/buttons-component/ButtonComponent";
import LoadingComponent from "components/shared/loading-component/LoadingComponent";

const EditProductPage = () => {
  // state for keep title and  description and images
  const [productIntro, dispatchIntro] = useReducer(productIntroReducer, null);
  // state for keep collection and shipping
  const [TechnicalData, dispatchTechnical] = useReducer(
    productTechReducer,
    null
  );
  // state for keep option types and values
  const [OptionList, setOptionList] = useState(null);
  // state for keep skus
  const [skus, setSkus] = useState(null);

  const merchId = useParams().productId;
  const { getApi } = useApi();

  // gets product data by productId and initializes states
  const getProductData = async () => {
    let result = await getApi(getPublicProductById(merchId));
    if (result) {
      dispatchIntro({
        type: INTRO_REDUCER_TYPES.INITIALIZE,
        payload: getIntroData(result),
      });
      dispatchTechnical({
        type: TECH_REDUCER_TYPES.INITIALIZE,
        payload: getTechnicalData(result),
      });
      setOptionList(getPropertiesData(result));
      setSkus(getSkusData(result));
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  if (!productIntro) return <LoadingComponent />;

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
      {productIntro && (
        <ButtonComponent
          productIntro={productIntro}
          TechnicalData={TechnicalData}
          skus={skus}
          productId={merchId}
        />
      )}
    </PageWrapper>
  );
};

export default EditProductPage;
