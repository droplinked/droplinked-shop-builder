import { Heading, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function NewsletterHeader() {
    const { t } = useLocaleResources('layout/PublicLayout')

    return (
        <>
            <Heading
                as="h3"
                fontSize={{ base: 16, md: 18, xl: 24 }}
                fontWeight={500}
                color="text.white"
            >
                {t('Footer.SubscribeNewsletter.NewsletterHeader.stayUpToDate')}
            </Heading>
            <Text
                marginTop={1}
                marginBottom={4}
                fontSize={{ base: 14, xl: 16 }}
                color="text.subtext.placeholder.dark"
            >
                {t('Footer.SubscribeNewsletter.NewsletterHeader.newsletterDescription')}
            </Text>
        </>

    )
}

export default NewsletterHeader 