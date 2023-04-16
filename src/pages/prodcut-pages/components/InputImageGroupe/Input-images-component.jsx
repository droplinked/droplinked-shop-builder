import axios from "axios";
import { Image, Box, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { useToasty } from "../../../../context/toastify/ToastContext";
import {
  ImagesInputWrapper,
  ItemImage,
  InputAddImage,
  DeleteIcon,
} from "./Input-images-style";

import dltImg from "../../../../assest/icon/icons8-multiply-100.png";
import uploadImage from "../../../../assest/icon/upload-icon.svg";
import LoadingComponent from "../../../../components/shared/loading-component/LoadingComponent";

export default function InputImagesGroup({ setState, state }) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const { successToast, errorToast } = useToasty();

  const openFile = () => {
    fileRef.current.click();
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 500000) {
      errorToast("File size exceeded (Max: 500 kb)");
      setLoading(false);
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/jpg"
    ) {
      errorToast("File type not supported");
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
        successToast(e.data.message);
        setLoading(false);
        return;
      })
      .catch((e) => {
        errorToast(e.response.data.message);
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
            <Text fontSize="18px" color="darkGray">
              Add 3 images here
            </Text>

            {/* <AddImageText>+ Add image</AddImageText> */}
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
