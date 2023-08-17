import React, { useContext } from 'react'
import './style.css'
import { Box, Image } from '@chakra-ui/react';
import artwork2dContext from '../../../../context';

interface Iprops {
    children: any
}
function Shirt({ children }: Iprops) {
    const { color } = useContext(artwork2dContext)

    return (
        <Box position="relative" backgroundColor={color || "#999"}>
            <Image src='/assets/images/shirt/front.png' width="100%" />
            <Box position="absolute" top={0} left="0" bottom={0} right="3px">
                {children}
            </Box>
        </Box>
    )
}

export default Shirt