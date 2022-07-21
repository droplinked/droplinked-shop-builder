
import { Box, Flex, Text } from "@chakra-ui/react"
import { MdOutlineMessage } from "react-icons/md";

const NotificationComponent = () => {

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
                <MdOutlineMessage style={{ width: "100%", height: "100%", fill:"white" }} />
            </Box>

            <Box pl='10px'>
            <Text
            fontSize={{ base:"10px" , md:'14px'}}
            fontWeight='600'
            color='#fff'
            >
            You have just received a new order
            </Text>
            <Text
            fontSize={{ base:"8px" , md:'10px'}}
            fontWeight='500'
            color='#666'
            >
            jul/11/2022
            </Text>
            </Box>
        </Flex>
    )
}

export default NotificationComponent