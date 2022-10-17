import { Box, Image, AspectRatio, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom"

const FrameProduct = ({title, price, imageUrl, id ,shopName }) => {
    
    return (
        <Box
            w='100%'
            p='10px'
            mb='5px'
        >
            <Link to={`/${shopName}/merch/${id}`} target="_blank" rel="noopener noreferrer">
                <AspectRatio ratio={1}>
                    <Image
                        src={imageUrl}
                        borderRadius='10px'
                        opacity='1'
                        _hover={{
                            opacity: "0.8",
                        }}
                    />
                </AspectRatio>
            </Link>
            <Text
                
                fontWeight='600'
                fontSize={{ base: "18px", md: '14px' }}
                color='#fff'
            >
                {title}
            </Text>
            <Text
                
                fontWeight='600'
                fontSize={{ base: "14px", md: '12px' }}
                color='#ccc'
            >
                ${price}
            </Text>
        </Box>
    )
}


export default FrameProduct