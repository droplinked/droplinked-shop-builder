import { Flex, Text } from "@chakra-ui/react"
import { useNotifications } from "../../../context/notifications/NotificationsContext"

import NotificationComponent from "./Notification.component"
import Loading from "../../../components/shared/loading/Loading"

export default function Notifications() {

    const { notifications } = useNotifications()

    return (
        <Flex
            w='100%'
            direction='column'
            px={{ base: '20px', md: '80px' }}
            alignItems='center'
        >
            <Text
                color='white'
                fontSize={{ base: '30px', md: '40px' }}
                fontWeight='600'
                mb='30px'
            >
                Notifications
            </Text>
            {(notifications.length > 0)
                ?
                <>
                    {notifications.map((notification, i)=>{
                       return <NotificationComponent notification={notification} key={i} />
                    })}
                </>
                :
                <Loading />
            }
        </Flex>
    )
}