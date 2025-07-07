import React from 'react'
import HeroBrowser from './hero-browser/HeroBrowser'
import { promotions } from '../utils/promotionsList'
import SocialMediaCard from './SocialMediaCard'

export default function QuestWindow() {
    return (
        <HeroBrowser>
            {promotions.map((promotion, index) => <SocialMediaCard key={index} {...promotion} />)}
        </HeroBrowser>
    )
}
