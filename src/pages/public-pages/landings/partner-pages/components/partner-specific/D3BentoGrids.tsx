// D3-specific features section with bento grid layout
import React from 'react'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import BentoGrids from '../../assets/BentoGrids'
import { Cards } from 'pages/public-pages/landings/_shared/components/card'
import { ShibLogo } from 'assets/logo/NetworkAndTokens/Shib/ShibLogo'
import { VictionLogo } from 'assets/logo/NetworkAndTokens/Viction/VictionLogo'
import { CoreLogo } from 'assets/logo/NetworkAndTokens/Core/CoreLogo'
import { ApeCoinLogo } from 'assets/logo/NetworkAndTokens/apecoin/apecoin'
import { CardData } from 'pages/public-pages/landings/_shared/components/card/Cards'

export default function D3BentoGrids() {

    const cardsData: CardData[] = [
        {
            icon: <ApeCoinLogo />,
            title: "ApeCoin",
            description: ".ape",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            backgroundImage: "https://upload-file-droplinked.s3.amazonaws.com/bb23adf07e89afaa754edaf5a5a021b4ec8dd1adacaae25fac1d98c3d2262e49.png",
            iconBackground: "#0054F91A"
        },
        {
            icon: <VictionLogo color='#fff' />,
            title: "Victorin",
            description: ".vic",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            backgroundImage: "https://upload-file-droplinked.s3.amazonaws.com/3b267338fafe2d949cc602a5e73f347e463462872010678c5f1a0c6e593eaefa.png",
            iconBackground: "#FFFFFF1A"
        },
        {
            icon: <ShibLogo />,
            title: "Shiba Inu",
            description: ".shib",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            backgroundImage: "https://upload-file-droplinked.s3.amazonaws.com/d1052b5fb4a1d79c1e56a5d9beb01e7a17dc4cd8fc697fd8d005fe8dcaed9a1f.png",
            iconBackground: "#F005001A"
        },
        {
            icon: <CoreLogo/>,
            title: "Core Chain",
            description: ".core",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            backgroundImage: "https://upload-file-droplinked.s3.amazonaws.com/9a13e6980076cf1772ec176be9de67163aecb451b36d5536109449eaf70b0fbc.png",
            iconBackground: "#FF92111A"
        },
       
    ]

    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle='SET OF FEATURES'
            headingTitle={`Join Your Community`}
            headingSubtitle={`Unlock exclusive perks and benefits today by proving ownership`}
            typographySvg={<BentoGrids />}
        >
            <Cards
                cardsData={cardsData}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)'
                }}
            />
        </SectionContainer>

        
    )
} 