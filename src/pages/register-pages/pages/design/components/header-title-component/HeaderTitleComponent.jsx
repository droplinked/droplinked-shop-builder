import { useContext } from "react";
import { designContext } from "../../design-context";
import AppInput from 'components/common/form/textbox/AppInput';

const HeaderTitleComponent = () => {
  const {
    state: { backgroundText },
    methods: { updateState },
  } = useContext(designContext);

  return (
    <AppInput
      label="Hero Text"
      placeholder="Write a catchy title for the header"
      onChange={(e) => {
        updateState("backgroundText", e.target.value);
      }}
      value={backgroundText}
    />
  );
};
export default HeaderTitleComponent;
