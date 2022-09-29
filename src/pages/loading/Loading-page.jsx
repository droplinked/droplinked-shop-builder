import { Flex, Box } from "@chakra-ui/react"

import Loading from "../../components/shared/loading/Loading"
import MainHeader from "../../components/layouts/Header/MainHeader";
import Footer from "../../components/layouts/Footer/Footer";

const LoadingPage = () => {
    return (
        <Box w='100%'  bgColor="#181818" >
            <MainHeader />
            <Flex bgColor="#181818" w='100%' h='100vh' justifyContent='center' alignItems='center'
                overflow='hidden'
            >
                <Loading />
            </Flex>
            <Footer />
        </Box>
    )
}

export default LoadingPage