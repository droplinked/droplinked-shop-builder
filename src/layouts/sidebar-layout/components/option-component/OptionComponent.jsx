import { useMemo } from "react";
import { Tooltip } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
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
  console.log("path ", path);
  return (
    <Tooltip
      label={label}
      placement="right-start"
      borderRadius="8px"
      bg="mainLayer"
    >
      <IconWrapper
        //onClick={clickOnIcon}
        borderLeft="4px solid"
        borderColor={isActive ? "primary" : "none"}
        _hover={{
          borderColor: "primary",
        }}
        href={path?`/${shop.name}/c/${path}`:null}
      >
        <IconComponent
          src={icon}
          cursor={label === "informations" ? "not-allowed" : "pointer"}
        />
      </IconWrapper>
    </Tooltip>
  );
};

export default OptionComponent;
