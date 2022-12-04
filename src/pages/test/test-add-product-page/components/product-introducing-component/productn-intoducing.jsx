import { Box, Text } from "@chakra-ui/react";


import FormInput from "../../../../../components/shared/FormInput/FormInput";
import InputImagesGroup from "../../../../../components/shared/InputImageGroupe/Input-images-component";

const ProductIntroducing = ({productIntro , dispatchInto}) => {

  const changeTitle = (e) => dispatchInto({ type: "updateTitle", payload: e.target.value });
  const changeDesctiption = (e) => dispatchInto({ type: "updateDescription", payload: e.target.value });
  const changeMedia = (images) => dispatchInto({ type: "updateMedia", payload: images });

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Introduction
      </Text>
      <Box mb="48px"></Box>

      <Box p="0px 24px">
        <FormInput label="Title" placeholder="Default" value={productIntro.title} changeValue={changeTitle}/>
        <Box mb="40px"></Box>
        <FormInput
          label="Description"
          placeholder="Default"
          type="textarea"
          value={productIntro.description}
          changeValue={changeDesctiption}
        />
        <Box mb="48px"></Box>
        <InputImagesGroup setState={changeMedia} state={productIntro.media} />
      </Box>
    </Box>
  );
};

export default ProductIntroducing;
