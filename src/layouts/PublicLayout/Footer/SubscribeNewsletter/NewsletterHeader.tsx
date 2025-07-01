import { Heading, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function NewsletterHeader() {
    const { t } = useLocaleResources('common')

    return (
        <>
            <Heading
                as="h3"
                fontSize={{ base: 16, md: 18, xl: 24 }}
                fontWeight={500}
                color="text.white"
            >
                {t('stayUpToDate')}
            </Heading>
            <Text
                marginTop={1}
                marginBottom={4}
                fontSize={{ base: 14, xl: 16 }}
                color="text.subtext.placeholder.dark"
            >
                {t('newsletterDescription')}
            </Text>
        </>

    )
}

export default NewsletterHeader 