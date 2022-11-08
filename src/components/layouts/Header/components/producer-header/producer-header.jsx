import {
  ShopnameText,
  ProfileIconWrapper,
  ProfileChar,
  BurgerIcon,
} from "./producer-header-style";
import { useShop } from "../../../../../context/shop/ShopContext";
import { useState } from "react";
import { Box } from "@chakra-ui/react";


import ProducerSlide from "../../dropdowns/producer-slide/producer-slide";
import burgerIcon from "../../../../../assest/icon/burger-icon.svg";

const ProducerHeader = () => {

    const { shop } = useShop();

    const [openslide, setOpenSlide] = useState(false);
 
    const toggleSlide = () => setOpenSlide((p) => !p);
    

  return (
    <>
      {shop && (
        <Box d={{ base: "none", sm: "flex" }} alignItems="center">
          <ShopnameText>{shop.name}</ShopnameText>
          <ProfileIconWrapper>
            <ProfileChar>{shop.name.charAt(0).toUpperCase()}</ProfileChar>
          </ProfileIconWrapper>
        </Box>
      )}
      <BurgerIcon src={burgerIcon} onClick={toggleSlide} />
      {openslide && <ProducerSlide close={toggleSlide} />}
    </>
  );
};

export default ProducerHeader;
