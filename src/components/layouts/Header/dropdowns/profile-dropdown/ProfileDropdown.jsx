import { useNavigate, Link } from "react-router-dom";
import { useProfile } from "../../../../../context/profile/ProfileContext";
import { Flex, Image } from "@chakra-ui/react";
import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import ProfileItem from "./ProfileItem-component";
import headerWalletIcon from "../../../../../assest/icon/headerWalletIcon.svg";




const ProfileDropdown = ({ close }) => {
  const { profile, logout, isCustomer, isRegisteredProducer , signinWithaWallet } = useProfile();
  const { userData } = UseWalletInfo();
  let navigate = useNavigate();

  let userStatus = profile.status;
  if (profile.user) {
    userStatus = profile.user.status;
  } else {
    userStatus = profile.status;
  }

  const signInWallet = () => signinWithaWallet()

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
    <Flex
      pos="absolute"
      top={{ base: "60px", md: "110px" }}
      right="20px"
     // bgColor="#222"
      w={{ base: "200px", md: "250px" }}
      h="auto"
      minH="100px"
      borderRadius="16px"
      overflow="hidden"
      zIndex="20"
      p='24px'
      bgColor='#353535'
    //  boxShadow="dark-lg"
      flexDirection="column"
    >
      {/* {(isCustomer() && userData) && (
        <ProfileItem>
          <Flex justifyContent="center" alignItems="center">
            <MdOutlineAccountBalanceWallet style={{marginRight:"8px"}} size='30px'/> 
             <Image src={headerWalletIcon}  /> 
            {walletAddress()}
          </Flex>
        </ProfileItem>
      )} */}

      {(isCustomer()&& !userData) && (
        <ProfileItem click={signInWallet}>Connect wallet</ProfileItem>
      )}

      {isRegisteredProducer() && (
        <ProfileItem click={clickProfile}>Profile</ProfileItem>
      )}

      {isRegisteredProducer() && (
        <>
          <Link to="/producer/ims">
            <ProfileItem click={close}>Inventory</ProfileItem>
          </Link>
          {/* <Link to="/producer/ruleset">
            <ProfileItem click={close}>Rulesets</ProfileItem>
          </Link> */}
          <Link to="/producer/collection">
            <ProfileItem click={close}>Collections</ProfileItem>
          </Link>
          <Link to="/producer/orders">
            <ProfileItem click={close}>Incoming orders</ProfileItem>
          </Link>
        </>
      )}

      {isCustomer() && (
        <Link to="/purchseHistory">
          <ProfileItem click={close}>Purchase history</ProfileItem>
        </Link>
      )}

      <Link to="/settings">
        <ProfileItem click={close}>Settings</ProfileItem>
      </Link>

      <ProfileItem click={logout}>Logout</ProfileItem>
    </Flex>
  );
};

export default ProfileDropdown;
