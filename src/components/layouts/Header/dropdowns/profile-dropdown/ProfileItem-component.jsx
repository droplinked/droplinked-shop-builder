import { Box } from "@chakra-ui/react"

const ProfileItem = ({children,click}) => {

    return (
        <Box
            p='10px 0px'
            fontSize={{ base: '16px', md: '20px' }}
            textAlign='center'
            fontWeight='600'
            cursor='pointer'
            color='#fff'
            onClick={click}
            w='100%'
            _hover={{
                bgColor:'#333'
            }}
        >{children}</Box>
    )
}

export default ProfileItem