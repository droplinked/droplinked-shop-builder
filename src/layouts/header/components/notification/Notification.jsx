import { Flex, keyframes } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { useApi } from "../../../../hooks/useApi/useApi";
import { CartIconWrapper, IconImage } from "./Notification-style";
import { getNotifications } from "../../../../api-service/notification/notificationApiService";
import { sortArrayBaseCreateTime } from "../../../../utils/sort.utils/sort.utils";

import NotificationDropdown from "../notification-dropdown/NotificationDropdown";
import notificationIcon from "../../../../assest/icon/notification-icon.svg";

const animationKeyframes = keyframes`
0% { opacity:0.2; }
50% { opacity:1; }
100% { opacity:0.2; }
`;

const animation = `${animationKeyframes} 1s linear infinite`;

export default function Notification() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const { getApi } = useApi();

  const getUnseenNotifications = () => {
    if (notifications.length > 0) {
      let unseens = notifications.filter(
        (notification) => notification.seen == false
      );
      return unseens;
    } else {
      return [];
    }
  };

  const unSeenNofits = useMemo(() => getUnseenNotifications(), [notifications]);

  const toggleNotificationDropdown = () => setShowDropdown((p) => !p);

  const updateNotifications = async () => {
    let result = await getApi(getNotifications())
    if(result){
      result = sortArrayBaseCreateTime(result.notifications);
      setNotifications(result);
    }
   
  };

  useEffect(() => {
    updateNotifications();
    setInterval(updateNotifications, 60000);
  }, []);

  return (
    <>
      <CartIconWrapper pt="5px">
        <IconImage
          src={notificationIcon}
          onClick={toggleNotificationDropdown}
        />
        {unSeenNofits.length > 0 && (
          <Flex
            w={{ base: "15px", md: "20px" }}
            h={{ base: "15px", md: "20px" }}
            color="subLayer"
            fontSize={{ base: "8px", md: "12px" }}
            pos="absolute"
            right="-5px"
            top="-5px"
            bgColor="primary"
            borderRadius="50% 50% 0px 50%"
            fontWeight="600"
            border="2px solid primary"
            d="flex"
            justifyContent="center"
            justifyItems="center"
            alignItem="center"
          >
            {unSeenNofits.length}
          </Flex>
        )}
      </CartIconWrapper>
      <NotificationDropdown
        updateNotifications={updateNotifications}
        notifications={notifications}
        unSeenNofits={unSeenNofits}
        show={showDropdown}
        close={toggleNotificationDropdown}
      />
    </>
  );
}
