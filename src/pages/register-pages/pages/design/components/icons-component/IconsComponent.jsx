import { Flex } from "@chakra-ui/react";
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
        label="Site logo"
        placeHolder="Site logo appears at the top left of the page."
        value={logo}
        change={(value) => updateState("logo", value)}
        maxSize={{
          fieldName: "Size",
          size: 5
        }}
      />

      <InputImage
        label="Profile logo"
        placeHolder="Profile logo appears at the left side of the page."
        value={headerIcon}
        change={(value) => updateState("headerIcon", value)}
        maxSize={{
          fieldName: "Size",
          size: 5
        }}
      />
    </Flex>
  );
};

export default IconsComponent;
