import { Flex, Box } from "@chakra-ui/react"
import FooterLayout from "layouts/app/main/parts/footer/FooterLayout";
import HeaderLayout from "layouts/app/main/parts/header/HeaderLayout";

import LoadingComponent from "../../../components/shared/loading-component/LoadingComponent";

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