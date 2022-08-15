import { Flex } from "@chakra-ui/react"

import Loading from "../../components/shared/loading/Loading"

const LoadingPage = () => {
    return (
        <Flex bgColor="#222" w='100vw' h="100vh" justifyContent='center' alignItems='center'>
            <Loading />
        </Flex>
        )
}

export default LoadingPage