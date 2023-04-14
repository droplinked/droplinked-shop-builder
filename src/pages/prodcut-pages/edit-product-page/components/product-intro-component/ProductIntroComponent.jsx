import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../EditProductPage-style";
import { INTRO_REDUCER_TYPES } from "../../reducer/product-intro-reducer";

import InputFieldComponent from "components/shared/input-field-component/InputFieldComponent";
import InputImagesGroup from "../../../components/InputImageGroupe/Input-images-component";


// this component shows title and description and images and handle changes
const ProductIntroComponent = ({ productIntro, dispatchIntro }) => {
  const changeTitle = (e) =>
    dispatchIntro({
      type: INTRO_REDUCER_TYPES.CHANGE_TITLE,
      payload: e.target.value,
    });
  const changeDesctiption = (e) =>
    dispatchIntro({
      type: INTRO_REDUCER_TYPES.CHANGE_DESCRIPTION,
      payload: e.target.value,
    });
  const changeMedia = (images) =>
    dispatchIntro({ type: INTRO_REDUCER_TYPES.CHANGE_MEDIA, payload: images });

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

export default ProductIntroComponent;
