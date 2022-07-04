import MainHeader from "../../components/layouts/Header/MainHeader"
import Footer from "../../components/layouts/Footer/Footer"

import { Box, Flex } from "@chakra-ui/react"
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
     
       
        <Flex
         flexDirection='column'
         overflowX='hidden'
         >  
                <MainHeader />
            <Box
                w="100vw"
                h="auto"
                minH="100vh"
                bgColor='#222'
                pt='50px'
                pb='100px'
                m='0px'
            >
                <Outlet />
            </Box>      
                <Footer /> 
                
         </Flex>
    )
}

// margin: 0px;
//   outline: 0px;
//   overflow: hidden;
//   width: 100vw;
//   height: auto;
//   min-height: 100vh;
//   background-color: #222222;
//   padding:50px 0px 100px 0px;
//   overflow-x: hidden;
//   margin-top: 10px;