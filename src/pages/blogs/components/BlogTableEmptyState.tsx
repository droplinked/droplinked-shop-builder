import { Flex, Image, Text } from '@chakra-ui/react'
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm'
import React from 'react'

function BlogTableEmptyState() {
    return (
        <Flex
            width="100%"
            height="80vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                width="750px"
                height="273px"
                src="https://upload-file-droplinked.s3.amazonaws.com/09cb061ba207cddb9eecf0befbd2e7a8a69f44d7ec1c83a7ed387da3f2651526.png"
                alt='Empty Table'
            />

            <Text mt="36px" mb="16px" fontSize={14} color="text.white">
                Publish a new blog post to boost SEO and engage audiences.
            </Text>

            <Flex
                as="button"
                alignItems="center"
                gap="4px"
                padding="8px 12px"
                fontSize={12}
                fontWeight={500}
                color="text.primary"
            >
                <PlusSm color='#2bcfa1' />
                New Post
            </Flex>
        </Flex>
    )
}

export default BlogTableEmptyState