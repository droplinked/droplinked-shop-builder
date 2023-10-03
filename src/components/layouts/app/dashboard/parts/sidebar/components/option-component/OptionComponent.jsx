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
    <Link to={path ? `/${shop?.name}/c/${path}` : ""}>
      <Tooltip
        label={label}
        placement="right-end"
        borderRadius="100px"
        color="#C2C2C2"
        padding="5px 11px"
        fontSize="12px"
        bg="#292929"
      >
        <IconWrapper
          borderLeft="4px solid transparent"
          paddingLeft="19px"
          borderColor={isActive ? "primary" : "none"}
          _hover={{
            borderColor: "primary",
          }}
        >
          <Box className={`${classes.icon} ${isActive ? classes.active : ""}`}>{icon}</Box>
        </IconWrapper>
      </Tooltip>
    </Link>
  );
};

export default OptionComponent;
