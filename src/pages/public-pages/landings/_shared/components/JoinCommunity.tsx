import { Box, Grid } from '@chakra-ui/react'
import SocialMediaLink from 'components/redesign/community-engagement/SocialMediaLink'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/homePage/en.json'
import localAr from 'locales/public-pages/landings/homePage/ar.json'
import { BLUE_SKY_LINK, SOCIAL_MEDIA_LINKS } from 'data/socialMediaLinks'
import Community from '../svgs/Community'
import SectionContainer from './SectionContainer/SectionContainer'

export default function JoinTheCommuity() {
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr })

    return (
        <SectionContainer
            icon='globe'
            sectionTitle={t('joinCommunity.sectionTitle')}
            headingTitle={t('joinCommunity.headingTitle')}
            headingSubtitle={t('joinCommunity.headingSubtitle')}
            typographySvg={<Community style={{ marginBottom: "-26px" }} />}
        >
            <Grid
                width="100%"
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
                gap={4}
                zIndex={1}
            >
                {[...SOCIAL_MEDIA_LINKS, BLUE_SKY_LINK].map((socialMediaLink, index) => (
                    <Box
                        key={index}
                        border="1px solid"
                        borderColor="neutral.gray.900"
                        borderRadius="16px"
                        overflow="hidden"
                        background="neutral.websiteBackground"
                    >
                        <SocialMediaLink
                            linkData={socialMediaLink}
                        />
                    </Box>
                ))}
            </Grid>
        </SectionContainer>
    )
}
