import axios from "axios";

import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
//
import { useToasty } from "context/toastify/ToastContext";
import AppTypography from "components/shared/typography/AppTypography";
import FieldLabel from "components/shared/form/fieldLabel/FieldLabel";

const HeaderBannerComponent = ({ addNewImage }) => {
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  const { successToast, errorToast } = useToasty();

  // const imageSrc = useMemo(()=>{
  //   const imageName = BANNER_DEFAULT_IMSGES.find(
  //     (element) => element.banner_src === value
  //   );
  //   return imageName?imageName.image:value
  // },[value])

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
      file.type !== "image/webp" &&
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
        addNewImage(e.data.original);
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
    <Flex w="100%" justifyContent="space-between" alignItems="center">
      <FormControl isRequired w="100%" marginBottom={3}>
        <FieldLabel color="#C2C2C2" label="Header banner" isRequired />
        <AppTypography size="14px" color="#C2C2C2" marginTop={1}>This image will display at the top of the store page.</AppTypography>
      </FormControl>
      <Button
        bg="transparent"
        padding="12px 24px"
        border="2px solid #292929"
        color="#C2C2C2"
        fontFamily="Avenir Next"
        fontWeight="500"
        fontSize="12px"
        disabled={loading}
        onClick={openFile}
      >
        {loading ? <Spinner color="white" /> : "Upload Banner"}
      </Button>
      <Input display="none" type="file" ref={fileRef} onChange={changeImage} />
    </Flex>
  );
};

export default HeaderBannerComponent;
