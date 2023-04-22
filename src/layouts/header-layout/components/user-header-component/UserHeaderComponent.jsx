import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Box,
  useDisclosure 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
//
import { useProfile } from "hooks/useProfile/useProfile";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import {
  UserHeaderWrapper,
  UserHeaderIcon,
  ShopnameText,
  ShopnIcon,
} from "../../HeaderLayout-style";
//
import droplinkedIcon from "assest/image/green-droplinked-logo.svg";
import shopIconSvg from "assest/icon/shop-green-icon.svg";

const UserHeaderComponent = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { shop, logoutUser } = useProfile();
  const { shopNavigate } = useCustomNavigate();

  const clickOnViewShop = () => {
    shopNavigate('products')
    onClose()
  }

  return (
    <UserHeaderWrapper>
      <Link to='/'>
      <UserHeaderIcon src={droplinkedIcon} />
      </Link>
      <Popover
       isOpen={isOpen}
       onOpen={onOpen}
       onClose={onClose}
      >
        <PopoverTrigger>
          <Flex alignItems="center" gap="12px" cursor="pointer">
            <ShopnameText>{shop.name}</ShopnameText>
            <ShopnIcon src={shopIconSvg} />
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          bg="#292929"
          borderRadius="8px"
          p="16px 36px"
          h="auto"
          w="auto"
          border="0px"
          outline="none"
          shadow="none"
        >
          <PopoverBody>
            <Text
              fontFamily="Avenir Next"
              fontStyle="normal"
              fontWeight="500"
              fontSize="14px"
              color="#FFFFFF"
              w="100%"
              textAlign="center"
              onClick={clickOnViewShop}
              cursor='pointer'
            >
              Dashboard
            </Text>
            <Box mb="20px" />
            <Text
              fontFamily="Avenir Next"
              fontStyle="normal"
              fontWeight="500"
              fontSize="14px"
              color="#FFFFFF"
              w="100%"
              textAlign="center"
              cursor="pointer"
              onClick={logoutUser}
              cursor='pointer'
            >
              Logout
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </UserHeaderWrapper>
  );
};

export default UserHeaderComponent;
