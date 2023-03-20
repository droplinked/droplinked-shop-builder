//import "./Merch-page-style.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../api/public/Product-api";
import { MerchpageContainer } from "./Merch-page-style";
import { Box } from "@chakra-ui/react";

import { useApi } from "../../../hooks/useApi/useApi";
import { getPublicProductById } from "../../../apis/productsApiService";

import Loading from "../../../components/shared/loading/Loading";
import DroplinkedMerch from "./droplinked-merch/Droplinked-merch";
import ShopifyMech from "./shopify-merch/Shopify-merch";
import AuthModal from "../../../modals/auth/AuthModal";

export default function MerchPage() {
  const [product, setProduct] = useState(null);

  const [authModal, setAuthModal] = useState(false);

  let params = useParams();
  const { getApi } = useApi()

  let merchId = params.merchId;
  let shopname = params.shopname;

  useEffect(() => {
    getdata(merchId);
  }, []);

  const getdata = async (merchId) => {
    let result = await getApi(getPublicProductById(merchId));
    if(result)setProduct(result);
  };

  console.log('product ' ,product);

  const toggleAuthModal = () => setAuthModal((p) => !p);

  return (
    <MerchpageContainer>
      {product == null ? (
        <Loading />
      ) : (
        <Box maxW="800px" w="100%" mx="auto">
          {product.type == "DROPLINKED" ? (
            <DroplinkedMerch bproduct={product} openLogin={toggleAuthModal} />
          ) : (
            <ShopifyMech
              shopName={shopname}
              product={product}
              openLogin={toggleAuthModal}
            />
          )}
        </Box>
      )}
      <AuthModal show={authModal} close={toggleAuthModal} />
    </MerchpageContainer>
  );
}
