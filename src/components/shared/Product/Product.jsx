import { Box, AspectRatio } from "@chakra-ui/react";
import { ProductContent, ProductImage, ProductTitle } from "./Product-style";
import { Link } from "react-router-dom";
import { USER_TYPE } from "../../../constant/user-types";

export default function Product({ title, imageUrl, id, shopname, type }) {
  let linkAddress =
    type == USER_TYPE.PRODUCER
      ? `/producer/merch/${id}`
      : `/${shopname}/merch/${id}`;

  const getVideoUrl = () => {
    if (id == "635aab29783d1c18937c167f")
      return "https://res.cloudinary.com/djh0wdj3m/video/upload/v1667599059/samurai-shirt_n4nptf.mp4";
    else if (id == "635aab29783d1c18937c1680")
      return "https://upload-droplonked.s3.us-west-2.amazonaws.com/geisha-shirt-3D-sq.mp4";
    else return undefined;
  };

  const videoUrl = getVideoUrl();

  return (
    <Box
      w="100%"
      m="0px"
      p="0.3em"
      border="1px solid transparent"
      aspectRatio="1"
      _hover={{
        borderRadius: "8px",
        bgColor: "button",
        transition: "all 0.7s ease-out",
      }}
    >
      <Link to={linkAddress}>
        <ProductContent>
          {videoUrl ? (
            <video
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                minHeight: "100%",
                aspectRatio: "1/1",
              }}
              playsInline
              controlsF
              autoPlay
              loop
              muted
              controlsList="none"
              alt="All the devices"
              src={videoUrl}
            />
          ) : (
            <ProductImage src={imageUrl ? imageUrl : ""} />
          )}
        </ProductContent>
        <ProductTitle>{title}</ProductTitle>
      </Link>
    </Box>
  );
}
