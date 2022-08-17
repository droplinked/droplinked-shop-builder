import { useNavigate, Link } from "react-router-dom";
import { useProfile } from "../../../../../context/profile/ProfileContext"
import { Flex } from "@chakra-ui/react"

import ProfileItem from "./ProfileItem-component"

const ProfileDropdown = ({ close }) => {

    const { profile, logout, isCustomer, isRegisteredProducer } = useProfile()
    let navigate = useNavigate();

    let userStatus = profile.status;
    if (profile.user) {
        userStatus = profile.user.status
    } else {
        userStatus = profile.status
    }



    const clickProfile = () => {
        close()
        if (profile.type == "PRODUCER") {
            switch (userStatus) {
                case "VERIFIED":
                    navigate("/register/personalInfo");
                    return;
                case "PROFILE_COMPLETED":
                    navigate("/register/shop-info");
                    return;
                case "SHOP_INFO_COMPLETED":
                    navigate("/register/IMSSelect");
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
    }

    console.log(isRegisteredProducer());

    return (


        <Flex
            pos='absolute'
            top={{ base: "60px", md: '80px' }}
            right='20px'
            bgColor='#222'
            w={{ base: '200px', md: '250px' }}
            h='auto'
            minH='100px'
            borderRadius='16px'
            overflow='hidden'
            zIndex='20'
            boxShadow='dark-lg'
            flexDirection='column'
        >
            {isRegisteredProducer() && <ProfileItem click={clickProfile}>Profile</ProfileItem>}

            {isRegisteredProducer() && <>
                <Link to="/producer/ims" >
                    <ProfileItem click={close}>Inventory</ProfileItem>
                </Link>
                <Link to="/producer/ruleset" >
                    <ProfileItem click={close}>Rulesets</ProfileItem>
                </Link>
                <Link to="/producer/collection" >
                    <ProfileItem click={close}>Collections</ProfileItem>
                </Link>
                <Link to="/producer/orders" >
                    <ProfileItem click={close}>Incoming orders</ProfileItem>
                </Link>
            </>}

            {isCustomer() && <Link to="/purchseHistory" >
                <ProfileItem click={close}>Purchase history</ProfileItem>
            </Link>}

            <Link to="/settings" >
                <ProfileItem click={close}>Settings</ProfileItem>
            </Link>

            <ProfileItem click={logout}>Logout</ProfileItem>
        </Flex>
    )
}



export default ProfileDropdown


