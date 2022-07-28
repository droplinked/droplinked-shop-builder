import "./Notification-dropdown-style.scss"

import { Box, Flex, Text } from "@chakra-ui/react"
import { useNotifications } from "../../../../../context/notifications/NotificationsContext"

import NotificationComponent from "./Notification-component"


const NotificationDropdown = ({ close }) => {

    const { notifications } = useNotifications()


    return (
            <Box
                pos='absolute'
                top={{ base: "60px", md: '80px' }}
                right={{ base: '15px', md: '70px' }}
                bgColor='#222'
                w={{ base: '200px', md: '250px' }}
                h='auto'
                overflow='hidden'
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
                    >Notifications</Text>
                    <Text
                        color='#8053ff'
                        fontSize={{ base: "14px", md: "16px" }}
                        fontWeight='600'
                    >{notifications.length}</Text>
                </Flex>
                {(notifications.length > 0) &&
                    notifications.map((notif, i) => { if (i < 6) { return <NotificationComponent key={i} notif={notif} close={close} /> } })
                }
            </Box>

    )
}

export default NotificationDropdown