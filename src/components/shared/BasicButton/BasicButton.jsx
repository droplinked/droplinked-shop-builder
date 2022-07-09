import { Button, Spinner } from "@chakra-ui/react"

export default function BasicButton({ children, click, loading, ...otherprops }) {

 
    return (
        <Button
            w="100%"
            h="100%"
            bgColor="#8053ff"
            color="#fff"
            fontSize="20px"
            fontWeight="600"
            _hover={{ borderColor: "#4d4d4d", color: "#222" }}
            onClick={click}
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