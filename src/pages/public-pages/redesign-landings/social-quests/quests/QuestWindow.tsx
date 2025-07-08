import React from 'react'
import { Grid } from '@chakra-ui/react'
import HeroBrowser from './hero-browser/HeroBrowser'
import { promotions } from '../utils/promotionsList'
import SocialMediaCard from './SocialMediaCard'
import useFollowStatus from '../hook/useFollowStatus'

export default function QuestWindow() {
    const followStatusHook = useFollowStatus()

    return (
        <HeroBrowser>
            <Grid
                padding={6}
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
            </Grid>
        </HeroBrowser>
    )
}
