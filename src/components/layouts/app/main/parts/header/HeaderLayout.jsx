import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import {
  UserHeaderWrapper,
  UserHeaderIcon,
  ShopnameText,
} from "./HeaderLayout-style";
import droplinkedIcon from "assest/image/green-droplinked-logo.svg";
import HeaderLogin from "./parts/login/HeaderLogin";
import { useCallback } from "react";
import AppIcons from "assest/icon/Appicons";
import useHookStore from "functions/hooks/store/useHookStore";
import { useProfile } from "functions/hooks/useProfile/useProfile";

const HeaderLayout = () => {
  const { app: { shop } } = useHookStore();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { shopNavigate } = useCustomNavigate();
  const { logoutUser } = useProfile()

  // Redirect dashboard
  const clickOnViewShop = useCallback(() => {
    shopNavigate("products");
    onClose();
  }, []);

  // Logout
  const logout = useCallback(() => {
    logoutUser()
    onClose();
  });

  return (
    <UserHeaderWrapper>
      <Link to={`${shop?.name}/c/products`}>
        <UserHeaderIcon src={droplinkedIcon} />
      </Link>
      {shop ? (
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          variant="unstyle"
        >
          <PopoverTrigger>
            <Flex alignItems="center" gap="12px" cursor="pointer">
              <ShopnameText>{shop?.name}</ShopnameText>
              <AppIcons.shopIcon />
            </Flex>
          </PopoverTrigger>
          <PopoverContent
            bg="#292929"
            variant="unstyle"
            borderRadius="8px"
            p="16px 36px"
            h="auto"
            w="auto"
            border="none !important"
            outline="none !important"
            shadow="none !important"
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
                cursor="pointer"
              >
                Dashboard
              </Text>
              <Box mb="20px" />
              <a
                href={`https://droplinked.io/${shop?.name}`}
                onClick={onClose}
                target="_blank"
              >
                <Text
                  fontFamily="Avenir Next"
                  fontStyle="normal"
                  fontWeight="500"
                  fontSize="14px"
                  color="#FFFFFF"
                  w="100%"
                  textAlign="center"
                  cursor="pointer"
                >
                  View Store
                </Text>
              </a>
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
                onClick={logout}
              >
                Logout
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <HeaderLogin />
      )}
    </UserHeaderWrapper>
  );
};

export default HeaderLayout;
