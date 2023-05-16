import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useContext } from 'react'
import recordContext from '../../context'

function RecordSuccess({ close }) {
    const { state: { hashkey } } = useContext(recordContext)

    return (
        <VStack align={"stretch"} spacing={3}>
            <Box textAlign={"center"}><Text fontSize={"larger"} margin="12px 0" fontFamily="aven" color={"green.400"}>Sku record successful</Text></Box>
            <Box><Text color={"#FFF"} whiteSpace={"pre-wrap"} fontSize={"md"} fontFamily="aven" textAlign={"center"}>{hashkey}</Text></Box>
            <Flex paddingTop={6} justifyContent="center"><BasicButton onClick={close}>Close</BasicButton></Flex>
        </VStack>
    )
}

export default RecordSuccess