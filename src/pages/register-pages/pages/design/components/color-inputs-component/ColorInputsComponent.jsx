import { Flex, Box } from "@chakra-ui/react";
import { useContext } from "react";

import { designContext } from "../../design-context";

import InputColor from "./InputColor";

const ColorInputsComponent = () => {
  const {
    state: { backgroundColor, textColor },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      gap="24px"
    >
      <Box w="50%">
        <InputColor
          value={textColor}
          change={(value) => {
            updateState("textColor", value);
          }}
          label="Text color"
        />
      </Box>

      {/* <Box w="50%">
        <InputColor
          value={backgroundColor}
          change={(value) => {
            updateState("backgroundColor", value);
          }}
          label="Color background"
        />
      </Box> */}
    </Flex>
  );
};

export default ColorInputsComponent;
