import ProfileButton from "./profile-button";
import collectionIcon from "../../../../assest/icon/collection-icon.svg";
import inventoryIcon from "../../../../assest/icon/inventory-icon.svg";
import settingIcon from "../../../../assest/icon/setting-icon.svg";
import orderIcon from "../../../../assest/icon/order-icon.svg";
import logoutIcon from "../../../../assest/icon/logout-icon.svg";
import shopIcon from "../../../../assest/icon/shop-icon.svg";
import closeIcon from "../../../../assest/icon/plus-icon.svg";

import { Box } from "@chakra-ui/react";
import { useNavigate, matchRoutes, useLocation } from "react-router-dom";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { useSideBar } from "../../../../context/sidebar/sidebar-context";
import {
  ProducerSlideWrapper,
  SlideButton,
  SlideIcon,
  SlideText,
} from "./profile-bar-style";

const Profilebar = () => {
  const { logout, profile } = useProfile();
  const { showSideBar, toggleSideBar } = useSideBar();

  let navigate = useNavigate();

  const collectionClick = () => navigate("/producer/collection");
  const orderClick = () => navigate("/producer/orders");
  const settingClick = () => navigate("/settings");
  const inventoryClick = () => navigate("/producer/ims");
  const shopClick = () => navigate(`/${profile.shopName}`);

  const location = useLocation().pathname;

  const close = () => toggleSideBar();

  return (
    <>
      <Box
        w="auto"
        h="100%"
        borderRight="1px solid"
        borderColor="line"
        d={{ base: "none", sm: "inline" }}
      >
        <ProfileButton
          text={"View Shop"}
          icon={shopIcon}
          click={shopClick}
          active={location == `/${profile.shopName}`}
        />
        <ProfileButton
          text={"Collections"}
          icon={collectionIcon}
          click={collectionClick}
          active={location == "/producer/collection"}
        />
        <ProfileButton
          text={"Inventory"}
          icon={inventoryIcon}
          click={inventoryClick}
          active={location == "/producer/ims"}
        />
        <ProfileButton text={"Orders"} icon={orderIcon} click={orderClick} />
        <ProfileButton
          text={"Settings"}
          icon={settingIcon}
          click={settingClick}
        />
        <ProfileButton text={"Logout"} icon={logoutIcon} click={logout} />
      </Box>
      {showSideBar && (
        <ProducerSlideWrapper>
          <SlideButton onClick={close}>
            <SlideIcon src={closeIcon} transform="rotate(45deg)" />
            <SlideText>Close</SlideText>
          </SlideButton>
          <SlideButton onClick={shopClick}>
            <SlideIcon src={shopIcon} />
            <SlideText>Shop</SlideText>
          </SlideButton>
          <SlideButton onClick={collectionClick}>
            <SlideIcon src={collectionIcon} />
            <SlideText>Collections</SlideText>
          </SlideButton>
          <SlideButton onClick={inventoryClick}>
            <SlideIcon src={inventoryIcon} />
            <SlideText>Inventory</SlideText>
          </SlideButton>
          <SlideButton onClick={orderClick}>
            <SlideIcon src={orderIcon} />
            <SlideText>Orders</SlideText>
          </SlideButton>
          <SlideButton onClick={settingClick}>
            <SlideIcon src={settingIcon} />
            <SlideText>Settings</SlideText>
          </SlideButton>
          <SlideButton onClick={logout}>
            <SlideIcon src={logoutIcon} />
            <SlideText>Logout</SlideText>
          </SlideButton>
        </ProducerSlideWrapper>
      )}
    </>
  );
};

export default Profilebar;
