import { Box } from "@chakra-ui/react";
import { useState } from "react";

import VariantItem from "../../../components/variant-item-component/Variant-item-component";
import SkuModal from "../sku-modal/Sku-modal";
//import SkuModal from "../../../../components/Modal/Sku/Sku-modal";

const SkusComponent = ({ skusArray, merchId }) => {
  const [editingSku, setEditingSku] = useState(null);

  const editVariant = (sku) => setEditingSku(sku);

  const closeModal = () => setEditingSku(null);

 // console.log(skusArray);
 // console.log(optionTypes);

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
      {editingSku && <SkuModal open={editingSku != null} close={closeModal} merchId={merchId} sku={editingSku}/>}
    </Box>
  );
};

export default SkusComponent;

{
  /* <div className="mt-5 w-100">
      {skusArray &&
        skusArray.map((sku, i) => {
          return (
            <VariantItem
              key={i}
              variant={sku}
              id={i}
              deleteVariant={() => deleteVariant(i)}
              editVariant={() => editVariant(sku, i)}
            />
          );
        })}
      {editingVariant && (
        <SkuModal
          open={editingVariant != null}
          close={closeModal}
          optionTypes={optionTypes}
          skuArray={skusArray}
          setSkuArray={setSkuArray}
          defaultValue={editingVariant}
        />
      )}
    </div> */
}
