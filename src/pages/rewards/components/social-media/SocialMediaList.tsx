import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import SocialMediaCard from './SocialMediaCard';

import useFollowStatus from 'pages/rewards/hook/useFollowStatus';
import { trackFollowService } from 'lib/apis/quests/services';
import useAppStore from 'lib/stores/app/appStore';
import AppIcons from 'assest/icon/Appicons';
import useAppToast from 'functions/hooks/toast/useToast';

const promotions = [
  { title: 'Follow us on X', description: 'Free Pro Plan', duration: '1 month', platform: 'X', link: 'https://twitter.com/droplinked', icon: <AppIcons.ColorfulXTwitter width="24px" height="24px" /> },
  { title: 'Join our Discord', description: 'Free Pro Plan', duration: '1 month', platform: 'DISCORD', link: 'https://discord.com/channels/1068939465025916959/1088500920406515763', icon: <AppIcons.ColorfulDiscord width="24px" height="24px" /> },
  { title: 'Join our Telegram', description: 'Free Pro Plan', duration: '1 month', platform: 'TELEGRAM', link: 'https://t.me/droplinked', icon: <AppIcons.ColorfulTelegram width="24px" height="24px" style={{ flexShrink: 0 }} /> },
  { title: 'Follow us on Instagram', description: 'Free Pro Plan', duration: '1 month', platform: 'INSTAGRAM', link: 'https://www.instagram.com/drop_linked', icon: <AppIcons.ColorfulInstagram width="24px" height="24px" /> },
  { title: 'Subscribe to our YouTube', description: 'Free Pro Plan', duration: '1 month', platform: 'YOUTUBE', link: 'https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed', icon: <AppIcons.ColorfulYouTube width="24px" height="24px" /> },
  { title: 'Follow us on LinkedIn', description: 'Free Pro Plan', duration: '1 month', platform: 'LINKEDIN', link: 'https://www.linkedin.com/company/droplinked', icon: <AppIcons.ColorfulLinkedin width="24px" height="24px" /> }
];

function SocialMediaList() {
  const [columns, setColumns] = useState('repeat(1, 1fr)');
  const {followStatus, allPlatformsFollowed, updateFollowStatus } = useFollowStatus();
  const {shop } = useAppStore();
  const { showToast } = useAppToast()

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 768 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = async (platform, link) => {
    if (!shop) return;
    window.open(link, '_blank');
    try {
      await trackFollowService({ platform });
      updateFollowStatus(platform);
    } catch (error) {
      showToast({message: `Failed to track follow on ${platform}. Please try again later.`,type: "error" });
    }
  };

  return (
    <Box display="flex" pb="160px" flexDirection="column" gap={6} overflow="hidden" zIndex={2}>
      <Grid templateColumns={columns} gap={6}>
        {promotions.map((promo, index) => (
          <SocialMediaCard
            key={index}
            title={promo.title}
            description={promo.description}
            duration={promo.duration}
            icon={promo.icon}
            onClick={() => handleCardClick(promo.platform, promo.link)}
            cursor={followStatus[promo.platform] ? 'default' : 'pointer'}
            isFollowed={followStatus[promo.platform]}
            allFollowed={allPlatformsFollowed}
          />
        ))}
      </Grid>
    </Box>
  );

}

export default SocialMediaList;
