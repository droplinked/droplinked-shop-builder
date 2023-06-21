import { useMemo } from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { IconWrapper } from "../../SidebarLayout-style";
import classes from './style.module.scss'

const OptionComponent = ({ icon, label, path }) => {
  const location = useLocation();
  const { shop } = useProfile();

  const isActive = useMemo(() => {
    const currentPath = path.split('/')[0]
    return location.pathname.split('/').find(el => el.toLowerCase() === currentPath.toLowerCase())
  }, [location, path]);

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
          <Box className={`${classes.icon} ${isActive ? classes.active : ""}`}>{icon}</Box>
          {/* <IconComponent
            style={isActive ? { filter: "contrast(160%)" } : {}}
            src={icon}
            cursor={label === "informations" ? "not-allowed" : "pointer"}
          /> */}
        </IconWrapper>
      </Link>
    </Tooltip>
  );
};

export default OptionComponent;
