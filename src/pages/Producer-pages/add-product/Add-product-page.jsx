import "./Add-product-page-style.scss";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import ProductInformation from "../components/product-information-component";
import OptionCheckboxes from "./option-checkbox-component/option-checkbox";
import SkusComponent from "./skus-component/Skus-component";
import AddSkuModal from "../../../components/Modal/Sku/AddSku";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVariants, postProduct } from "../../../api/producer/Product-api";
import { useToasty } from "../../../context/toastify/ToastContext";

function AddProductPage() {
  const token = JSON.parse(localStorage.getItem("token"));

  // state for pass to ProductInformation component
  // and  management (title , description , images , collectionId)
  const [productInfo, setProductInfo] = useState(null);
  // state for determine selected options type
  const [selectedOptions, setSelectedOptions] = useState([]);
  // use for disable button and loading mode
  const [loading, setLoading] = useState(false);
  // state  maintain vanriants type
  const [varintType, setVariantType] = useState(null);
  // this state for show and hide sku modal
  const [skuModalShow, setSkuModalShow] = useState(false);
  // state for maintaing array of product skus
  const [skuArray, setSkuArray] = useState([]);

  const { successToast, errorToast } = useToasty();
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }
    initialVariant();
  }, []);

  // get variants type from  back and pass to (varintType state)
  const initialVariant = () => {
    getVariants()
      .then((e) => setVariantType(e))
      .catch((e) => console.log(e));
  };

  // close page
  const cancelForm = () => navigate("/producer/ims");

  // validation product fields before submit form
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
    // validate all fields
    if (validationForm()) return;

    // conver media format
    let media = [];
    productInfo.images.map((img, i) => {
      media.push({ url: img, isMain: i == 0 });
    });

    const productData = {
      title: productInfo.title,
      description: productInfo.description,
      priceUnit: "USD",
      productCollectionID: productInfo.productCollectionID,
      media: media,
      sku: skuArray,
    };

    setLoading(true);
    let result = await postProduct(productData);
    if (result == true) {
      successToast("Item added successfully");
      navigate("/producer/ims");
    } else {
      errorToast(result);
      setLoading(false);
    }
  };

  const updateSku = (newSku) => {
    let newArray = Array.from(skuArray);
    newArray.push(newSku);
    setSkuArray(newArray);
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
      {/* this component for show options and  select them */}
      {varintType && (
        <OptionCheckboxes
          variants={varintType}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          disable={skuArray.length > 0}
        />
      )}

      {/* show available skus  */}
      {skuArray.length > 0 && (
        <SkusComponent
          skusArray={skuArray}
          setSkuArray={setSkuArray}
          optionTypes={selectedOptions}
        />
      )}

      <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <BasicButton click={openSkuModal}>Add variant</BasicButton>
        </div>
      </div>

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
      {/* modal for add new sku  */}
      <AddSkuModal
        open={skuModalShow}
        close={closeSkuModal}
        optionType={selectedOptions}
        update={updateSku}
      />
    </div>
  );
}

export default AddProductPage;
