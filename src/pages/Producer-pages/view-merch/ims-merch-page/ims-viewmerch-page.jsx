import { DeleteButtonWrapper } from "./ims-viewmerch-style";
import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { updateMerch, deleteMerch } from "../../../../api/producer/Product-api";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import ProductInformation from "../../components/product-information-component";
import SmallModal from "../../../../components/Modal/Small-modal/Small-modal-component";
import SkusComponent from "./skus-component/skus-component";
import AddSkuModal from "../../../../components/Modal/Sku/AddSku";

const ImsViewMerch = ({ merch, update }) => {
  const [productInfo, setProductInfo] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [addSkuModal, setAddSkuModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { successToast, errorToast } = useToasty();
  const navigate = useNavigate();

  const optionTypes = merch.skus[0].options.map((opt) => {
    return { variantID: opt.variantID, variantName: opt.variantName };
  });
console.log(merch)
console.log(optionTypes)
  const cancelForm = () =>  navigate("/producer/ims");

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const openAddSkuModal = () => setAddSkuModal(true);
  const closeAddSkuModal = () => setAddSkuModal(false);

  // update prodcut
  const submitForm = async () => {
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
    let result = await updateMerch(merch._id, product);
    if (result == true) {
      successToast("Item successfully updated");
      navigate("/producer/ims");
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  const DeleteMerch = async () => {
    setLoading(true);

    let result = await deleteMerch(merch._id);

    if (result == true) {
      successToast("Merch deleted successfully");
      navigate("/producer/ims");
    } else {
      errorToast(result);
      setDeleteModal(false);
    }
    setLoading(false);
  };

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
          <BasicButton click={openAddSkuModal}>Add variant</BasicButton>
        </div>
      </div>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mt="80px"
      >
        <Box w={{ base: "40%", md: "35%" }}>
          <BasicButton click={cancelForm} loading={loading}>
            Cancel
          </BasicButton>
        </Box>
        <Box w={{ base: "40%", md: "35%" }}>
          <BasicButton click={submitForm} loading={loading}>
            Submit
          </BasicButton>
        </Box>
      </Flex>
      {deleteModal && (
        <SmallModal
          show={deleteModal}
          hide={closeDeleteModal}
          text={"Do you want to delete this item?"}
          click={DeleteMerch}
          loading={loading}
          buttonText={"Delete"}
        />
      )}
      {addSkuModal && (
        <AddSkuModal
          open={addSkuModal}
          close={closeAddSkuModal}
          optionType={optionTypes}
          update={update}
          merchId={merch._id}
        />
      )}
    </>
  );
};

export default ImsViewMerch;
