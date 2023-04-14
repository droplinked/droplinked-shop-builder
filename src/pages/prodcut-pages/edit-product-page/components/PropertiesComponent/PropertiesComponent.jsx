import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../EditProductPage-style";
//
import BasicButton from "components/shared/BasicButton/BasicButton";
import OptionFormComponent from "./OptionFormComponent";

// this component handles options types and values
const PropertiesComponent = ({ OptionList, setOptionList }) => {
  const [variantsType, setVariantType] = useState(null);

  //const { getApi } = useApi();

  useEffect(async () => {
    // let result = await getApi(getVariants());
    // if (result) setVariantType(result.variants);
    setVariantType([
      ({
        _id: "62a989ab1f2c2bbc5b1e7153",
        name: "Color",
      },
      {
        _id: "62a989e21f2c2bbc5b1e7154",
        name: "Size",
      }),
    ]);
  }, []);

  const addNewOption = () => {
    let currentOption = Array.from(OptionList);
    currentOption.push({
      optionId: "",
      optionName: "",
      values: [],
      index: OptionList.length + 1,
    });
    setOptionList(currentOption);
  };

  if (variantsType == null) return null;

  return (
    <ComponentWrapper>
      <ComponentTitle>Properties</ComponentTitle>
      <Box mb="36px" />

      {OptionList?.map((option) => {
        return (
          <OptionFormComponent
            key={option.index}
            option={option}
            OptionList={OptionList}
            setOptionList={setOptionList}
            variantsType={variantsType}
          />
        );
      })}

      {OptionList?.length < 2 && (
        <BasicButton click={addNewOption} cancelType={true} mt={4}>
          Make new properties
        </BasicButton>
      )}
    </ComponentWrapper>
  );
};

export default PropertiesComponent;
