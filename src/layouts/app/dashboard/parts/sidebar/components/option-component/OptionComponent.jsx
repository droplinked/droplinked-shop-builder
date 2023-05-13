import { useMemo } from "react";
import { Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
//
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "hooks/useProfile/useProfile";
import { IconComponent, IconWrapper } from "../../SidebarLayout-style";

const OptionComponent = ({ icon, label, path }) => {
  const location = useLocation();
  const { shop } = useProfile();

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
      <Link to={path ? `/${shop?.name}/c/${path}` : ""}>
        <IconWrapper
          borderLeft="4px solid transparent"
          borderColor={isActive ? "primary" : "none"}
          _hover={{
            borderColor: "primary",
          }}
        >
          <IconComponent
            style={isActive ? {filter: "contrast(160%)"} : {}}
            src={icon}
            cursor={label === "informations" ? "not-allowed" : "pointer"}
          />
        </IconWrapper>
      </Link>
    </Tooltip>
  );
};

export default OptionComponent;
