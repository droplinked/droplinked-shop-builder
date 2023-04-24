import { Flex, Box } from "@chakra-ui/react"

import LoadingComponent from "../../../components/shared/loading-component/LoadingComponent";
import HeaderLayout from "layouts/dashboard/parts/header/HeaderLayout";
import FooterLayout from "layouts/dashboard/parts/footer/FooterLayout";

const LoadingPage = () => {
    return (
        <Box w='100%'  bgColor="subLayer" >
            <HeaderLayout />
            <Flex bgColor="subLayer" w='100%' h='100vh' justifyContent='center' alignItems='center'
                overflow='hidden'
            >
                <LoadingComponent />
            </Flex>
            <FooterLayout />
        </Box>
    )
}

export default LoadingPage