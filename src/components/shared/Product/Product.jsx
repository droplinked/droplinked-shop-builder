import "./Product-style.scss";

import { Box, AspectRatio } from "@chakra-ui/react";
import { ProductContent, ProductImage, ProductTitle } from "./Product-style";
import { Link } from "react-router-dom";

export default function Product({ title, imageUrl, id, shopname }) {
  return (
    <Box w="100%" m="0px 0px 10px 0px" p="5px" >
      <Link to={`/${shopname}/merch/${id}`}>
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

