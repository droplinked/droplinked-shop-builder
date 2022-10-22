import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProfile } from "../../../context/profile/ProfileContext"


export default function Producer() {

    const { profile } = useProfile()
    const navigate = useNavigate();

    useEffect(() => {
        if (profile.type == "PRODUCER" && profile.status != "IMS_TYPE_COMPLETED") {
                navigate('/register/shop-info')
        }
        if (profile.type == "CUSTOMER") {
            navigate('/')
        }
    }, [])

    return (<>
        <Outlet />
    </>)
}