
import { Box, Flex, Text } from "@chakra-ui/react"
import { MdOutlineMessage } from "react-icons/md";
import { convertToStandardFormat } from "../../../../utils/date.utils/convertDate"
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../../../context/notifications/NotificationsContext"


const NotificationComponent = ({ notif, close }) => {

    const { seenNotif } = useNotifications()
    let navigate = useNavigate();


    const clickNotification = () => {
        close()
        switch (notif.type) {
            case "PRODUCER_ORDER_NEW":
                navigate("/producer/orders")
                seenNotif(notif._id)
            case "PRODUCER_SKU_QUANTITY":
                navigate("/producer/ims")
                seenNotif(notif._id)
            case "CUSTOMER_ORDER_STATUS":
                navigate("/producer/orders")
                seenNotif(notif._id)
            default:
                console.log("x");
        }
    }

    return (
        <Flex
            p='15px 0px'
            borderBottom='1px'
            borderColor='#666'
        >
            <Box
                w='40px'
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
                    color='#fff'
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

export default NotificationComponent