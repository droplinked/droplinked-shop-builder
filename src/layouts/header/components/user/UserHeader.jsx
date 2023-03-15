import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Box,
} from "@chakra-ui/react";

import { useProfile } from "../../../../hooks/useProfile/useProfile";
import {
  UserHeaderWrapper,
  UserHeaderIcon,
  ShopnameText,
  ShopnIcon,
} from "../../Header-style";

import droplinkedIcon from "../../../../assest/image/green-droplinked-logo.svg";
import shopIconSvg from "../../../../assest/icon/shop-green-icon.svg";

const UserHeader = () => {

  const { shop , logoutUser} = useProfile();

  return (
    <UserHeaderWrapper>
      <UserHeaderIcon src={droplinkedIcon} />

      <Popover>
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
            >
              View Shop
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
            >
              Logout
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </UserHeaderWrapper>
  );
};

export default UserHeader;
