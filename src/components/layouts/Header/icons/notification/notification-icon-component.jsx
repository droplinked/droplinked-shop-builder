import { Flex, keyframes} from "@chakra-ui/react";

import { useNotifications } from "../../../../../context/notifications/NotificationsContext";
import { CartIconWrapper, IconImage } from "../cart/cart-icon-style";
import { useState } from "react";
import DropdownContainer from "../../dropdowns/dropdown-container/DropDown-container";
import { DROPDOWN_TYPE } from "../../dropdowns/dropdown.type";
import notificationIcon from "../../../../../assest/icon/notification-icon.svg";

const animationKeyframes = keyframes`
0% { opacity:0.2; }
50% { opacity:1; }
100% { opacity:0.2; }
`;

const animation = `${animationKeyframes} 1s linear infinite`;

export default function Notification() {
  const [dropdown, setDropdown] = useState(null);

  const { unseenNotifList } = useNotifications();

  const unSeenNofits = unseenNotifList();

  const openNotification = () => setDropdown(DROPDOWN_TYPE.NOTIFICATION);

  const close = () => setDropdown(null);

  return (
    <>
    <CartIconWrapper pt="5px">
      <IconImage src={notificationIcon} onClick={openNotification}/>
      {unSeenNofits.length > 0 && (
        <Flex
          w={{ base: "15px", md: "20px" }}
          h={{ base: "15px", md: "20px" }}
          color="#181818"
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
    {dropdown && <DropdownContainer close={close} dropdown={'NOTIFICATION'} />}
    </>
  );
}

// <Flex
//   pos="absolute"
//   w="100%"
//   h="100%"
//   justifyContent="center"
//   alignItems="center"
//   onClick={openNotification}
// >
//   <Box
//     bgColor="primary"
//     borderRadius="50%"
//     w="8px"
//     h="8px"
//     animation={animation}
//   ></Box>
// </Flex>
