import { useNavigate, Link } from "react-router-dom";

import { useProfile } from "../../../../context/profile/ProfileContext";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { ProfileDropdownWrapper ,ProfileItem } from "./ProfileDropdown-style";

import DropdownContainer from "../dropdown-container/DropdownContainer";

const ProfileDropdown = ({ show, close }) => {
  const {
    profile,
    logout,
    isCustomer,
    isRegisteredProducer,
    signinWithaWallet,
  } = useProfile();
  const { userData } = UseWalletInfo();
  let navigate = useNavigate();

  let userStatus = profile.status;
  if (profile.user) {
    userStatus = profile.user.status;
  } else {
    userStatus = profile.status;
  }

  const signInWallet = () => signinWithaWallet();

  const walletAddress = () => {
    if (userData) {
      let address = userData.profile.stxAddress.mainnet;
      return (
        address.substring(0, 4) +
        "...." +
        address.substring(address.length - 4, address.length)
      );
    }
  };

  const clickProfile = () => {
    close();
    if (profile.type == "PRODUCER") {
      switch (userStatus) {
        case "VERIFIED":
          navigate("/register/personalInfo");
          return;
        case "PROFILE_COMPLETED":
          navigate("/register/shop-info");
          return;
        case "SHOP_INFO_COMPLETED":
          navigate("/register/ims-type");
          return;
        case "IMS_TYPE_COMPLETED":
          navigate(`/${profile.shopName}`);
          return;
        case "ACTIVE":
          navigate(`/${profile.shopName}`);
          return;
      }
    } else {
      navigate("/");
      return;
    }
  };

  return (
    <DropdownContainer show={show} close={close}>
      <ProfileDropdownWrapper>
        {isCustomer() && userData && (
          <ProfileItem onClick={signInWallet}>{walletAddress()}</ProfileItem>
        )}
        {isCustomer() && !userData && (
          <ProfileItem onClick={signInWallet}>Connect wallet</ProfileItem>
        )}

        {isRegisteredProducer() && (
          <ProfileItem onClick={clickProfile}>Profile</ProfileItem>
        )}

        {isRegisteredProducer() && (
          <>
            <Link to="/producer/ims">
              <ProfileItem onClick={close}>Inventory</ProfileItem>
            </Link>
            <Link to="/producer/collection">
              <ProfileItem onClick={close}>Collections</ProfileItem>
            </Link>
            <Link to="/producer/orders">
              <ProfileItem onClick={close}>Incoming orders</ProfileItem>
            </Link>
          </>
        )}

        {isCustomer() && (
          <Link to="/purchseHistory">
            <ProfileItem onClick={close}>Purchase history</ProfileItem>
          </Link>
        )}

        <Link to="/settings">
          <ProfileItem onClick={close}>Settings</ProfileItem>
        </Link>

        <ProfileItem onClick={logout}>Logout</ProfileItem>
      </ProfileDropdownWrapper>
    </DropdownContainer>
  );
};

export default ProfileDropdown;
