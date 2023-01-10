import { Flex, Box } from "@chakra-ui/react"

import Loading from "../../../components/shared/loading/Loading"
import Header from "../../../layouts/header/Header"
import Footer from "../../../layouts/footer/Footer";

const LoadingPage = () => {
    return (
        <Box w='100%'  bgColor="subLayer" >
            <Header />
            <Flex bgColor="subLayer" w='100%' h='100vh' justifyContent='center' alignItems='center'
                overflow='hidden'
            >
                <Loading />
            </Flex>
            <Footer />
        </Box>
    )
}

export default LoadingPage