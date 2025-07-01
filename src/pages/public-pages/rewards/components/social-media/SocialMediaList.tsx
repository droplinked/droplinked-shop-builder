import { Grid } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import SocialMediaCard from './components/SocialMediaCard'
import localEn from 'locales/rewards/en.json';
import localAr from 'locales/rewards/ar.json'

export interface Promotion {
  title: string;
  description: string;
  duration: string;
  platform: string;
  link: string;
  icon: React.ReactNode;
}

const SocialMediaList = () => {
  const { t } = useLocaleResources('rewards', { en: localEn , ar:localAr });

  const getPromotions = (t: any): Promotion[] => [
    { 
      title: t('socialMedia.promotions.x.title'), 
      description: t('socialMedia.promotions.x.description'), 
      duration: t('socialMedia.promotions.x.duration'), 
      platform: 'X', 
      link: 'https://twitter.com/droplinked', 
      icon: <AppIcons.ColorfulXTwitter width="24px" height="24px" /> 
    },
    { 
      title: t('socialMedia.promotions.discord.title'), 
      description: t('socialMedia.promotions.discord.description'), 
      duration: t('socialMedia.promotions.discord.duration'), 
      platform: 'DISCORD', 
      link: 'https://discord.com/channels/1068939465025916959/1088500920406515763', 
      icon: <AppIcons.ColorfulDiscord width="24px" height="24px" /> 
    },
    { 
      title: t('socialMedia.promotions.telegram.title'), 
      description: t('socialMedia.promotions.telegram.description'), 
      duration: t('socialMedia.promotions.telegram.duration'), 
      platform: 'TELEGRAM', 
      link: 'https://t.me/droplinked', 
      icon: <AppIcons.ColorfulTelegram width="24px" height="24px" style={{ flexShrink: 0 }} /> 
    },
    { 
      title: t('socialMedia.promotions.instagram.title'), 
      description: t('socialMedia.promotions.instagram.description'), 
      duration: t('socialMedia.promotions.instagram.duration'), 
      platform: 'INSTAGRAM', 
      link: 'https://www.instagram.com/drop_linked', 
      icon: <AppIcons.ColorfulInstagram width="24px" height="24px" /> 
    },
    { 
      title: t('socialMedia.promotions.youtube.title'), 
      description: t('socialMedia.promotions.youtube.description'), 
      duration: t('socialMedia.promotions.youtube.duration'), 
      platform: 'YOUTUBE', 
      link: 'https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed', 
      icon: <AppIcons.ColorfulYouTube width="24px" height="24px" /> 
    },
    { 
      title: t('socialMedia.promotions.linkedin.title'), 
      description: t('socialMedia.promotions.linkedin.description'), 
      duration: t('socialMedia.promotions.linkedin.duration'), 
      platform: 'LINKEDIN', 
      link: 'https://www.linkedin.com/company/droplinked', 
      icon: <AppIcons.ColorfulLinkedin width="24px" height="24px" /> 
    }
  ];

  const promotions = getPromotions(t);

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
      pb="160px"
      zIndex={100}
    >
      {promotions.map((promotion, index) => <SocialMediaCard key={index} promotion={promotion} />)}
    </Grid>
  )
}

export default SocialMediaList