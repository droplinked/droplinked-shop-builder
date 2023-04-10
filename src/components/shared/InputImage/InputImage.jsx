import { Spinner, Input, FormLabel } from "@chakra-ui/react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useRef, useState } from "react";
import { useToasty } from "../../../context/toastify/ToastContext";
import {
  InputImageWrrapper,
  InputImageContainer,
  BackGroundImage,
  BackGroundImageWrapper
} from "./InputImage-style";

import defaultProfile from "../../../assest/image/defaultProfile.png";
import axios from "axios";

export default function InputImage({ image, setImage }) {
  const [loading, setLoading] = useState(false);

  const inputFile = useRef(null);
  const { successToast, errorToast } = useToasty();

  const changeImage = (e) => {
    const file = e.target.files[0];

    if (file.size > 500000) {
      errorToast("File size exceeded (max: 500 kb)");
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
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
        setImage(e.data.original);
      })
      .catch((e) => {
        errorToast(e.response.data.message);
        setLoading(false);
        return;
      });
  };

  return (
    <InputImageWrrapper>
      <InputImageContainer>
        <Input
          id="imageUpload"
          display="none"
          type="file"
          ref={inputFile}
          onChange={changeImage}
        />
        <FormLabel
          htmlFor="imageUpload"
          display="flex"
          w="30px"
          h="30px"
          mb="0"
          borderRadius="100%"
          bgColor="#222"
          border="2px"
          borderColor="primary"
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          _hover={{ border: "4px", borderColor: "primary" }}
        >
          <MdOutlineEdit style={{ fill: "white" }} />
        </FormLabel>
      </InputImageContainer>
      {image && (
        <InputImageContainer>
          <FormLabel
            htmlFor="imageUpload"
            display="flex"
            w="30px"
            h="30px"
            mb="0"
            borderRadius="100%"
            bgColor="#222"
            border="2px"
            borderColor="#fa6653"
            cursor="pointer"
            justifyContent="center"
            alignItems="center"
            _hover={{ border: "4px", borderColor: "#fa6653" }}
            onClick={() => {
              setImage("");
            }}
          >
            <MdDeleteOutline style={{ fill: "white" }} />
          </FormLabel>
        </InputImageContainer>
      )}

      <BackGroundImageWrapper>
        <BackGroundImage
          bgImage={!image || image === "" ? defaultProfile : image}
          backgroundSize={!image || image === "" ? "50%" : "cover"}
        >
          {loading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary"
              size="xl"
            />
          )}
        </BackGroundImage>
      </BackGroundImageWrapper>
    </InputImageWrrapper>
  );
}
