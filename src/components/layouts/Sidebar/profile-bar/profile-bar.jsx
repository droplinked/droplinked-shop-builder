import ProfileButton from "./profile-button";
import collectionIcon from "../../../../assest/icon/collection-icon.svg";
import inventoryIcon from "../../../../assest/icon/inventory-icon.svg";
import settingIcon from "../../../../assest/icon/setting-icon.svg";
import orderIcon from "../../../../assest/icon/order-icon.svg";
import logoutIcon from "../../../../assest/icon/logout-icon.svg";

import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../../context/profile/ProfileContext"

const Profilebar = () => {
  const { logout } = useProfile();
  let navigate = useNavigate();

  const collectionClick = () => navigate("/producer/collection");
  const orderClick = () => navigate("/producer/orders");
  const settingClick = () => navigate("/settings");
  const inventoryClick = () => navigate("/producer/ims");

  return (
    <Box w="100%">
      <ProfileButton
        text={"Collections"}
        icon={collectionIcon}
        click={collectionClick}
      />
      <ProfileButton
        text={"Inventory"}
        icon={inventoryIcon}
        click={inventoryClick}
      />
      <ProfileButton text={"Orders"} icon={orderIcon} click={orderClick} />
      <ProfileButton
        text={"Settings"}
        icon={settingIcon}
        click={settingClick}
      />
      <ProfileButton text={"Logout"} icon={logoutIcon} click={logout} />
    </Box>
  );
};

export default Profilebar;
