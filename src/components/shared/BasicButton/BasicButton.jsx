import { Button, Spinner } from "@chakra-ui/react"

export default function BasicButton({ children, click , loading, ...otherprops }) {

 
    return (
        <Button
            w="100%"
            h="100%"
            bgColor="#8053ff"
            color="#fff"
            fontSize={{base:'16px' , md:"20px"}}
            fontWeight="600"
            borderRadius='8px'
            margin='0px auto'
            p={{base:"12px 20px 9px 20px" , md:"12px 20px"}}
            _hover={{ borderColor: "#4d4d4d", color: "#222" }}
            _disabled={{ bgColor:"#4A4A4A"}}
            onClick={click}
            disabled={loading}
            {...otherprops}
        >
             {(loading != undefined && loading == true)
                ? <>
                  
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='#fff'
                            color='#222'
                            size='md'
                        />
                    
                </>
                :
                <>
                { children }
                </>
            } 
        </Button>
    )
}