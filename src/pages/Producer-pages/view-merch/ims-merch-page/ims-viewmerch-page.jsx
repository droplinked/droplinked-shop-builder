import { DeleteButtonWrapper } from "./ims-viewmerch-style";
import { useState } from "react";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import ProductInformation from "../../components/product-information-component";
import SkusComponent from "./skus-component/skus-component"

const ImsViewMerch = ({ merch }) => {
  const [productInfo, setProductInfo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);


 const optionTypes = merch.skus[0].options.map(opt =>{ return {variantID:opt.variantID , variantName:opt.variantName }})

  const openDeleteModal = () => setShowDeleteModal(true);
  return (
    <>
      <DeleteButtonWrapper>
        <BasicButton
          bgColor="#fa6653"
          onClick={openDeleteModal}
          loading={loading}
        >
          Delete item
        </BasicButton>
      </DeleteButtonWrapper>

      <ProductInformation
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        defaultValue={merch}
      />
      <SkusComponent  skusArray={merch.skus} merchId={merch._id} />
    </>
  );
};

export default ImsViewMerch;

//   <SkuInformation
//     skus={merch.skus}
//     merchId={merchId}
//     updateMerch={getMerch}
//   />

//   <div
//     className="d-flex justify-content-between align-items-center"
//     style={{ marginTop: "80px", width: "100%" }}
//   >
//     <div className="col-5 col-md-4">
//       <BasicButton click={cancelForm} loading={loading}>
//         Cancel
//       </BasicButton>
//     </div>
//     <div className="col-5 col-md-4">
//       <BasicButton click={submitForm} loading={loading}>
//         Submit
//       </BasicButton>
//     </div>
//   </div>

//   {deleteModal && (
//     <SmallModal
//       show={deleteModal}
//       hide={() => setDeleteModal(false)}
//       text={"Do you want to delete this item?"}
//       click={DeleteMerch}
//       loading={modalDisBtn}
//       buttonText={"Delete"}
//     />
//   )}
