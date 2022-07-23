import { useNavigate, Link } from "react-router-dom";
import { useProfile } from "../../../../context/profile/ProfileContext"
import {  Flex } from "@chakra-ui/react"
import ProfileItem from "./ProfileItem-component"


const ProfileDropdown = ({ headerToggle }) => {

    const { profile, logout } = useProfile()
    let navigate = useNavigate();

    let userStatus = profile.status;
    if (profile.user) {
        userStatus = profile.user.status
    } else {
        userStatus = profile.status
    }



    const clickProfile = () => {
        headerToggle(false)

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
                <ProfileItem click={() => { headerToggle(false) }}>Inventory</ProfileItem>
            </Link>
            <Link to="/producer/ruleset" >
                <ProfileItem click={() => { headerToggle(false) }}>Rulesets</ProfileItem>
            </Link>
            <Link to="/producer/collection" >
                <ProfileItem click={() => { headerToggle(false) }}>Collection</ProfileItem>
            </Link>
            <Link to="/producer/orders" >
                <ProfileItem click={() => { headerToggle(false) }}>Incoming Orders</ProfileItem>
            </Link>

            </>}
            <Link to="/purchseHistory" >
                <ProfileItem click={() => { headerToggle(false) }}>Purchase history</ProfileItem>
            </Link>
            <Link to="/settings" >
                <ProfileItem click={() => { headerToggle(false) }}>Settings</ProfileItem>
            </Link>
            <ProfileItem click={logout}>Logout</ProfileItem>
        </Flex>
            )
        }
        
        

export default ProfileDropdown

        // <div className="header-nav">

        //     {(userStatus == "IMS_TYPE_COMPLETED") && <>
        //         <div className="header-nav-item" onClick={clickProfile}>Profile</div>
        //         <Link to="/producer/ims">
        //             <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Inventory</div>
        //         </Link>
        //         <Link to="/producer/ruleset">
        //             <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Rulesets</div>
        //         </Link>
        //         <Link to="/producer/collection">
        //             <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Collection</div>
        //         </Link>
        //         <Link to="/producer/orders">
        //             <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Incoming Orders</div>
        //         </Link>

        //     </>
        //     }
        //     <Link to="/purchseHistory">
        //         <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Purchase history</div>
        //     </Link>
        //     <Link to="/settings">
        //         <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Settings</div>
        //     </Link>
        //     <div className="header-nav-item" onClick={logout}>Logout</div>
        // </div>

