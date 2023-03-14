import { FormControl, FormLabel, Input, Text, Box , Image } from "@chakra-ui/react";

import uploadIcon from "../../../../../../assest/icon/upload-icon.svg"

const InputImage = () => {
  return (
    <FormControl isRequired w="100%">
      <FormLabel fontWeight="500" fontSize="18px" color="#C2C2C2" mb="12px">
        Logo
      </FormLabel>
      <Text
        fontFamily="Avenir Next"
        fontWeight="500"
        fontSsize="16px"
        color="#808080"
        mb="12px"
      >
        This image will display on the left side of the store page.
      </Text>
      <Box
        w="100%"
        bg="subLayer"
        py="24px"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent='center'
        borderRadius='8px'
        cursor='pointer'
      >
        <Image src={uploadIcon} w='64px' h='64px' />
        <Box mb='24px' />
        <Text
        fontFamily="Avenir Next"
        fontWeight="400"
        fontSsize="16px"
        color="#808080"
      >
       Upload a JPEG, JPG, or PNG file as the brand logo
      </Text>
      </Box>
      {/* <Input
        placeholder={placeHolder}
        value={value}
        onChange={change}
        padding="0px 24px"
        background="subLayer"
        borderRadius="8px"
        fontWeight="500"
        fontSize="16px"
        color={color ? color : "#fff"}
        border="none"
        _focus={{
          border: "none",
        }}
        _placeholder={{
          color: "#666666",
        }}
      /> */}
    </FormControl>
  );
};

export default InputImage;
