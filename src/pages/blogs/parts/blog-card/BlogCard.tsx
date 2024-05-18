import { Box, Flex } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'

function BlogCard({ blog }: { blog: Blog }) {
    const { shopNavigate } = useCustomNavigate()

    return (
        <Flex
            width={"100%"}
            minWidth={"196px"}
            direction="column"
            borderRadius={8}
            overflow={"hidden"}
            backgroundColor={"#262626"}
            cursor={"pointer"}
            onClick={() => shopNavigate(`blogs/${blog.seoData.slug}`)}
        >
            <AppImage width={"100%"} height={"196px"} src={blog.image} objectFit={"cover"} />
            <Box padding={"12px 16px"}>
                <AppTypography fontSize={"14px"} fontWeight={"600"}>{blog.title}</AppTypography>
            </Box>
        </Flex>
    )
}

export default BlogCard