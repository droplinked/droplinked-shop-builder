
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
      m="0px"
      p="0.3em"
      border= "1px solid transparent"
      aspectRatio='1'
      _hover={{
         borderRadius:'8px',
        bgColor:'button',
        transition: "all 0.7s ease-out"
      }}
    >
      <Link to={linkAddress}>
        <ProductContent>
          
            <ProductImage src={imageUrl ? imageUrl : ""} />
        
        </ProductContent>
        <ProductTitle>{title}</ProductTitle>
      </Link>
    </Box>
      
  );
}
