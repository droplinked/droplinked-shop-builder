import { useEffect, useState } from 'react';
import { getFollowStatusService, grantProPlanService } from 'lib/apis/quests/services';
import useAppStore from 'lib/stores/app/appStore';

const INITIAL_PLATFORMS = {
  'X': false,
  'DISCORD': false,
  'TELEGRAM': false,
  'INSTAGRAM': false,
  'YOUTUBE': false,
  'LINKEDIN': false
};

const useFollowStatus = () => {
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(INITIAL_PLATFORMS);
  const [allPlatformsFollowed, setAllPlatformsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { shop } = useAppStore();

  useEffect(() => {
    if (shop) {
      setLoading(true);
      const fetchFollowStatus = async () => {
        try {
          const response = await getFollowStatusService();
          const newFollowStatus = { ...INITIAL_PLATFORMS };
          response.data.forEach(item => {
            newFollowStatus[item.platform] = true;
          });
          setFollowStatus(newFollowStatus);
          setAllPlatformsFollowed(Object.values(newFollowStatus).every(Boolean));
        } catch (error) {
          console.error('Error fetching follow status:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchFollowStatus();
    }
  }, [shop]);

  const grantProPlan = async () => {
    setLoading(true);
    try {
      await grantProPlanService();
      alert('Pro Plan Activated!');
    } catch (error) {
      console.error('Error activating Pro Plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFollowStatus = (platform) => {
    const updatedStatus = { ...followStatus, [platform]: true };
    setFollowStatus(updatedStatus);
    setAllPlatformsFollowed(Object.values(updatedStatus).every(Boolean));
  };

  return {
    followStatus,
    allPlatformsFollowed,
    grantProPlan,
    updateFollowStatus,
    loading
  };

};

export default useFollowStatus;
