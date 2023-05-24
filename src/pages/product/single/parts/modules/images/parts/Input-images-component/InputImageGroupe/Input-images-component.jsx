import axios from "axios";
import { Image, Box, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  ImagesInputWrapper,
  ItemImage,
  InputAddImage,
  DeleteIcon,
} from "./Input-images-style";
import dltImg from "assest/icon/icons8-multiply-100.png";
import uploadImage from "assest/icon/upload-icon.svg";
import LoadingComponent from "common/loading-component/LoadingComponent";
import AppErrors from "lib/utils/statics/errors/errors";
import useAppToast from "hooks/toast/useToast";
import { toMb } from "lib/utils/heper/helpers";

export default function InputImagesGroup({ setState, state }) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const { showToast } = useAppToast()

  const openFile = () => {
    fileRef.current.click();
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (file.size > toMb({ value: 5 })) {
      showToast(AppErrors.store.size_limit({ fieldName: "Product", size: "5MB" }), "error");
      setLoading(false);
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      showToast(AppErrors.product.product_image_type_not_supported, "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    axios
      .post("https://cdn.droplinked.com/upload", formData)
      .then((e) => {
        let imgArr = [];
        for (let i = 0; i < state.length; i++) {
          imgArr.push(state[i]);
        }
        imgArr.push(e.data.standard);
        setState(imgArr);
        showToast(e.data.message, "success");
        setLoading(false);
        return;
      })
      .catch((e) => {
        showToast(e.response.data.message, "error");
        setLoading(false);
        return;
      });
  };

  const deleteImg = (e) => {
    let newArr = state.filter((url) => url != e);
    setState(newArr);
  };

  return (
    <ImagesInputWrapper>
      <ItemImage>
        {loading === true ? (
          <InputAddImage>
            <LoadingComponent />
          </InputAddImage>
        ) : (
          <InputAddImage onClick={openFile}>
            <Image src={uploadImage} w="50px" h="50px" />
            <Box mb="24px"></Box>
            <Text fontSize="18px" textAlign="center" color="darkGray">
              Please upload JPG, JPEG, PNG or GIF
            </Text>
          </InputAddImage>
        )}
      </ItemImage>
      {state.map((items, i) => {
        return (
          <ItemImage id={i} key={i}>
            <DeleteIcon
              src={dltImg}
              alt="delete"
              onClick={() => deleteImg(items)}
            />
            <Image w="100%" h="100%" borderRadius="8px" src={items} />
          </ItemImage>
        );
      })}

      <input
        type="file"
        className="d-none"
        ref={fileRef}
        onChange={changeImage}
      />
    </ImagesInputWrapper>
  );
}
