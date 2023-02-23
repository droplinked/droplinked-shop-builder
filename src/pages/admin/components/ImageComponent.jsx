import { useRef, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
  const inputFile = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const changeImage = (e) => {
    const file = e.target.files[0];

    // if (file.size > 500000) {
    //   console.log("File size exceeded (max: 500 kb)");
    //   return;
    // }
    // if (
    //   file.type !== "image/jpeg" &&
    //   file.type !== "image/png" &&
    //   file.type !== "image/gif" &&
    //   file.type !== "image/jpg"
    // ) {
    //   console.log("File type not supported");
    //   return;
    // }

    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("https://cdn.droplinked.com/upload", formData)
      .then((e) => {
        setImageUrl(e.data.small);
      })
      .catch((e) => {
        return;
      });
  };

  return (
    <>
      <input
        id="imageUpload"
        display="none"
        type="file"
        ref={inputFile}
        onChange={changeImage}
      />
      <p style={{ color: "white", marginBottom: "10px" }}>Image Url</p>
      <p style={{ color: "white" }}>{imageUrl}</p>
    </>
  );
};

export default ImageComponent
