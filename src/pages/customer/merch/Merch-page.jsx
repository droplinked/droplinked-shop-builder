//import "./Merch-page-style.scss";

import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { getProduct } from "../../../api/public/Product-api";
import { MerchpageContainer } from "./Merch-page-style"

import Loading from "../../../components/shared/loading/Loading";
import DroplinkedMerch from "./droplinked-merch/Droplinked-merch";
import ShopifyMech from "./shopify-merch/Shopify-merch";

export default function MerchPage() {

  const [product, setProduct] = useState(null);

  let params = useParams();

  let merchId = params.merchId;
  let shopname = params.shopname;

  useEffect(() => {
    getdata(merchId);
  }, []);

  const getdata = async (merchId) => {
    let result = await getProduct(merchId);
    setProduct(result);
  };



  return (
    <MerchpageContainer>
      {product == null ? (
        <Loading />
      ) : (
        <>
          {product.type == "DROPLINKED" ? (
            <DroplinkedMerch product={product} />
          ) : (
            <ShopifyMech shopName={shopname} product={product} />
          )}
        </>
      )}
    </MerchpageContainer>
  );
}
