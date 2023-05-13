import axios from "axios";

import { useRef, useState, useMemo } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Image,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useToasty } from "../../../../../../context/toastify/ToastContext";


import uploadIcon from "../../../../../../assest/icon/upload-icon.svg";
import AppTypography from "components/shared/typography/AppTypography";
import FieldLabel from "components/shared/form/fieldLabel/FieldLabel";

const InputImage = ({ label, placeHolder, change, value }) => {
  const [loading, setLoading] = useState(false);


  const fileRef = useRef(null);
  const { successToast, errorToast } = useToasty();

  const changeImage = (e) => {
    const file = e.target.files[0];

    // if (file.size > 500000) {
    //   errorToast("File size exceeded (max: 500 kb)");
    //   return;
    // }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/svg+xml" &&
      file.type !== "image/jpg"
    ) {
      errorToast("File type not supported");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    axios
      .post("https://cdn.droplinked.com/upload", formData)
      .then((e) => {
        setLoading(false);
        successToast("The image uploaded");
        change(e.data.original);
      })
      .catch((e) => {
        errorToast(e.response.data.message);
        setLoading(false);
        return;
      });
  };

  const openFile = () => {
    fileRef.current.click();
  };

  return (
    <FormControl isRequired w="100%">
      <FieldLabel isRequired label={label} color={"#C2C2C2"} />
      <AppTypography fontSize="14px" color="#808080" margin={"5px 0"}>{placeHolder}</AppTypography>

      {value ? (
        <Flex
          w="100%"
          h="200px"
          maxH="200px"
          justifyContent="center"
          alignItems="center"
          borderRadius="8px"
          bg="subLayer"
        >
          <Image w="auto" maxH="100%" h="auto" onClick={openFile} src={value} />
        </Flex>
      ) : (
        <Box
          w="100%"
          bg="subLayer"
          py="24px"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
          cursor="pointer"
          onClick={openFile}
        >
          {loading ? (
            <Box p="30px">
              <Spinner color="white" />
            </Box>
          ) : (
            <>
              <Image src={uploadIcon} w="64px" h="64px" />
              <Box mb="24px" />
              <Text
                fontFamily="Avenir Next"
                fontWeight="400"
                fontSize="16px"
                color="#808080"
              >
                Upload a JPEG, JPG, or PNG file as the brand logo
              </Text>
            </>
          )}
        </Box>
      )}

      <Input display="none" type="file" ref={fileRef} onChange={changeImage} />
    </FormControl>
  );
};

export default InputImage;
