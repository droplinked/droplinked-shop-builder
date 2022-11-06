import { InputProductComponent } from "./Add-product-style";
import { AspectRatio, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const navigateToAddProduct = () => navigate("/producer/add-product");

  return (
    <Box w="100%">
      <AspectRatio ratio={1}>
        <InputProductComponent onClick={navigateToAddProduct}>
          <Text color="white" fontSize="50px" lineHeight="50px">
            +
          </Text>
          <Text color="white" fontSize="12px">
            Add product
          </Text>
        </InputProductComponent>
      </AspectRatio>
    </Box>
  );
};

export default AddProduct;
