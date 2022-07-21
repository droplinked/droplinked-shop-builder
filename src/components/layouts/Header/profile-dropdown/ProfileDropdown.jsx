import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../../../context/profile/ProfileContext"


const ProfileDropdown = ({headerToggle}) => {

    const { profile , logout} = useProfile()
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
        <div className="header-nav">

            {(userStatus == "IMS_TYPE_COMPLETED") && <>
                <div className="header-nav-item" onClick={clickProfile}>Profile</div>
                <Link to="/producer/ims">
                    <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Inventory</div>
                </Link>
                <Link to="/producer/ruleset">
                    <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Rulesets</div>
                </Link>
                <Link to="/producer/collection">
                    <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Collection</div>
                </Link>
                <Link to="/producer/orders">
                    <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Incoming Orders</div>
                </Link>

            </>
            }
            <Link to="/purchseHistory">
                <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Purchase history</div>
            </Link>
            <Link to="/settings">
                <div className="header-nav-item" onClick={() => { headerToggle(false) }}>Settings</div>
            </Link>
            <div className="header-nav-item" onClick={logout}>Logout</div>
        </div>
    )
}


export default ProfileDropdown