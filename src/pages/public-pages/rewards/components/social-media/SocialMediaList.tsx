import { Grid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import SocialMediaCard from './SocialMediaCard'

const promotions = [
  { title: 'Follow us on X', description: 'Free Pro Plan', duration: '1 month', platform: 'X', link: 'https://twitter.com/droplinked', icon: <AppIcons.ColorfulXTwitter width="24px" height="24px" /> },
  { title: 'Join our Discord', description: 'Free Pro Plan', duration: '1 month', platform: 'DISCORD', link: 'https://discord.com/channels/1068939465025916959/1088500920406515763', icon: <AppIcons.ColorfulDiscord width="24px" height="24px" /> },
  { title: 'Join our Telegram', description: 'Free Pro Plan', duration: '1 month', platform: 'TELEGRAM', link: 'https://t.me/droplinked', icon: <AppIcons.ColorfulTelegram width="24px" height="24px" style={{ flexShrink: 0 }} /> },
  { title: 'Follow us on Instagram', description: 'Free Pro Plan', duration: '1 month', platform: 'INSTAGRAM', link: 'https://www.instagram.com/drop_linked', icon: <AppIcons.ColorfulInstagram width="24px" height="24px" /> },
  { title: 'Subscribe to our YouTube', description: 'Free Pro Plan', duration: '1 month', platform: 'YOUTUBE', link: 'https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed', icon: <AppIcons.ColorfulYouTube width="24px" height="24px" /> },
  { title: 'Follow us on LinkedIn', description: 'Free Pro Plan', duration: '1 month', platform: 'LINKEDIN', link: 'https://www.linkedin.com/company/droplinked', icon: <AppIcons.ColorfulLinkedin width="24px" height="24px" /> }
]

function SocialMediaList() {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
      pb="160px"
    >
      {promotions.map((promotion, index) => <SocialMediaCard key={index} promotion={promotion} />)}
    </Grid>
  )
}

export default SocialMediaList