import { Grid } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useFollowStatus from '../hook/useFollowStatus'
import { getPromotions } from '../utils/promotionsList'
import MobileQuestCard from './MobileQuestCard'
import SocialMediaCard from './SocialMediaCard'
import HeroBrowser from './hero-browser/HeroBrowser'

export default function QuestWindow() {
    const followStatusHook = useFollowStatus()
    const { t } = useLocaleResources('public-pages/landings/social-quests')

    const promotions = getPromotions(t)

    return (
        <HeroBrowser grantProPlan={followStatusHook.grantProPlan}>
            <Grid
                padding={{ base: 3, md: 6 }}
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)"
                }}
                gap={{ base: 3, md: 6 }}
            >
                {promotions.map((promotion, index) =>
                    <SocialMediaCard
                        key={index}
                        {...promotion}
                        followStatusHook={followStatusHook}
                    />
                )}

                <MobileQuestCard followStatusHook={followStatusHook} />
            </Grid>
        </HeroBrowser>
    )
}
