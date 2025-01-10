import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

export default function EmptyView() {
    return (
        <Flex width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Image src='https://upload-file-droplinked.s3.amazonaws.com/b1fc9677d49f3a0cc0b3f2ff890cab4ad77bb8bb0de57fb755ff1235f411da0d.png' alt='Empty View' />
        </Flex>
    )
}
