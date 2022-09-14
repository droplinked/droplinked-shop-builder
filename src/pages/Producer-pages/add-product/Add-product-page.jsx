import "./Add-product-page-style.scss";

import VariantItem from "../components/variant-item-component/Variant-item-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import CheckBox from "../../../components/shared/Checkbox/CheckBox-component";
import ProductInformation from "../components/product-information-component";
//import SkuForm from "../components/sku-form-component";
import SkuModal from "../../../components/Modal/Sku/Sku-modal";
import OptionCheckboxes from "./option-checkbox-component/option-checkbox";
import SkusComponent from "./skus-component/Skus-component";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVariants, postProduct } from "../../../api/producer/Product-api";
import { useToasty } from "../../../context/toastify/ToastContext";

function AddProductPage() {
  const token = JSON.parse(localStorage.getItem("token"));

  // state for pass to ProductInformation component
  // and  management (title , description , images , collectionId)
  const [productInfo, setProductInfo] = useState(null);
  // state for selected options type
  const [selectedOptions, setSelectedOptions] = useState([]);
  // use for disable button and loading mode
  const [disbtn, setdisbtn] = useState(false);
  // state for vanriants type
  const [varintType, setVariantType] = useState(null);
  // this state for show and hide sku modal
  const [skuModalShow, setSkuModalShow] = useState(false);
  const [skuArray, setSkuArray] = useState([]);

  const { successToast, errorToast } = useToasty();
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }
    initialVariant();
  }, []);

  // initialize variantType and collectin List
  const initialVariant = () => {
    getVariants()
      .then((e) => setVariantType(e))
      .catch((e) => console.log(e));
  };

  // close page
  const cancelForm = () => {
    navigate("/producer/ims");
  };

  const validationForm = () => {
    if (productInfo.title == "") {
      errorToast("Item name is required");
      return true;
    } else if (productInfo.productCollectionID == "") {
      errorToast("Choose a collection");
      return true;
    } else if (productInfo.images.length == 0) {
      errorToast("Add an image for this item");
      return true;
    } else if (skuArray.length == 0) {
      errorToast("Add a new variant");
      return true;
    } else {
      return false;
    }
  };

  // submit all product form
  const submitForm = async (e) => {
    e.preventDefault();

    if (validationForm()) return;

    let media = [];
    productInfo.images.map((img, i) => {
      media.push({ url: img, isMain: i == 0 });
    });

    const proDetail = {
      title: productInfo.title,
      description: productInfo.description,
      priceUnit: "USD",
      productCollectionID: productInfo.productCollectionID,
      media: media,
      sku: skuArray,
    };

    setdisbtn(true);
    let result = await postProduct(proDetail);
    if (result == true) {
      successToast("Item added successfully");
      navigate("/producer/ims");
    } else {
      errorToast(result);
      setdisbtn(false);
    }
  };



  const closeSkuModal = () => setSkuModalShow(false);
  const openSkuModal = () => setSkuModalShow(true);

  return (
    <div className="add-product-page-wrapper">
      <div className="ims-title mb-5">Add new item</div>
      {/* this component for (title , description , collection , images) */}
      <ProductInformation
        productInfo={productInfo}
        setProductInfo={setProductInfo}
      />
      {/* this component for selected options */}
      {varintType && (
        <OptionCheckboxes
          variants={varintType}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          disable={skuArray.length > 0}
        />
      )}

      {skuArray.length > 0 && <SkusComponent skusArray={skuArray} setSkuArray={setSkuArray} />}

      <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <BasicButton click={openSkuModal}>Add variant</BasicButton>
        </div>
      </div>
      {/* show edit sku form or anothen component */}

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginTop: "80px", width: "100%" }}
      >
        <div className="col-5 col-md-4">
          <BasicButton click={cancelForm} disabled={disbtn}>
            Cancel
          </BasicButton>
        </div>
        <div className="col-5 col-md-4">
          <BasicButton click={submitForm} disabled={disbtn}>
            Submit
          </BasicButton>
        </div>
      </div>
      {/* modal for add new sku  */}
      <SkuModal
        open={skuModalShow}
        close={closeSkuModal}
        optionTypes={selectedOptions}
        skuArray={skuArray}
        setSkuArray={setSkuArray}
      />
    </div>
  );
}

export default AddProductPage;
