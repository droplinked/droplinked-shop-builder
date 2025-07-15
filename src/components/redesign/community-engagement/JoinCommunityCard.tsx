import { GridItem, Heading, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function JoinCommunityCard() {
    const { t } = useLocaleResources("dashboardPage")

    return (
        <GridItem padding={{ base: 4, xl: 6 }}>
            <Heading mb={1} fontSize={20} fontWeight={700} color="text.white">
                {t('JoinCommunityCard.title')}
            </Heading>
            <Text color="text.subtext.placeholder.dark">
                {t('JoinCommunityCard.description')}
            </Text>
        </GridItem>
    )
}

export default JoinCommunityCard