import { Box, HStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import { getFollowStatusService, trackFollowService } from 'lib/apis/quests/services';
import useAppStore from 'lib/stores/app/appStore';
import React, { useEffect, useState } from 'react';
import SocialMediaCard from './SocialMediaCard';

const socialMediaPromotions = [
  {
    title: 'Follow us on X',
    description: 'Free Pro Plan',
    duration: '1 month',
    platform: 'X',
    link: 'https://twitter.com/droplinked',
    icon: <AppIcons.ColorfulXTwitter width="24px" height="24px" />
  },
  {
    title: 'Join our Discord',
    description: 'Free Pro Plan',
    duration: '1 month',
    platform: 'DISCORD',
    link: 'https://discord.com/channels/1068939465025916959/1088500920406515763',
    icon: <AppIcons.ColorfulDiscord width="24px" height="24px" />
  },
  {
    title: 'Join our Telegram',
    description: 'Free Pro Plan',
    duration: '1 month',
    platform: 'TELEGRAM',
    link: 'https://t.me/droplinked',
    icon: <AppIcons.ColorfulTelegram width="24px" height="24px" style={{ flexShrink: 0 }} />
  },
  {
    title: 'Follow us on Instagram',
    description: 'Free Pro Plan',
    duration: '1 month',
    platform: 'INSTAGRAM',
    link: 'https://www.instagram.com/drop_linked',
    icon: <AppIcons.ColorfulInstagram width="24px" height="24px" />
  },
  {
    title: 'Subscribe to our YouTube',
    description: 'Free Pro Plan',
    duration: '1 month',
    platform: 'YOUTUBE',
    link: 'https://youtube.com/@droplinked-fj6nt?si=DzYuLrPc2z37_xed',
    icon: <AppIcons.ColorfulYouTube width="24px" height="24px" />
  },
  {
    title: 'Follow us on LinkedIn',
    description: 'Free Pro Plan',
    duration: '1 month',
    platform: 'LINKEDIN',
    link: 'https://www.linkedin.com/company/droplinked',
    icon: <AppIcons.ColorfulLinkedin width="24px" height="24px" />
  }
];

const SocialMediaPromotion = () => {
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});
  const [allFollowed, setAllFollow] = useState<boolean>(false);
  const { shop } = useAppStore();

  const fetchFollowStatus = async () => {
    try {
      const response = await getFollowStatusService();
      const formattedStatus = response.data.reduce((acc: { [key: string]: boolean }, item: any) => {
        acc[item.platform] = item.followed;
        return acc;
      }, {});
      setFollowStatus(formattedStatus);
      setAllFollow(Object.values(formattedStatus).every(Boolean));
    } catch (error) {
      console.error('Error fetching follow status:', error);
    }
  };

  

  useEffect(() => {
    if (shop) {
      fetchFollowStatus();
    }
  }, [shop]);

  const handleCardClick = async (platform: string, link: string) => {
    if (!shop) return;
    window.open(link, '_blank');
    try {
        await trackFollowService({ platform });
        const updatedFollowStatus = { ...followStatus, [platform]: true };
        setFollowStatus(updatedFollowStatus);
        setAllFollow(Object.values(updatedFollowStatus).every(Boolean)); 
    } catch (error) {
        console.error('Error tracking follow:', error);
    }
};

  const renderSocialMediaCards = () => {
    return socialMediaPromotions.map((promo, index) => (
      <SocialMediaCard
        key={index}
        title={promo.title}
        description={promo.description}
        duration={promo.duration}
        icon={promo.icon}
        onClick={() => !followStatus[promo.platform] && handleCardClick(promo.platform, promo.link)}
        cursor={followStatus[promo.platform] ? 'default' : 'pointer'}
        isFollowed={followStatus[promo.platform]}
        allFollowed={allFollowed}
      />
    ));
  };

  return (
    <Box display="flex" pb="160px" flexDirection="column" gap={6} overflow="hidden" zIndex={2}>
      {Array.from({ length: 3 }).map((_, index) => (
        <HStack key={index} spacing={6}>
          {renderSocialMediaCards().slice(index * 2, index * 2 + 2)}
        </HStack>
      ))}
    </Box>
  );
};

export default SocialMediaPromotion;
