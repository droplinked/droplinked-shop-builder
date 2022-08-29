import "./Merch-page-style.scss";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { UseWalletInfo } from "../../context/wallet/WalletContext";
// import { useProfile } from "../../context/profile/ProfileContext";
// import { useToasty } from "../../context/toastify/ToastContext";
// import { checkRules } from "../../services/nft-service/NFTcheck";
// import { useCart } from "../../context/cart/CartContext";
import { getProduct } from "../../api/public/Product-api";
//import { addSkuToCart } from "../../api/base-user/Cart-api";

// import Carousel from "../../components/shared/Carousel/Carousel-component";
import Loading from "../../components/shared/loading/Loading";
// import plus from "../../assest/icon/plusIcon.png";
// import minus from "../../assest/icon/minusIcon.png";
// import SpcialDropDownComp from "./specialDropDown/Special-dropdown-component";
// import BasicButton from "../../components/shared/BasicButton/BasicButton";
import DroplinkedMerch from "./Droplinked-merch";
import ShopifyMech from "./Shopify-merch";
export default function MerchPage() {
  const [product, setProduct] = useState(null);
//   const [images, setImages] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [disableBtn, setDisableBtn] = useState(false);
  // state for change description limited
//   const [readmore, setReadmore] = useState(false);

//   const [optionTypes, setOptionTypes] = useState(null);
//   const [optionsValue, setOptionsValue] = useState(null);
//   const [options, setOptions] = useState(null);
//   const [sku, setSku] = useState(null);

//   const { userData, authenticate } = UseWalletInfo();
//   const { profile } = useProfile();
//   const { errorToast, successToast } = useToasty();
//   const { updateCart } = useCart();
//   const navigate = useNavigate();

  let params = useParams();
  let merchId = params.merchId;
  let shopname = params.shopname;

  useEffect(() => {
    getdata(merchId);
  }, []);

  const getdata = async (merchId) => {
    let pr = await getProduct(merchId);
    setProduct(pr);
  };



  return (
    <div className="merch-page-container">
      {product == null ? (
        <Loading />
      ) : (
        <>
          {product.type == "DROPLINKED" ? (
            <DroplinkedMerch product={product} />
          ) : (
            <ShopifyMech product={product.shopifyData} />
          )}
        </>
      )}
    </div>
  );
}
