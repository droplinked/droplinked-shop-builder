import { useEffect, useState } from 'react';
import { getFollowStatusService, grantProPlanService } from 'lib/apis/quests/services';
import useAppStore from 'stores/app/appStore';
import useAppToast from 'hooks/toast/useToast';

// Constants
const INITIAL_PLATFORMS = {
  X: false,
  DISCORD: false,
  TELEGRAM: false,
  INSTAGRAM: false,
  YOUTUBE: false,
  LINKEDIN: false,
};

export const CARD_STATUSES = {
  NOT_OPENED: 'NOT_OPENED',
  NOT_FOLLOWED: 'NOT_FOLLOWED',
  FOLLOWED: 'FOLLOWED',
  CLAIMED: 'CLAIMED',
  GUEST: 'GUEST',
} as const;

export type CardStatus = keyof typeof CARD_STATUSES;

// Custom Hook
const useFollowStatus = () => {
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>(INITIAL_PLATFORMS);
  const [linkOpened, setLinkOpened] = useState<Record<string, boolean>>({ ...INITIAL_PLATFORMS });
  const [loading, setLoading] = useState(false);
  const { shop } = useAppStore();
  const { showToast } = useAppToast();

  // Fetch follow status when shop is available
  useEffect(() => {
    if (!shop) return;

    const fetchFollowStatus = async () => {
      setLoading(true);
      try {
        const response = await getFollowStatusService();
        const newFollowStatus = { ...INITIAL_PLATFORMS };
        response.data.forEach((item) => {
          newFollowStatus[item.platform] = true;
        });
        setFollowStatus(newFollowStatus);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowStatus();
  }, [shop]);

  // Grant Pro Plan
  const grantProPlan = async () => {
    setLoading(true);
    try {
      const response = await grantProPlanService();
      if (response.status === 201) {
        return { success: true, unlockedMonths: response.data.data.length };
      }
      return { success: false };
    } catch (error) {
      const errorMessage = error?.response?.data?.data?.message || 'Failed to activate Pro Plan. Please try again later.';
      showToast({ message: errorMessage, type: 'error' });
      console.error('Error activating Pro Plan:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Get card status based on platform
  const getCardStatus = (platform: string): CardStatus => {
    if (!shop) return CARD_STATUSES.GUEST;
    if (followStatus[platform]) return CARD_STATUSES.FOLLOWED;
    if (!linkOpened[platform]) return CARD_STATUSES.NOT_OPENED;
    return CARD_STATUSES.NOT_FOLLOWED;
  };

  // Mark a link as opened
  const markLinkOpened = (platform: string) => {
    setLinkOpened((prev) => ({ ...prev, [platform]: true }));
  };

  // Update follow status for a platform
  const updateFollowStatus = (platform: string) => {
    setFollowStatus((prev) => ({ ...prev, [platform]: true }));
  };

  return {
    getCardStatus,
    markLinkOpened,
    linkOpened,
    followStatus,
    grantProPlan,
    updateFollowStatus,
    loading,
  };
};

export default useFollowStatus;