import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../../hooks/useProfile/useProfile";
import { IconComponent, IconWrapper } from "./Sidebar-style";

//icons
import ProductsIcon from "../../assest/icon/products-icon.svg";
import collectionIcon from "../../assest/icon/collection-icon.svg";
import settingIcon from "../../assest/icon/setting-icon.svg";
import orderIcon from "../../assest/icon/order-icon.svg";
import informationIcon from "../../assest/icon/information-icon.svg";
import rulesetsIcon from "../../assest/icon/rulesets-icon.svg";

import OptionComponent from "./components/option-component/OptionComponent";

const Sidebar = () => {
  const navigate = useNavigate();
  const { shop } = useProfile();

  const clickOnProductIcon = () => navigate(`/${shop.name}/products`);

  return (
    <Flex w="100%" h="100%" minH="100%" flexDir="column" gap="18px">
      <OptionComponent icon={ProductsIcon} label="products" onClick={clickOnProductIcon}/>
      <OptionComponent icon={collectionIcon} label="collections" />
      <OptionComponent icon={rulesetsIcon} label="ruleset" />
      <OptionComponent icon={orderIcon} label="orders" />
      <OptionComponent icon={informationIcon} label="informations" />
      <OptionComponent icon={settingIcon} label="setting" />
    </Flex>
  );
};

export default Sidebar;
