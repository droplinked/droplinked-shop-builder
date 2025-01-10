// hooks/useFollowStatus.ts
import { useEffect, useState } from 'react';
import { getFollowStatusService, grantProPlanService } from 'lib/apis/quests/services';
import useAppStore from 'lib/stores/app/appStore';

const useFollowStatus = () => {
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});
  const [allPlatformsFollowed, setAllPlatformsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { shop } = useAppStore();

  useEffect(() => {
    if (shop) {
      const fetchFollowStatus = async () => {
        try {
          const response = await getFollowStatusService();
          const formattedStatus = response.data.reduce((acc, item) => {
            acc[item.platform] = item.followed;
            return acc;
          }, {});
          setFollowStatus(formattedStatus);
          setAllPlatformsFollowed(Object.values(formattedStatus).every(Boolean));
        } catch (error) {
          console.error('Error fetching follow status:', error);
        }
      };
      fetchFollowStatus();
    }
  }, []);

  const grantProPlan = async () => {
    setLoading(true);
    try {
      await grantProPlanService();
      alert('Pro Plan Activated!');
      setAllPlatformsFollowed(true);
    } catch (error) {
      console.error('Error activating Pro Plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    followStatus,
    allPlatformsFollowed,
    grantProPlan,
    loading
  };
};

export default useFollowStatus;
