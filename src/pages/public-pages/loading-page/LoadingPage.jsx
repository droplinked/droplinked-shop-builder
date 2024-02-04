import { Flex, Box } from "@chakra-ui/react"
import LoadingComponent from "components/common/loading-component/LoadingComponent";
import FooterLayout from "components/layouts/app/main/parts/footer/FooterLayout";
import HeaderLayout from "components/layouts/app/main/parts/header/HeaderLayout";

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