import { useContext } from "react";
import { designContext } from "../../design-context";
import AppInput from 'components/common/form/textbox/AppInput';
import { VStack } from "@chakra-ui/react";

const SectionTextComponent = () => {
  const {
    state: { productSectionText },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <VStack align="stretch" spacing="12px">
      <AppInput
        placeholder="Outfits for Summer"
        label="Products Section Text"
        onChange={(e) => {
          updateState("productSectionText", e.target.value);
        }}
        value={productSectionText}
      />
    </VStack>
  );
};
export default SectionTextComponent;
