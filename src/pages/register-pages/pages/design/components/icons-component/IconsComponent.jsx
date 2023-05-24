import { Flex } from "@chakra-ui/react";
import { toMb } from "lib/utils/heper/helpers";
import { useContext } from "react";
//
import { designContext } from "../../design-context";
//
import InputImage from "../input-image/InputImage";

const IconsComponent = () => {
  const {
    state: { logo, headerIcon },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <Flex
      w="100%"
      alignItems="baseline"
      justifyContent="space-between"
      gap="24px"
    >
      <InputImage
        label="Logo"
        placeHolder="This image will display on the left side of the store page."
        value={logo}
        change={(value) => updateState("logo", value)}
        maxSize={{
          fieldName: "Size",
          size: 5
        }}
      />

      <InputImage
        label="Header logo"
        placeHolder="This image will display at the upper left corner of the store page."
        value={headerIcon}
        change={(value) => updateState("headerIcon", value)}
      />
    </Flex>
  );
};

export default IconsComponent;
