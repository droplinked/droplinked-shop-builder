import "./Notification-dropdown-style.scss"

import { Box, Flex, Text } from "@chakra-ui/react"
import { useNotifications } from "../../../../../context/notifications/NotificationsContext"
import { useNavigate } from "react-router-dom";

import NotificationComponent from "./Notification-component"
import BasicButton from "../../../../shared/BasicButton/BasicButton"

const NotificationDropdown = ({ close }) => {

    const { notifications, unseenNofitCount } = useNotifications()
    let navigate = useNavigate();

    const notificationClick = () => {
        close()
        navigate("/notifications")
    }
    return (
        <Box
            pos='absolute'
            top={{ base: "60px", md: '80px' }}
            right={{ base: '15px', md: '70px' }}
            bgColor='#222'
            w={{ base: '200px', md: '250px' }}
            h='auto'
            borderRadius='8px'
            p={{ base: "20px", md: "20px" }}
            zIndex='20'
            boxShadow='dark-lg'
        >
            <Flex
                justifyContent='space-between'
                alignItems='center'
                borderBottom='1px'
                borderColor='#aaa'
                pb='5px'
            >
                <Text
                    color='#eee'
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight='600'
                >New notifications</Text>
                <Text
                    color='#8053ff'
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight='600'
                >{unseenNofitCount()}</Text>
            </Flex>
            {(notifications.length > 0) &&
                notifications.map((notif, i) => {
                    if (notif.seen == false) {
                        if(i<5)
                        return <NotificationComponent key={i} notif={notif} close={close} /> 
                    }
                })
            }
            <Box h={{ base: '40px', md: '50px' }} pt='10px'>
                <BasicButton
                    click={notificationClick}
                >Notifications</BasicButton>
            </Box>

        </Box>

    )
}

export default NotificationDropdown