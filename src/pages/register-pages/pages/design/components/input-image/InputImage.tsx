import axios from "axios";
import { useRef, useState } from "react";
import {
  FormControl,
  Input,
  Text,
  Box,
  Image,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import uploadIcon from "../../../../../../assest/icon/upload-icon.svg";
import AppTypography from "common/typography/AppTypography";
import FieldLabel from "common/form/fieldLabel/FieldLabel";
import AppErrors from "lib/utils/statics/errors/errors";
import React from "react";
import { Isize_limit } from "lib/utils/statics/errors/modules/store";
import { toMb } from "lib/utils/heper/helpers";
import useAppToast from "hooks/toast/useToast";

interface IProps {
  label?: string
  placeHolder?: string
  change: Function
  value?: string
  maxSize?: Isize_limit
}

const InputImage = ({ label, placeHolder, change, value, maxSize }: IProps) => {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const { showToast } = useAppToast()

  const changeImage = (e: any) => {
    const file = e.target.files[0];
    if (maxSize && file.size > toMb({ value: parseInt(maxSize.size) })) return showToast(AppErrors.store.size_limit({ fieldName: maxSize.fieldName, size: `${maxSize.size}MB` }), "error");
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/svg+xml" &&
      file.type !== "image/jpg"
    ) {
      showToast(AppErrors.product.product_image_type_not_supported, "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    axios
      .post("https://cdn.droplinked.com/upload", formData)
      .then((e) => {
        setLoading(false);
        showToast("The image uploaded", "success");
        change(e.data.original);
      })
      .catch((e) => {
        showToast(e.response.data.message, "error");
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
      <AppTypography size="14px" color="#808080" margin={"5px 0"}>{placeHolder}</AppTypography>

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
          padding={6}
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
