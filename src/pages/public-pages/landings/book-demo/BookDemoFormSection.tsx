import { Flex, Heading, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import BookDemoForm from './BookDemoForm'

export default function BookDemoFormSection() {
    const { t } = useLocaleResources('book-demo')

    return (
        <Flex
            height="100%"
            direction="column"
            padding={{ base: 4, md: 6 }}
        >
            <Heading
                marginBottom="2px"
                fontSize={{ base: 18, md: 20 }}
                fontWeight={500}
                color="text.white"
            >
                {t('BookDemoFormSection.title')}
            </Heading>
            <Text
                marginBottom={6}
                fontSize={14}
                color="text.subtext.placeholder.light"
            >
                {t('BookDemoFormSection.subtitle')}
            </Text>
            <BookDemoForm />
        </Flex>
    )
}
