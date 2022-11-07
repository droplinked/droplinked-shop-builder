import {
  ProducerSlideWrapper,
  SlideButton,
  SlideIcon,
  SlideText,
} from "./producer-slide-style";

import closeIcon from "../../../../../assest/icon/plus-icon.svg";
import collectionIcon from "../../../../../assest/icon/collection-icon.svg";
import inventoryIcon from "../../../../../assest/icon/inventory-icon.svg";
import settingIcon from "../../../../../assest/icon/setting-icon.svg";
import orderIcon from "../../../../../assest/icon/order-icon.svg";
import logoutIcon from "../../../../../assest/icon/logout-icon.svg";

import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../../../context/profile/ProfileContext";

const ProducerSlide = ({ close }) => {
  const { logout } = useProfile();
  let navigate = useNavigate();

  const collectionClick = () => {
    navigate("/producer/collection");
    close();
  };
  const orderClick = () => {
    navigate("/producer/orders");
    close();
  };
  const settingClick = () => {
    navigate("/settings");
    close();
  };
  const inventoryClick = () => {
    navigate("/producer/ims");
    close();
  };

  return (
    <ProducerSlideWrapper>
      <SlideButton onClick={close}>
        <SlideIcon src={closeIcon} transform="rotate(45deg)" />
        <SlideText>Close</SlideText>
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
  );
};

export default ProducerSlide;
