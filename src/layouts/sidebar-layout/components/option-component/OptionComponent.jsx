import { useMemo } from "react";
import { Tooltip } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { useCustomNavigate } from "../../../../hooks/useCustomeNavigate/useCustomNavigate";
import { IconComponent, IconWrapper } from "../../SidebarLayout-style";

const OptionComponent = ({ icon, label, path }) => {
  const location = useLocation();
  const { shopNavigate } = useCustomNavigate();

  const clickOnIcon = () => {
    if (path) {
      shopNavigate(path);
    }
  };
  const isActive = useMemo(() => {
    return location.pathname.includes(path);
  }, [location]);

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
        borderColor={isActive ? "primary" : "none"}
      >
        <IconComponent src={icon} />
      </IconWrapper>
    </Tooltip>
  );
};

export default OptionComponent;
