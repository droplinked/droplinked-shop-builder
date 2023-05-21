import { useContext } from "react";
//
import { designContext } from "../../design-context";
//
import InputComponent from "../../../../component/input-component/InputComponent";
import AppInput from "common/form/textbox/AppInput";

const HeaderTitleComponent = () => {
  const {
    state: { backgroundText },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <AppInput
      label="Header title"
      placeholder="Write a catchy title for the header"
      isRequired
      onChange={(e) => {
        updateState("backgroundText", e.target.value);
      }}
      value={backgroundText}
    />
  );
};
export default HeaderTitleComponent;
