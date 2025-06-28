import { Box, Grid } from '@chakra-ui/react'
import SocialMediaLink from 'components/redesign/community-engagement/SocialMediaLink'
import React from 'react'
import { BLUE_SKY_LINK, SOCIAL_MEDIA_LINKS } from 'utils/constants/socialMediaLinks'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Community from '../svgs/Community'

export default function JoinTheCommuity() {
    return (
        <SectionContainer
            icon='globe'
            sectionTitle='GROW TOGETHER'
            headingTitle='Join the Community'
            headingSubtitle='Follow us across our channels to get the latest news, updates and exclusive offers'
            typographySvg={<Community style={{ marginBottom: "-26px" }} />}
        >
            <Grid
                width="100%"
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
                gap={4}
            >
                {[...SOCIAL_MEDIA_LINKS, BLUE_SKY_LINK].map((socialMediaLink) => (
                    <Box
                        border="1px solid"
                        borderColor="neutral.gray.900"
                        borderRadius="16px"
                        overflow="hidden"
                        background="neutral.websiteBackground"
                    >
                        <SocialMediaLink
                            key={socialMediaLink.label}
                            linkData={socialMediaLink}
                        />
                    </Box>
                ))}
            </Grid>
        </SectionContainer>
    )
}
