import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { deleteSku } from "../../../../../api/producer/Product-api";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import VariantItem from "../../../components/variant-item-component/Variant-item-component";
import EditSkuModal from "../../../../../components/Modal/Sku/EditSku";
import SmallModal from "../../../../../components/Modal/Small-modal/Small-modal-component";

const SkusComponent = ({ skusArray, update }) => {

  const [editingSku, setEditingSku] = useState(null);
  const [deleteSkuModal, setDeleteSkuModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToasty();

  const editVariant = (sku) => setEditingSku(sku);
  const closeModal = () => setEditingSku(null);

  const openDeleteModal = (skuID) => setDeleteSkuModal(skuID);
  const closeDeleteModal = () => setDeleteSkuModal(null);

  const optionTypes = skusArray[0].options;

  const DeleteSku = async () => {
    setLoading(true);
    let result = await deleteSku(deleteSkuModal);
    if (result == true) {
      update();
      successToast("Sku deleted successfully");
    } else {
      errorToast(result);
    }
    closeDeleteModal();
    setLoading(false);
  };

  return (
    <Box w="100%" mt="40px">
      {skusArray.map((sku) => {
        return (
          <VariantItem
            key={sku._id}
            variant={sku}
            id={sku._id}
            deleteVariant={() => openDeleteModal(sku._id)}
            editVariant={() => editVariant(sku)}
          />
        );
      })}
      {/* {editingSku && <SkuModal open={editingSku != null} close={closeModal} update={update} sku={editingSku}/>} */}
      {editingSku && (
        <EditSkuModal
          open={editingSku != null}
          close={closeModal}
          optionTypes={optionTypes}
          defaultValue={editingSku}
          update={update}
        />
      )}
      {deleteSkuModal && (
        <SmallModal
          show={deleteSkuModal}
          hide={closeDeleteModal}
          text={"Do you want to delete this sku?"}
          click={DeleteSku}
          loading={loading}
          buttonText={"Delete"}
        />
      )}
    </Box>
  );
};

export default SkusComponent;
