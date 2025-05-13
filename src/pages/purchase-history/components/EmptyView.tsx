import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React from 'react'

export default function EmptyView() {
    const image = "https://upload-file-droplinked.s3.amazonaws.com/034943afd4f8e2e778699badbb32189a2f831ea25ac7a362983ce6444cb8eaa4.png"

    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column" gap="64px" mt="15vh">
            <AppImage src={image} alt="Empty Form" width="320px" height="268px" />
            <Text color="text.disabled.dark">You don't have any order yet</Text>
        </Flex>
    )
}
