import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PROFILE_STATUS } from "../../../constant/profile-status-types";
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../../store/profile/profile.selector";

export default function Producer() {
  const profile = useSelector(selectCurrentProfile);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      profile.type == "PRODUCER" &&
      profile.status != PROFILE_STATUS.ACTIVE &&
      profile.status != PROFILE_STATUS.IMS_TYPE_COMPLETED
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
