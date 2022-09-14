

import VariantItem from "../../components/variant-item-component/Variant-item-component";

const SkusComponent = ({ skusArray, setSkuArray }) => {


  // edit and delete exsiting skus
  const deleteVariant = (index) => {
    let newVariantList = [];
    for (const v of skusArray) newVariantList.push(v);
    newVariantList = newVariantList.filter((item, i) => i != index);
    setSkuArray(newVariantList);
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
              editVariant={()=>{}}
            />
          );
        })}
    </div>
  );
};

export default SkusComponent;
