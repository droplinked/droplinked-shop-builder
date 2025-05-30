import { Flex, Image, Text } from '@chakra-ui/react'
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function BlogTableEmptyState() {
    const navigate = useNavigate()
    const { t } = useLocaleResources("blogs")

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
                {t("table.emptyState.message")}
            </Text>

            <Flex
                as="button"
                alignItems="center"
                gap="4px"
                padding="8px 12px"
                fontSize={12}
                fontWeight={500}
                color="text.primary"
                onClick={() => navigate('/analytics/blogs/new')}
            >
                <PlusSm color='#2bcfa1' />
                {t("table.emptyState.action")}
            </Flex>
        </Flex>
    )
}

export default BlogTableEmptyState