import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../EditProductPage-style";
import { INTRO_REDUCER_TYPES } from "../../reducer/product-intro-reducer";

import FormInput from "../../../../../components/shared/FormInput/FormInput";
import InputImagesGroup from "../../../../../components/shared/InputImageGroupe/Input-images-component";

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
      <FormInput
        label="Title"
        placeholder="Default"
        value={productIntro.title}
        changeValue={changeTitle}
      />
      <Box mb="40px" />
      <FormInput
        label="Description"
        placeholder="Default"
        type="textarea"
        value={productIntro.description}
        changeValue={changeDesctiption}
      />
      <Box mb="36px" />
      <InputImagesGroup setState={changeMedia} state={productIntro.media} />
    </ComponentWrapper>
  );
};

export default ProductIntroComponent;
