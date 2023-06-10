import axios from "axios";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  ImagesInputWrapper,
  ItemImage,
  InputAddImage,
  DeleteIcon,
} from "./Input-images-style";
import dltImg from "assest/icon/icons8-multiply-100.png";
import uploadImage from "assest/icon/upload-icon.svg";
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import AppErrors from "lib/utils/statics/errors/errors";
import useAppToast from "functions/hooks/toast/useToast";
import { toMb } from "lib/utils/heper/helpers";

interface IProps {
  setState: any
  state: any
  vertical?: boolean
}

export default function InputImagesGroup({ setState, state, vertical }: IProps) {
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
      <ItemImage {...vertical ? { width: "auto", height: "auto", bg: "subLayer", padding: "15px" } : { style: { aspectRatio: "1 / 1", } }}>
        {loading === true ? (
          <InputAddImage>
            <LoadingComponent />
          </InputAddImage>
        ) : vertical ? (
          <Flex gap={3} onClick={openFile} alignItems="center">
            <Image src={uploadImage} w="24px" h="24px" />
            <Text fontSize="14px" textAlign="center" color="darkGray">
              Upload JPG, JPEG, PNG (Max 5 MB)
            </Text>
          </Flex>
        ) : (
          <InputAddImage onClick={openFile}>
            <Image src={uploadImage} w="50px" h="50px" />
            <Box mb="24px"></Box>
            <Text fontSize="14px" textAlign="center" color="darkGray">
              Upload JPG, JPEG, PNG<br />(Max 5 MB)
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
