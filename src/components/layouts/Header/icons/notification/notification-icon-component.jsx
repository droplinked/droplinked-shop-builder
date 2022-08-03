import { Flex } from "@chakra-ui/react"
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNotifications } from "../../../../../context/notifications/NotificationsContext"

export default function Notification({ click }) {

    const { unseenNofitCount } = useNotifications()

    return (
        <Flex
            justifyContent='center'
            alignItems='center'
            pos='relative'
            w={{ base: "25px", md: '40px' }}
            h={{ base: "25px", md: '40px' }}
            mr={{base:'8px' ,md:'12px'}}
            cursor='pointer'
            onClick={click}>
            <IoMdNotificationsOutline style={{ width: "100%", height: "100%", color: "#fff" }} />
            {(unseenNofitCount() > 0) &&
                <Flex
                    pos='absolute'
                    w='100%'
                    h='100%'
                    fontWeight='600'
                    justifyContent='center'
                    alignItems='center'
                    fontSize={{ base: '6px', md: '10px' }}
                    color='#8053ff'
                >{unseenNofitCount()}</Flex>
            }
        </Flex >
    )
}