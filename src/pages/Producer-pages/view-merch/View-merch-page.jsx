import "./View-merch-page-style.scss";

import Loading from "../../../components/shared/loading/Loading";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import SmallModal from "../../../components/Modal/Small-modal/Small-modal-component";
import ProductInformation from "../add-product/product-information-component";
import SkuInformation from "./sku-information-component";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../../api/public/Product-api";
import { updateMerch, deleteMerch } from "../../../api/producer/Product-api";

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

  useEffect(() => {
    initialize();
  }, []);

  // initialize all form data
  const initialize = async () => {
    let result = await getProduct(merchId);
    if (result != null) {
      let images = result.media.map((image) => image.url);
      setMerch({ ...result, images: images });
    }
  };

  //update merch list
  const getMerch = async () => {
    let result = await getProduct(merchId);
    if (result != null) {
      setMerch(result);
    }
  };

  const cancelForm = () => {
    navigate("/producer/ims");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (productInfo.title == "") {
      errorToast("Item name is required");
      return;
    } else if (productInfo.images.length == 0) {
      errorToast("Add an image for this item");
      return;
    }

    let media = [];
    productInfo.images.map((img, i) => {
      media.push({ url: img, isMain: i == 0 });
    });

    const product = {
      title: productInfo.title,
      description: productInfo.description,
      priceUnit: "USD",
      collectionID: productInfo.productCollectionID,
      media: media,
    };
    setLoading(true);

    let productResutl = await updateMerch(merchId, product);

    if (productResutl == true) {
      successToast("Item successfully updated");
      navigate("/producer/ims");
    } else {
      errorToast(productResutl);
    }
    setLoading(false);
  };

  const DeleteMerch = async () => {
    setModalDisBtn(true);
    let result = await deleteMerch(merchId);
    if (result == true) {
      successToast("Merch deleted successfully");
      navigate("/producer/ims");
    } else {
      errorToast(result);
      setDeleteModal(false);
    }
    setModalDisBtn(false);
  };

  return (
    <>
      {!merch ? (
        <Loading />
      ) : (
        <div className="add-product-page-wrapper">
          <div className="col-12 col-md-6 mb-5">
            <BasicButton
              bgColor="#fa6653"
              onClick={() => {
                setDeleteModal(true);
              }}
              loading={loading}
            >
              Delete item
            </BasicButton>
          </div>

          <ProductInformation
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            defaultValue={merch}
          />

          <SkuInformation
            skus={merch.skus}
            merchId={merchId}
            updateMerch={getMerch}
          />

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginTop: "80px", width: "100%" }}
          >
            <div className="col-5 col-md-4">
              <BasicButton click={cancelForm} loading={loading}>
                Cancel
              </BasicButton>
            </div>
            <div className="col-5 col-md-4">
              <BasicButton click={submitForm} loading={loading}>
                Submit
              </BasicButton>
            </div>
          </div>

          {deleteModal && (
            <SmallModal
              show={deleteModal}
              hide={() => setDeleteModal(false)}
              text={"Do you want to delete this item?"}
              click={DeleteMerch}
              loading={modalDisBtn}
              buttonText={"Delete"}
            />
          )}
        </div>
      )}
    </>
  );
}
