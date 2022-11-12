//import "./View-merch-page-style.scss";

import Loading from "../../../components/shared/loading/Loading";
import ViewShopifyMerch from "./shopify-merch-page/View-shopify-merch";
import ImsViewMerch from "./ims-merch-page/ims-viewmerch-page"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../../api/public/Product-api";
import { keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import { ViewMerchWrapper } from "./VIew-merch-page-style"

const keyframe_Animation = keyframes`
0% {
    transform: translatey(200px);
    opacity: 0;
}
100% {
  transform: translatey(0);
  opacity: 1;
}
`;

export default function ViewMerchPage() {
  // state for pass to ProductInformation component
  // and  management (title , description , images , collectionId)
  const [productInfo, setProductInfo] = useState(null);
  const [merch, setMerch] = useState(null);

  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalDisBtn, setModalDisBtn] = useState(false);

  const { successToast, errorToast } = useToasty();

  const merchId = useParams().id;
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  const pageAnimation = prefersReducedMotion
    ? undefined
    : `${keyframe_Animation}  1s linear`;

  useEffect(() => {
    initialize();
  }, []);

  // initialize all form data
  const initialize = async () => {
    let result = await getProduct(merchId);
    if (result != null) {
      if (result.shopifyData) {
        setMerch(result);
      } else {
        let images = result.media.map((image) => image.url);
        setMerch({ ...result, images: images });
      }
    }
  };

  //update merch list
  const getMerch = async () => {
    let result = await getProduct(merchId);
    if (result != null) {
      setMerch(result);
    }
  };


  return (
    <>
      {!merch ? (
        <Loading />
      ) : (
        <ViewMerchWrapper animation={pageAnimation} >
          {merch.shopifyData ? (
            <ViewShopifyMerch product={merch} shopifyData={merch.shopifyData} />
          ) : (
            <ImsViewMerch merch={merch} update={getMerch}/>
          )}
        </ViewMerchWrapper>
      )}
    </>
  );
}





  // const cancelForm = () => {
  //   navigate("/producer/ims");
  // };

  // const submitForm = async (e) => {
  //   e.preventDefault();

  //   if (productInfo.title == "") {
  //     errorToast("Item name is required");
  //     return;
  //   } else if (productInfo.images.length == 0) {
  //     errorToast("Add an image for this item");
  //     return;
  //   }

  //   let media = [];
  //   productInfo.images.map((img, i) => {
  //     media.push({ url: img, isMain: i == 0 });
  //   });

  //   const product = {
  //     title: productInfo.title,
  //     description: productInfo.description,
  //     priceUnit: "USD",
  //     collectionID: productInfo.productCollectionID,
  //     media: media,
  //   };
  //   setLoading(true);

  //   let productResutl = await updateMerch(merchId, product);

  //   if (productResutl == true) {
  //     successToast("Item successfully updated");
  //     navigate("/producer/ims");
  //   } else {
  //     errorToast(productResutl);
  //   }
  //   setLoading(false);
  // };

  // const DeleteMerch = async () => {
  //   setModalDisBtn(true);
  //   let result = await deleteMerch(merchId);
  //   if (result == true) {
  //     successToast("Merch deleted successfully");
  //     navigate("/producer/ims");
  //   } else {
  //     errorToast(result);
  //     setDeleteModal(false);
  //   }
  //   setModalDisBtn(false);
  // };