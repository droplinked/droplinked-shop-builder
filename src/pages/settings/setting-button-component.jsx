import {  Button } from '@chakra-ui/react'


export default function SettingButton({ children, click ,active }) {

    console.log(active)

    return (
        <Button
        color="#fff"
        m='0px auto'
        w="90%"
        minW="150px"
        borderRadius='8px'
        fontWeight='500'
        fontSize='16px'
        textAlign='center'
        p='12px 0px'
        mb='15px'
        bgColor={active?'#8053ff':'transparent'}
        border='1px'
        borderColor="#8053ff"
        _hover={{
             bgColor: '#8053ff',
             color:"black"
             }}
        onClick={click}
    >
        {children}
    </Button>
    )
}