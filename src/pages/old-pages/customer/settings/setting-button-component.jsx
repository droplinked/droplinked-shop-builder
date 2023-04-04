import {  Button } from '@chakra-ui/react'


export default function SettingButton({ children, click ,active }) {


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
        bgColor={active?'primary':'transparent'}
        border='1px'
        borderColor="primary"
        _hover={{
             bgColor: 'primary',
             color:"black"
             }}
        onClick={click}
    >
        {children}
    </Button>
    )
}