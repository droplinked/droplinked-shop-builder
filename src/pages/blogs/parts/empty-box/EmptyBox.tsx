import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function EmptyBox() {
    return (
        <Flex direction={"column"} gap={12}>
            <AppTypography textAlign={"center"} fontSize={28} fontWeight={700}>No Blogs Yet!</AppTypography>
            <AppTypography textAlign={"center"} fontSize={16}>Welcome to your blog management page! It looks like you haven’t created any blog posts yet. Sharing blog posts is a fantastic way to connect with your customers, share updates, and showcase your products.</AppTypography>
        </Flex>
    )
}

export default EmptyBox