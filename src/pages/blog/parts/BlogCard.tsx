import { Box, Flex } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function BlogCard({ blog }: { blog: Blog }) {
    console.log(blog)
    return (
        <Flex
            key={blog._id}
            width={"100%"}
            minWidth={"196px"}
            direction="column"
            borderRadius={8}
            overflow={"hidden"}
            backgroundColor={"#262626"}
            cursor={"pointer"}
        >
            <AppImage src={blog.image} objectFit={"cover"} width={"100%"} height={"196px"} />
            <Box padding={"12px 16px"}>
                <AppTypography fontSize={"14px"} fontWeight={"600"}>{blog.title}</AppTypography>
            </Box>
        </Flex>
    )
}

export default BlogCard