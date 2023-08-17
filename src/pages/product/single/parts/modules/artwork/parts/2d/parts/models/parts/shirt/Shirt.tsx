import React, { useContext } from 'react'
import './style.css'
import { Box } from '@chakra-ui/react';
import artwork2dContext from '../../../../context';

interface Iprops {
    children: any
}
function Shirt({ children }: Iprops) {
    const { color } = useContext(artwork2dContext)

    return (
        <Box position="relative" backgroundColor={color || "#999"}>
            <img src='/assets/images/shirt/front.png' width="100%" />
            {children}
        </Box>
    )
}

export default Shirt