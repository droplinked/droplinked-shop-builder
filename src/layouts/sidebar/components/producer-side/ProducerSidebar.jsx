import ProducerSidebarButton from "./ProducerSidebarButton";
import collectionIcon from "../../../../assest/icon/collection-icon.svg";
import inventoryIcon from "../../../../assest/icon/inventory-icon.svg";
import settingIcon from "../../../../assest/icon/setting-icon.svg";
import orderIcon from "../../../../assest/icon/order-icon.svg";
import logoutIcon from "../../../../assest/icon/logout-icon.svg";
import shopIcon from "../../../../assest/icon/shop-icon.svg";
import closeIcon from "../../../../assest/icon/plus-icon.svg";

import { Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSideBar } from "../../../../context/sidebar/sidebar-context";
import {
  ProducerSlideWrapper,
  SlideButton,
  SlideIcon,
  SlideText,
} from "./ProducerSidebar-style";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentShop } from "../../../../store/shop/shop.selector";
import { logoutUser } from "../../../../store/profile/profile.action";

const ProducerSidebar = () => {
  const dispatch = useDispatch();
  const shop = useSelector(selectCurrentShop);
  const { showSideBar, toggleSideBar } = useSideBar();

  let navigate = useNavigate();

  const logout = () => dispatch(logoutUser());

  const collectionClick = () => navigate("/producer/collection");
  const orderClick = () => navigate("/producer/orders");
  const settingClick = () => navigate("/settings");
  const inventoryClick = () => navigate("/producer/ims");
  const shopClick = () => navigate(`/${shop.name}`);

  const location = useLocation().pathname;

  const close = () => toggleSideBar();

  return (
    <>
      <Box
        w="auto"
        h="100%"
        mt="50px"
        display={{ base: "none", sm: "block" }}
        //  flexDirection='column'
      >
        {shop && (
          <ProducerSidebarButton
            text={"View Shop"}
            icon={shopIcon}
            click={shopClick}
            active={location == `/${shop.name}`}
          />
        )}
        <ProducerSidebarButton
          text={"Collections"}
          icon={collectionIcon}
          click={collectionClick}
          active={location == "/producer/collection"}
        />
        <ProducerSidebarButton
          text={"Inventory"}
          icon={inventoryIcon}
          click={inventoryClick}
          active={location == "/producer/ims"}
        />
        <ProducerSidebarButton
          text={"Orders"}
          icon={orderIcon}
          click={orderClick}
        />
        <ProducerSidebarButton
          text={"Settings"}
          icon={settingIcon}
          click={settingClick}
        />
        <ProducerSidebarButton
          text={"Logout"}
          icon={logoutIcon}
          click={logout}
        />
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

export default ProducerSidebar;
