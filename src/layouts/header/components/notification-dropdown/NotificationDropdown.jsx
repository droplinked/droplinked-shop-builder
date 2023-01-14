import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


import NOtificationItem from "./NotificationItem";
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import DropdownContainer from "../dropdown-container/DropdownContainer";

const NotificationDropdown = ({updateNotifications , notifications, unSeenNofits, show, close }) => {

  let navigate = useNavigate();

  const notificationClick = () => {
    close();
    navigate("/notifications");
  };

  return (
    <DropdownContainer show={show} close={close}>
      <Box
        pos="absolute"
        top={{ base: "60px", md: "110px" }}
        right={{ base: "15px", md: "70px" }}
        bgColor="button"
        w={{ base: "200px", md: "250px" }}
        h="auto"
        borderRadius="8px"
        p={{ base: "20px", md: "24px" }}
        zIndex="20"
        boxShadow="button"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px"
          borderColor="#aaa"
          pb="5px"
        >
          <Text
            color="#eee"
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="600"
          >
            New notifications
          </Text>
          <Text
            color="primary"
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="600"
          >
            {unSeenNofits.length}
          </Text>
        </Flex>
        {notifications.length > 0 &&
          notifications.map((notif, i) => {
            if (notif.seen == false) {
              if (i < 5)
                return <NOtificationItem key={i} updateNotifications={updateNotifications} notif={notif} close={close} />;
            }
          })}
        <Box h={{ base: "40px", md: "50px" }} pt="10px">
          <BasicButton click={notificationClick}>Notifications</BasicButton>
        </Box>
      </Box>
    </DropdownContainer>
  );
};

export default NotificationDropdown;
