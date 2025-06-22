import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import { BLUE_SKY_LINK, SOCIAL_MEDIA_LINKS } from 'utils/constants/socialMediaLinks'
import SocialMediaLink from 'components/redesign/community-engagement/SocialMediaLink'

export default function JoinTheCommuity() {
    return (
        <MaxWidthWrapper my="80px">
            <SectionContainer
                icon='globe'
                sectionTitle='GROW TOGETHER'
                headingTitle='Join the Community'
                headingSubtitle='Follow us across our channels to get the latest news, updates and exclusive offers'
                typographyText='Community!'
            >
                <Grid
                    width="100%"
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    gap={4}
                >
                    {[...SOCIAL_MEDIA_LINKS, BLUE_SKY_LINK].map((socialMediaLink) => (
                        <Box
                            border="1px solid"
                            borderColor="neutral.gray.900"
                            borderRadius="16px"
                        >
                            <SocialMediaLink
                                linkProps={{
                                    borderRadius: "16px"
                                }}
                                key={socialMediaLink.label}
                                linkData={socialMediaLink}
                            />
                        </Box>
                    ))}
                </Grid>
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
