import { Flex } from "@chakra-ui/react";

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
  return (
    <Flex w="100%" h='100%' minH='100%' flexDir='column' gap='18px' >
      <OptionComponent icon={ProductsIcon} />
      <OptionComponent icon={collectionIcon} />
      <OptionComponent icon={rulesetsIcon} />
      <OptionComponent icon={orderIcon} />
      <OptionComponent icon={informationIcon} />
      <OptionComponent icon={settingIcon} />
      {/* <IconWrapper>
        <IconComponent src={ProductsIcon} />
      </IconWrapper> */}
      {/* <IconWrapper>
        <IconComponent src={collectionIcon} />
      </IconWrapper>
      <IconWrapper>
        <IconComponent src={rulesetsIcon} />
      </IconWrapper>
      <IconWrapper>
        <IconComponent src={orderIcon} />
      </IconWrapper>
      <IconWrapper>
        <IconComponent src={informationIcon} />
      </IconWrapper>
      <IconWrapper>
        <IconComponent src={settingIcon} />
      </IconWrapper> */}
    </Flex>
  );
};

export default Sidebar;
