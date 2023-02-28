import { Flex, Text } from "@chakra-ui/react";
import { getNotifications } from "../../../api-service/notification/notificationApiService";
import { sortArrayBaseCreateTime } from "../../../utils/sort.utils/sort.utils";
import { useState, useEffect } from "react";
import { useApi } from "../../../hooks/useApi/useApi";
import NotificationComponent from "./Notification.component";
import Loading from "../../../components/shared/loading/Loading";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const { getApi } = useApi();

  const updateNotifications = async () => {
    
    let result = await getApi(getNotifications());
    if (result) {
      result = sortArrayBaseCreateTime(result.notifications);
      setNotifications(result);
    }
  };

  useEffect(() => {
    updateNotifications();
  }, []);

  return (
    <Flex
      w="100%"
      direction="column"
      px={{ base: "20px", md: "80px" }}
      alignItems="center"
    >
      <Text
        color="white"
        fontSize={{ base: "30px", md: "40px" }}
        fontWeight="600"
        mb="30px"
      >
        Notifications
      </Text>
      {notifications.length > 0 ? (
        <>
          {notifications.map((notification, i) => {
            return (
              <NotificationComponent
                updateNotifications={updateNotifications}
                notification={notification}
                key={i}
              />
            );
          })}
        </>
      ) : (
        <Loading />
      )}
    </Flex>
  );
}
