//import "./Product-style.scss";

import { Box, AspectRatio } from "@chakra-ui/react";
import { ProductContent, ProductImage, ProductTitle } from "./Product-style";
import { Link } from "react-router-dom";
import { USER_TYPE } from "../../../constant/user-types";

export default function Product({ title, imageUrl, id, shopname, type }) {
  let linkAddress =
    type == USER_TYPE.PRODUCER
      ? `/producer/merch/${id}`
      : `/${shopname}/merch/${id}`;

  return (
    <Box
      w="100%"
      m="0px 0px 0px 0px"
      p="10px"
      border= "1px solid transparent"
      _hover={{
        // border: "1px solid #b3b3b3",
         borderRadius:'8px',
        bgColor:'#353535',
        transition: "all 0.7s ease-out"
      }}
    >
      <Link to={linkAddress}>
        <ProductContent>
          <AspectRatio ratio={1}>
            <ProductImage src={imageUrl ? imageUrl : ""} />
          </AspectRatio>
        </ProductContent>
        <ProductTitle>{title}</ProductTitle>
      </Link>
    </Box>
  );
}
