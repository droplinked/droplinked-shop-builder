import { GridItem, Heading, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import enLocale from 'locales/dashboard/en.json'
import arLocale from 'locales/dashboard/ar.json'

function JoinCommunityCard() {
    const { t } = useLocaleResources("dashboardPage",{
        en: enLocale,
        ar: arLocale
      })

    return (
        <GridItem padding={{ base: 4, xl: 6 }}>
            <Heading mb={1} fontSize={20} fontWeight={700} color="text.white">
                {t('joinCommunityCard.title')}
            </Heading>
            <Text color="text.subtext.placeholder.dark">
                {t('joinCommunityCard.description')}
            </Text>
        </GridItem>
    )
}

export default JoinCommunityCard