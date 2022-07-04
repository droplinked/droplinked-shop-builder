import MainHeader from "../../components/layouts/Header/MainHeader"
import Footer from "../../components/layouts/Footer/Footer"

import { Box , Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom";
// import { useCart } from "../../../sevices/hooks/useCart"
import { useEffect } from "react"


export default function PageWrapper({ children }) {

    //  const { updateCart } = useCart();

    let token = JSON.parse(localStorage.getItem("token"));

    // useEffect(() => {
    //     if(token != null || token != undefined) {
    //         updateCart();
    //     }
    // },[])

    return (
        <Box
            w="100vw"
            h="100vh"
            bgColor='#222'
            overflowX='hidden'
        >
            <MainHeader />
            <Box
            w='100vw'
            minH='95%'
            h="auto"
            bgColor='#222'
           
         //   pt='50px'
       //     pb='20px'
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}