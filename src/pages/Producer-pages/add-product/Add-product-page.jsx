import "./Add-product-page-style.scss";

import VariantItem from "../components/variant-item-component/Variant-item-component";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import CheckBox from "../../../components/shared/Checkbox/CheckBox-component";
import ProductInformation from "../components/product-information-component";
import SkuForm from "../components/sku-form-component";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVariants, postProduct } from "../../../api/producer/Product-api";
import { useToasty } from "../../../context/toastify/ToastContext";

function AddProductPage() {
  const token = JSON.parse(localStorage.getItem("token"));

  // state for pass to ProductInformation component
  // and  management (title , description , images , collectionId)
  const [productInfo, setProductInfo] = useState(null);
  // state for each of sku data for pass to SkuForm
  const [skuData, setSkuData] = useState(null);
  // state for sku list
  const [skus, setSkus] = useState([]);
  // state for eddit skus
  const [editSku, setEditSku] = useState(null);

  const [options, setOptions] = useState([]);
  //state for show and hide add variant form
  const [addvariant, setAddvariant] = useState(false);
  // loading state
  const [disbtn, setdisbtn] = useState(false);
  // state for vanriants type
  const [varintType, setVariantType] = useState(null);

  const { successToast, errorToast } = useToasty();
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }
    initializ();
  }, []);

  // initialize variantType and collectin List
  const initializ = () => {
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
    } else if (skus.length == 0) {
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
      sku: skus,
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

  // change selected options with change checkbox for options type
  const onChnageCheckBox = (e) => {
    let newOptions = [];
    if (e.target.checked) {
      newOptions = options.map((opt) => opt);
      newOptions.push({ optionName: e.target.value, optionID: e.target.id });
    } else {
      newOptions = options.filter((opt) => opt.optionID != e.target.id);
    }
    setOptions(newOptions);
  };

  // edit and delete exsiting skus
  const deleteVariant = (index) => {
    let newVariantList = [];
    for (const v of skus) newVariantList.push(v);
    newVariantList.forEach((item, i) => {
      if (i == index) newVariantList.splice(i, 1);
    });
    setSkus(newVariantList);
  };

  // select sku for edit
  const editVariant = (e, index) => {
    let newSkuList = skus.filter((currentSku, i) => i != index);
    setSkus(newSkuList);
    setEditSku(e);
  };

  // submit form for eddit sku
  const submitEditSku = () => {
    let skusArray = Array.from(skus);
    skusArray.push(editSku);
    setSkus(skusArray);
    setEditSku(null);
  };

  // add new sku to product functions and cancel
  const submitSkuForm = () => {
    let skusArray = Array.from(skus);
    skusArray.push(skuData);
    setSkus(skusArray);
    cancelSkuForm();
  };

  const cancelSkuForm = () => {
    setAddvariant(false);
  };

  
  return (
    <div className="add-product-page-wrapper">
      <div className="ims-title mb-5">Add new item</div>

      <ProductInformation
        productInfo={productInfo}
        setProductInfo={setProductInfo}
      />

      <div className="select-variant-wrap mt-4">
        <p>Choose options: </p>
        {varintType != null && (
          <>
            {varintType.map((item) => {
              return (
                <CheckBox
                  key={item._id}
                  id={item._id}
                  change={onChnageCheckBox}
                  disabled={skus.length > 0}
                >
                  {item.name}
                </CheckBox>
              );
            })}
          </>
        )}
      </div>
      <div className="mt-5 w-100">
        {skus &&
          skus.map((sku, i) => {
            return (
              <VariantItem
                key={i}
                variant={sku}
                id={i}
                deleteVariant={deleteVariant}
                editVariant={editVariant}
              />
            );
          })}
      </div>

      <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
        {/* show edit sku form or anothen component */}
        {editSku == null ? (
          <>
            {addvariant == false ? (
              // add sku form
              <div className="col-12 col-md-4">
                <BasicButton
                  click={() => {
                    setAddvariant(true);
                  }}
                >
                  Add variant
                </BasicButton>
              </div>
            ) : (
              // add sku form
              <div style={{ maxWidth: "600px", width: "100%" }}>
                <SkuForm
                  skuData={skuData}
                  setSkuData={setSkuData}
                  optionsType={options}
                  onSubmit={submitSkuForm}
                  onCancel={cancelSkuForm}
                />
              </div>
            )}
          </>
        ) : (
          // edit sku form
          <SkuForm
            skuData={editSku}
            setSkuData={setEditSku}
            optionsType={options}
            onSubmit={submitEditSku}
            onCancel={submitEditSku}
          />
        )}
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
    </div>
  );
}

export default AddProductPage;
