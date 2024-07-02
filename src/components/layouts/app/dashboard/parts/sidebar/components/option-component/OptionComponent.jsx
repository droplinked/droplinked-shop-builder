import { useMemo } from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { IconWrapper } from "../../SidebarLayout-style";
import classes from './style.module.scss'
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";

const OptionComponent = ({ icon, label, path }) => {
  const location = useLocation();
  const { shopRoute } = useCustomNavigate()

  const isActive = useMemo(() => {
    const checkDash = location.pathname.charAt(location.pathname.length - 1) === '/'
    const match = shopRoute + path === (checkDash ? location.pathname.slice(0, -1) : location.pathname)
    return match
  }, [location, path, shopRoute]);

  return (
    <Link to={path ? `${shopRoute}${path}` : ""}>
      <Tooltip
        label={label}
        placement="right"
        borderRadius="100px"
        color="#C2C2C2"
        padding="5px 10px"
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
