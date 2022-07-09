import MainHeader from "../../components/layouts/Header/MainHeader"
import Footer from "../../components/layouts/Footer/Footer"

import { Box, Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom";
import { useCart } from "../../sevices/hooks/useCart"
import { useEffect } from "react"
import { useAddress } from "../../sevices/hooks/useAddress"

export default function PageWrapper({ children }) {

    const { updateCart } = useCart();
    const { updateAddressList } = useAddress();

    let token = JSON.parse(localStorage.getItem("token"));


    useEffect(() => {
        if (token != null || token != undefined) {
            updateCart();
            updateAddressList()
        }
    }, [])


    return (

        <Flex
            flexDirection='column'
            overflowX='hidden'
            w='100%'
        >
            <MainHeader />
            <Box
                w="100%"
                h="auto"
                minH="100vh"
                bgColor='#222'
                pt='50px'
                pb='100px'
                m='0px'
                overflowX='hidden'
            >
                <Outlet />
            </Box>
            <Footer />

        </Flex>
    )
}
