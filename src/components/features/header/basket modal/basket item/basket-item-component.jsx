import image from "../../../../../assest/tshirt.jpg"

import { Box, Text, Image} from '@chakra-ui/react'

export default function BasketItemComponent() {

    return (
        <Box
            w="100%"
            h="80px"
            py="10px"
            borderBottom='1px'
            borderColor='white'
            display="flex"
        >
            <Image src={image} w="25%" h="100%" mr="10px" alt='Merch' />

            {/* right side */}
            <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box w="100%" display="flex" justifyContent="space-between">
                    <Text textAlign="center" fontSize="20px" color="white" fontWeight="600" >Merch title</Text>
                    <Text textAlign="center" fontSize="20px" color="white" fontWeight="500" >$ 20</Text>
                </Box>

                <Box w="100%" display="flex" justifyContent="space-between">
                    <Text textAlign="center" fontSize="12px" color="#ccc" fontWeight="600" >Size : xl   Color : white</Text>
                    <Text textAlign="center" fontSize="12px" color="#ccc" fontWeight="500" >quantity : 4</Text>
                </Box>
            </Box>

        
        </Box>
    )
}