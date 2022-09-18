import { Box } from "@chakra-ui/react";
import { useState } from "react";

import VariantItem from "../../../components/variant-item-component/Variant-item-component";
//import SkuModal from "../sku-modal/Sku-modal";
import EditSkuModal from "../../../components/edit-sku-modal/edit-sku-modal";

//import SkuModal from "../../../../components/Modal/Sku/Sku-modal";

const SkusComponent = ({ skusArray, update }) => {
  const [editingSku, setEditingSku] = useState(null);

  const editVariant = (sku) => setEditingSku(sku);

  const closeModal = () => setEditingSku(null);

  const optionTypes = skusArray[0].options;

  return (
    <Box w="100%" mt="40px">
      {skusArray.map((sku) => {
        return (
          <VariantItem
            key={sku._id}
            variant={sku}
            id={sku._id}
            deleteVariant={() => {}}
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
    </Box>
  );
};

export default SkusComponent;

