import { Flex } from "@chakra-ui/react";

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
  const { shop } = useProfile();

  return (
    <UserHeaderWrapper>
      <UserHeaderIcon src={droplinkedIcon} />
      <Flex alignItems="center" gap="12px">
        <ShopnameText>{shop.name}</ShopnameText>
        <ShopnIcon src={shopIconSvg} />
      </Flex>
    </UserHeaderWrapper>
  );
};

export default UserHeader;
