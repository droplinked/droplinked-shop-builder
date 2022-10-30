import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProfile } from "../../../context/profile/ProfileContext";
import { PROFILE_STATUS } from "../../../constant/profile-status-types";

export default function Producer() {
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      profile.type == "PRODUCER" &&
      profile.status !=
        (PROFILE_STATUS.ACTIVE || PROFILE_STATUS.IMS_TYPE_COMPLETED)
    ) {
      navigate("/register/shop-info");
    }
    if (profile.type == "CUSTOMER") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
