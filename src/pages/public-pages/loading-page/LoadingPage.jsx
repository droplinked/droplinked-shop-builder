import { Flex, Box } from "@chakra-ui/react"

import Loading from "../../../components/shared/loading/Loading"
import Header from "../../../layouts/header/Header"
import FooterLayout from "../../../layouts/footer-layout/FooterLayout";

const LoadingPage = () => {
    return (
        <Box w='100%'  bgColor="subLayer" >
            <Header />
            <Flex bgColor="subLayer" w='100%' h='100vh' justifyContent='center' alignItems='center'
                overflow='hidden'
            >
                <Loading />
            </Flex>
            <FooterLayout />
        </Box>
    )
}

export default LoadingPage