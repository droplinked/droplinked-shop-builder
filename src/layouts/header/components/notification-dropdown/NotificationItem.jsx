
import { Box, Flex, Text } from "@chakra-ui/react"
import { MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { convertToStandardFormat } from "../../../../utils/date.utils/convertDate"
import { useNotifications } from "../../../../context/notifications/NotificationsContext"
import { NOTIFICATION_TYPE } from "../../../../constant/notification.type"

const NOtificationItem = ({ notif, close }) => {

    const { seenNotif } = useNotifications()
    let navigate = useNavigate();


    const clickNotification = () => {

        close()
        switch (notif.type) {
            case NOTIFICATION_TYPE.PRODUCER_ORDER_NEW:
                navigate("/producer/orders")
                seenNotif(notif._id)
               return;
            case NOTIFICATION_TYPE.PRODUCER_SKU_QUANTITY:
                navigate("/producer/ims")
                seenNotif(notif._id)
               return;
            case NOTIFICATION_TYPE.CUSTOMER_ORDER_STATUS:
                navigate("/purchseHistory")
                seenNotif(notif._id)
               return;
            default:
        }
    }

    return (
        <Flex
            p='15px 0px'
            borderBottom='1px'
            borderColor='#666'
        >
            <Box
                w='35px'
                minW='35px'
                borderRight='2px'
                borderColor='#666'
                pr='10px'
            >
                <MdOutlineMessage style={{ width: "100%", height: "100%", fill: "white" }} />
            </Box>

            <Box
                pl='10px'
                cursor='pointer'
                onClick={clickNotification}
            >
                <Text
                    fontSize={{ base: "10px", md: '14px' }}
                    fontWeight='600'
                    color='white'
                >
                    {notif.text}
                </Text>
                <Text
                    fontSize={{ base: "8px", md: '10px' }}
                    fontWeight='500'
                    color='#666'
                >
                    {convertToStandardFormat(notif.createdAt)}
                </Text>
            </Box>
        </Flex>
    )
}

export default NOtificationItem