import MainHeader from "../../components/layouts/Header/MainHeader"
import Footer from "../../components/layouts/Footer/Footer"

import { Box, Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom";
import { useCart } from "../../context/cart/CartContext"
import { useEffect } from "react"
import { useAddress } from "../../context/address/AddressContext"
import { useNotifications } from "../../context/notifications/NotificationsContext"
import { useProfile } from "../../context/profile/ProfileContext"

export default function PageWrapper({ children }) {

    const { updateCart } = useCart();
    const { updateAddressList } = useAddress();
    const { profile } = useProfile()
    const { updateNotifications } = useNotifications()

    let token = JSON.parse(localStorage.getItem("token"));


    useEffect(() => {
        // delete localstorage after 8 hour 
        if (token != null || token != undefined) {
            const loginTime = JSON.parse(localStorage.getItem("login-time"));
            let currentTime = new Date().getTime()
            let hour = (((currentTime - loginTime) / 1000) / 60 / 60)
            if (hour > 8) {
                localStorage.clear()
                return
            }
            // update cart and address when open app
            updateCart();
            updateAddressList()
        }
    }, [])


    useEffect(() => {
        if(token != null || token != undefined){
            updateNotifications()
           setInterval(updateNotifications, 60000);
        }
    }, [profile])




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
