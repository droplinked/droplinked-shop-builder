import { Box } from "@chakra-ui/react"

export default function HeaderItem({ children, click, ...otherProps }) {
    return (
        <Box
            onClick={click}
            display='flex'
            justifyContent='center'
            alignItems='center'
            h='100%'
            color='#fff'
            bgColor='#353536'
            borderRadius='8px'
            fontWeight='600'
            px={{ base:"16px" , md:'28px'}}
            pt={{base:'3px' , md:'0px'}}
            fontSize={{ base: '12px', md: '20px' }}
            cursor='pointer'
            _hover={{
                bgColor:'#424242',
            }}
            {...otherProps}
        >
            {children}
        </Box>
    )
}

{/* <div className="header-item-btn-component-wraper" onClick={click} style={style}>{children}</div> */ }