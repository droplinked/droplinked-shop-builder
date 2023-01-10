import {
  ShopnameText,
  ProfileIconWrapper,
  ProfileChar,
} from "./ProducerHeader-style";
import { useShop } from "../../../../context/shop/ShopContext";

import { Box } from "@chakra-ui/react";

import Notification from "../notification/Notification";


const ProducerHeader = () => {
  const { shop } = useShop();


  return (
    <>
      <Notification />
      {shop && (
        <Box d={{ base: "none", sm: "flex" }} alignItems="center">
          <ShopnameText>{shop.name}</ShopnameText>
          <ProfileIconWrapper>
            <ProfileChar>{shop.name.charAt(0).toUpperCase()}</ProfileChar>
          </ProfileIconWrapper>
        </Box>
      )}
    </>
  );
};

export default ProducerHeader;
