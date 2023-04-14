import { Box } from "@chakra-ui/react";
//
import { ComponentWrapper, ComponentTitle } from "../../AddProductPage-style"
//
import InputFieldComponent from "components/shared/input-field-component/InputFieldComponent";
import InputImagesGroup from "../../../components/InputImageGroupe/Input-images-component";

const ProductIntoComponent = ({ productIntro, dispatchIntro }) => {
  const changeTitle = (e) =>
    dispatchIntro({ type: "updateTitle", payload: e.target.value });
  const changeDesctiption = (e) =>
    dispatchIntro({ type: "updateDescription", payload: e.target.value });
  const changeMedia = (images) =>
  dispatchIntro({ type: "updateMedia", payload: images });

  return (
    <ComponentWrapper>
      <ComponentTitle>Introduction</ComponentTitle>
      <Box mb="36px" />
      <InputFieldComponent
        label="Title"
        placeholder="Default"
        value={productIntro.title}
        change={changeTitle}
      />
      <Box mb="40px" />
      <InputFieldComponent
        label="Description"
        placeholder="Default"
        textArea={true}
        value={productIntro.description}
        change={changeDesctiption}
      />
      <Box mb="36px" />
      <InputImagesGroup setState={changeMedia} state={productIntro.media} />
    </ComponentWrapper>
  );
};
export default ProductIntoComponent;
