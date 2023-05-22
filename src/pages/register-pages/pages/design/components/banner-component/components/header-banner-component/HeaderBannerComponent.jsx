import axios from "axios";
import {
  Flex,
  FormControl,
  Button,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import AppTypography from "common/typography/AppTypography";
import FieldLabel from "common/form/fieldLabel/FieldLabel";
import { toMb } from "lib/utils/heper/helpers";
import AppErrors from "lib/utils/statics/errors/errors";
import useAppToast from "hooks/toast/useToast";

const HeaderBannerComponent = ({ addNewImage }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useAppToast()

  const fileRef = useRef(null);

  // const imageSrc = useMemo(()=>{
  //   const imageName = BANNER_DEFAULT_IMSGES.find(
  //     (element) => element.banner_src === value
  //   );
  //   return imageName?imageName.image:value
  // },[value])

  const changeImage = (e) => {
    const file = e.target.files[0];

    if (file.size > toMb({ value: 5 })) {
      showToast(AppErrors.store.header_banner_size_limit, "error");
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp" &&
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
        addNewImage(e.data.original);
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
