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
        >
            <MainHeader />
            <Box
            w='100%'
            h="auto"
            bgColor='#222'
            px={{base:'20px' , md:"80px"}}
            py='20px'
            mt='50px'
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}