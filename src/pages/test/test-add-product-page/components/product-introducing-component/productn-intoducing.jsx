import { Box } from "@chakra-ui/react";
import {
  SectionWrapper,
  SectionTitle,
  Margin48px,
  Margin40px,
} from "../style/share-style";

import FormInput from "../../../../../components/shared/FormInput/FormInput";
import InputImagesGroup from "../../../../../components/shared/InputImageGroupe/Input-images-component";

const ProductIntroducing = ({ productIntro, dispatchInto }) => {
  const changeTitle = (e) =>
    dispatchInto({ type: "updateTitle", payload: e.target.value });
  const changeDesctiption = (e) =>
    dispatchInto({ type: "updateDescription", payload: e.target.value });
  const changeMedia = (images) =>
    dispatchInto({ type: "updateMedia", payload: images });

  return (
    <SectionWrapper>
      <SectionTitle>Introduction</SectionTitle>
      <Margin48px />

      <Box p="0px 24px">
        <FormInput
          label="Title"
          placeholder="Default"
          value={productIntro.title}
          changeValue={changeTitle}
        />
        <Margin40px />
        <FormInput
          label="Description"
          placeholder="Default"
          type="textarea"
          value={productIntro.description}
          changeValue={changeDesctiption}
        />
        <Margin48px />
        <InputImagesGroup setState={changeMedia} state={productIntro.media} />
      </Box>
    </SectionWrapper>
  );
};

export default ProductIntroducing;
