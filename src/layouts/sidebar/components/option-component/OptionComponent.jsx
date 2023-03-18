import { useMemo } from "react";
import { Tooltip } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

import { useProfile } from "../../../../hooks/useProfile/useProfile";
import { IconComponent, IconWrapper } from "../../Sidebar-style";

const OptionComponent = ({ icon, label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { shop } = useProfile();

  const clickOnIcon = () => {
    if (path) {
      navigate(`/${shop.name}/${path}`);
    }
  };
  const isActive = useMemo(()=>{return location.pathname.includes(path)},[location])
  console.log("isActive ", isActive);
  return (
    <Tooltip
      label={label}
      placement="right-start"
      borderRadius="8px"
      bg="mainLayer"
    >
      <IconWrapper
        onClick={clickOnIcon}
        borderLeft="4px solid"
        borderColor={isActive?"primary":'none'}
      >
        <IconComponent src={icon} />
      </IconWrapper>
    </Tooltip>
  );
};

export default OptionComponent;
