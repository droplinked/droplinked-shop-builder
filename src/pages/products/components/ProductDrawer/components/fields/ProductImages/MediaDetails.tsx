import { Flex, Text } from "@chakra-ui/react"
import { ProductMedia } from "pages/products/utils/formSchema"
import React from "react"

function MediaDetails({ image }: { image: ProductMedia }) {
    const { fileName, fileSize } = image
    if (!fileName && !fileSize) return null

    return (
        <Flex direction="column" gap={2}>
            {fileName && (
                <Text fontSize={14} fontWeight={500} color="#FFF">
                    {fileName}
                </Text>
            )}
            {fileSize && (
                <Text fontSize={12} fontWeight={400} color="#7B7B7B">
                    {fileSize} MB
                </Text>
            )}
        </Flex>
    )
}

export default MediaDetails