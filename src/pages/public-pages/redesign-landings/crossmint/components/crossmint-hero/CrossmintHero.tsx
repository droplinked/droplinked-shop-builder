import React from 'react'
import HeroSection from '../../../_shared/components/hero-section/HeroSection'
import Animation from '../../lottie/Crossmint.json'
import SubtitleElements from './SubtitleElements'

export default function CrossmintHero() {
    return (
        <HeroSection
            title={`Powering \n Agentic Commerce`}
            subtitle={`Crossmint members unlock 3 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today.`}
            backgroundImage="https://upload-file-droplinked.s3.amazonaws.com/bb43d560151ac7d20966da30d1d9affdd9b462943a49cbf40e4f893e35c94b07.png"
            heroDesktop={Animation}
            heroMobile={Animation}
            heroTablet={Animation}
            lottieOptions={{
                loop: true,
            }}
            subTitleElements={
                <SubtitleElements />
            }
        />
    )
}
