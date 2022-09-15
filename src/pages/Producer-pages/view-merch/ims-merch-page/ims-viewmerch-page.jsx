import { DeleteButtonWrapper } from "./ims-viewmerch-style";
import { Flex ,Box} from "@chakra-ui/react";
import { useState } from "react";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import ProductInformation from "../../components/product-information-component";
import SkusComponent from "./skus-component/skus-component";

const ImsViewMerch = ({ merch, update }) => {
  const [productInfo, setProductInfo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const optionTypes = merch.skus[0].options.map((opt) => {
    return { variantID: opt.variantID, variantName: opt.variantName };
  });

  const submitForm = () => {};

  const cancelForm = () => {};

  const openSkuModal = () => {}

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
      <SkusComponent skusArray={merch.skus} update={update} />

      <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <BasicButton click={openSkuModal}>Add variant</BasicButton>
        </div>
      </div>

      <Flex
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      mt='80px'
      >
        <Box w={{base:'40%' , md:'35%'}}>
          <BasicButton click={cancelForm} loading={loading}>
            Cancel
          </BasicButton>
        </Box>
        <Box w={{base:'40%' , md:'35%'}}>
          <BasicButton click={submitForm} loading={loading}>
            Submit
          </BasicButton>
        </Box>
      </Flex>
    </>
  );
};

export default ImsViewMerch;

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
