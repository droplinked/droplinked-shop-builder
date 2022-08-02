import { useNavigate, Link } from "react-router-dom";
import { useProfile } from "../../../../../context/profile/ProfileContext"
import { Flex } from "@chakra-ui/react"

import ProfileItem from "./ProfileItem-component"

const ProfileDropdown = ({ close }) => {

    const { profile, logout } = useProfile()
    let navigate = useNavigate();

    let userStatus = profile.status;
    if (profile.user) {
        userStatus = profile.user.status
    } else {
        userStatus = profile.status
    }


    const registeredProducer = () => {
        if (profile.type=="PRODUCER" && profile.status != "IMS_TYPE_COMPLETED") {
            return false
        } else {
            return true
        }
    }



    const clickProfile = () => {
        close()

        switch (userStatus) {
            case "VERIFIED":
                navigate("/register/personalInfo");
                return;
            case "PROFILE_COMPLETED":
                navigate("/register/shopInfo");
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
    }

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
            <ProfileItem click={clickProfile}>Profile</ProfileItem>

            {(userStatus == "IMS_TYPE_COMPLETED") && <>
                <Link to="/producer/ims" >
                    <ProfileItem click={close}>Inventory</ProfileItem>
                </Link>
                <Link to="/producer/ruleset" >
                    <ProfileItem click={close}>Rulesets</ProfileItem>
                </Link>
                <Link to="/producer/collection" >
                    <ProfileItem click={close}>Collection</ProfileItem>
                </Link>
                <Link to="/producer/orders" >
                    <ProfileItem click={close}>Incoming Orders</ProfileItem>
                </Link>

            </>}
            {registeredProducer() && <Link to="/purchseHistory" >
                <ProfileItem click={close}>Purchase history</ProfileItem>
            </Link>}

            {registeredProducer() && <Link to="/settings" >
                <ProfileItem click={close}>Settings</ProfileItem>
            </Link>}
            <ProfileItem click={logout}>Logout</ProfileItem>
        </Flex>
    )
}



export default ProfileDropdown


