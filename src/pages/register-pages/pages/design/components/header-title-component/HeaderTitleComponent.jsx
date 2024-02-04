import { useContext } from "react";
import { designContext } from "../../design-context";
import AppInput from 'components/common/form/textbox/AppInput';
import { VStack } from "@chakra-ui/react";
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";
import AppTypography from "components/common/typography/AppTypography";

const HeaderTitleComponent = () => {
  const {
    state: { backgroundText },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <VStack align="stretch">
      <VStack align="stretch" spacing={1}>
        <AppTypography size="16px">Hero Text</AppTypography>
        <AppTypography size="14px" color="#808080" marginTop={1}>Write a catchy text about your store.</AppTypography>
      </VStack>
      <AppInput
        placeholder="Be Smart, Get Comfy"
        onChange={(e) => {
          updateState("backgroundText", e.target.value);
        }}
        value={backgroundText}
      />
    </VStack>
  );
};
export default HeaderTitleComponent;
