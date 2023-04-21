import { useContext } from "react";
//
import { designContext } from "../../design-context";
//
import InputComponent from "../../../../component/input-component/InputComponent";

const HeaderTitleComponent = () => {
  const {
    state: { backgroundText },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <InputComponent
      label="Header title"
      placeHolder="Write a catchy title for the header"
      isRequired={true}
      change={(e) => {
        updateState("backgroundText", e.target.value);
      }}
      value={backgroundText}
    />
  );
};
export default HeaderTitleComponent;
