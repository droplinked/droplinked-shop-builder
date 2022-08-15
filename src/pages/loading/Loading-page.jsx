import { Flex } from "@chakra-ui/react"

import Loading from "../../components/shared/loading/Loading"

const LoadingPage = () => {
    return (
        <Flex bgColor="#222" maxW='99vw' h="100vh" justifyContent='center' alignItems='center'
        overflow='hidden'
        >
            <Loading />
        </Flex>
        )
}

export default LoadingPage