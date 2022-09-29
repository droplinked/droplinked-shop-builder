import { Flex, keyframes, Box } from "@chakra-ui/react"
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNotifications } from "../../../../../context/notifications/NotificationsContext"

const animationKeyframes = keyframes`
0% { opacity:0.2; }
50% { opacity:1; }
100% { opacity:0.2; }
`;

const animation = `${animationKeyframes} 1s linear infinite`;


export default function Notification({ click }) {

    const { unseenNofitCount } = useNotifications()

    return (
        <Flex
            justifyContent='center'
            alignItems='center'
            pos='relative'
            w={{ base: "25px", md: '36px' }}
            h={{ base: "25px", md: '36px' }}
            mr={{ base: '8px', md: '12px' }}
            cursor='pointer'
            onClick={click}>
            <IoMdNotificationsOutline style={{ width: "100%", height: "100%", color: "#fff" }} />
            {(unseenNofitCount() > 0) &&
                <Flex
                    pos='absolute'
                    w='100%'
                    h='100%'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Box
                        bgColor='#8053ff'
                        borderRadius='50%'
                        w='8px'
                        h='8px'
                        animation={animation}
                    >

                    </Box>
                </Flex>
            }
        </Flex >
    )
}