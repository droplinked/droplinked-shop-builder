import { useState } from "react";

import VariantItem from "../../components/variant-item-component/Variant-item-component";
import EditSkuModal from "../../../../modals/edit-sku/EditSkuModal";

const SkusComponent = ({ skusArray, setSkuArray, optionTypes }) => {
  const [editingVariant, setEditingVariant] = useState(false);

  // edit and delete exsiting skus
  const deleteVariant = (index) => {
    let newVariantList = [];
    for (const v of skusArray) newVariantList.push(v);
    newVariantList = newVariantList.filter((item, i) => i != index);
    setSkuArray(newVariantList);
  };

  const editVariant = (variant, index) => {
    setEditingVariant({ ...variant, index: index });
  };

  const closeModal = () => setEditingVariant(false);

  const updateSku = (skuObject, index) => {
    let newArray = skusArray.map((sku, i) => {
      if (i == index) return skuObject;
      else return sku;
    });

    setSkuArray(newArray);
  };

  return (
    <div className="mt-5 w-100">
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

      <EditSkuModal
        show={editingVariant}
        close={closeModal}
        optionTypes={optionTypes}
        defaultValue={editingVariant}
        update={updateSku}
      />
    </div>
  );
};

export default SkusComponent;
