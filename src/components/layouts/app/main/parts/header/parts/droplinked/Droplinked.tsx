import { Box } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import { Link } from 'react-router-dom'

function Droplinked() {
    return (
        <Link to="/">
            <Box width={{ base: "92px", md: "140px", lg: "164px", xl: "212px" }}>
                <AppIcons.Droplinked width={"100%"} height={"32px"} />
            </Box>
        </Link>
    )
}

export default Droplinked