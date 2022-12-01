import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

import FormInput from "../../../components/shared/FormInput/FormInput";
import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component";

const ProductIntroducing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);


  const changeTitle = (e) => setTitle(e.target.value)
  const changeDesctiption = () => setDescription(e.target.value)

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Introduction
      </Text>
      <Box mb="48px"></Box>

      <Box p="0px 24px">
        <FormInput label="Title" placeholder="Default" value={title} changeValue={changeTitle}/>
        <Box mb="40px"></Box>
        <FormInput
          label="Description"
          placeholder="Default"
          type="textarea"
          value={description}
          changeValue={changeDesctiption}
        />
        <Box mb="48px"></Box>
        <InputImagesGroup setState={setImages} state={images} />
      </Box>
    </Box>
  );
};

export default ProductIntroducing;
