import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { SubscriptionPlan } from '../../../../services/subscription/interfaces';
import { getSubscriptionPlansService } from '../../../../services/subscription/subscriptionServices';
import useSubscriptionPlanStore, { planDurations } from '../../../../stores/subscription-plan.ts/subscriptionPlanStore';
import { BillingCycleSelectorProps } from '../types/upgradePlan.types';
import { BillingOptionCard } from './BillingOptionCard';

export interface BillingOption {
  name: string;
  month: number;
  discount?: string;
  originalPrice: string;
  finalPrice: string;
  isSelected?: boolean;
  stripePriceId?: string;
  plan: SubscriptionPlan;
  showFree?: boolean;
}

// Move getDurationName function before it's used
const getDurationName = (months: number): string => {
  switch (months) {
    case 1:
      return 'Monthly';
    case 12:
      return 'Annually';
    case 36:
      return '3-Year';
    default:
      return `${months} Month${months > 1 ? 's' : ''}`;
  }
};

export default function BillingCycleSelector({
  plan,
  isDrawer = false,
  canActivateTrial
}: BillingCycleSelectorProps) {
  const [allPlans, setAllPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { preferredPlanDuration, updatePlanDuration } = useSubscriptionPlanStore();


  // Fetch plans only once when component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getSubscriptionPlansService();
        setAllPlans(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []); // Empty dependency array - only fetch once

  // Memoize billing options based on plan, isTrial, and allPlans
  const billingOptions = useMemo(() => {
    if (!allPlans.length) return [];

    // Filter plans by type (convert planType to match the API format)
    const planTypeMap: Record<string, string> = {
      'pro': 'BUSINESS',
      'premium': 'BUSINESS_PRO', 
      'enterprise': 'ENTERPRISE'
    };
    
    const targetPlanType = planTypeMap[plan] || 'BUSINESS';
    const targetPlan = allPlans.find(plan => plan.type === targetPlanType);
    
    if (!targetPlan) return [];
    
    const options: BillingOption[] = [];
    
    if (Array.isArray(targetPlan.price)) {
      // Use the existing planDurations from the store
      planDurations.forEach((duration) => {
        const priceOption = (targetPlan.price as any[]).find((p: any) => p.month === duration.month);
        
        if (priceOption) {
          // Use the duration's own discount, not the store's preferredPlanDuration.discount
          const discount = duration.discount;
          const discountPercentage = discount ? `-${discount}%` : undefined;
          
          // Only show free for pro plan, first month, when isTrial is true
          const shouldShowFree = plan === 'pro' && duration.month === 1 && canActivateTrial;
          
          const option: BillingOption = {
            name: getDurationName(duration.month),
            month: duration.month,
            discount: discountPercentage,
            originalPrice: `$${priceOption.price}`,
            finalPrice: priceOption.discountPrice ? `$${priceOption.discountPrice}` : `$${priceOption.price}`,
            stripePriceId: priceOption.stripePriceId,
            isSelected: duration.month === preferredPlanDuration.month,
            plan: targetPlan,
            showFree: shouldShowFree
          };
          
          options.push(option);
        }
      });
    } else if (typeof targetPlan.price === 'string') {
      // Handle string price (e.g., "FREE")
        const shouldShowFree = plan === 'pro' && canActivateTrial;
      
      options.push({
        name: 'Monthly',
        month: 1,
        originalPrice: targetPlan.price === 'FREE' ? '$0' : targetPlan.price,
        finalPrice: targetPlan.price === 'FREE' ? 'Free' : targetPlan.price,
        isSelected: true,
        plan: targetPlan,
        showFree: shouldShowFree
      });
    }
    
    return options;
  }, [plan, canActivateTrial, allPlans, preferredPlanDuration.month]);

  const handleBillingOptionSelect = (selectedOption: BillingOption) => {
    // Update the store with the selected duration
    const selectedDuration = planDurations.find(d => d.month === selectedOption.month);
    if (selectedDuration) {
      updatePlanDuration(selectedDuration);
    }
    
    // Note: We don't need to update local state since billingOptions is memoized
    // and will automatically update when preferredPlanDuration changes
  };

  if (loading) {
    return (
      <Box
        w="100%"
        minHeight={isDrawer ? 'auto' : '432px'}
        p={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" color="main.primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        w="100%"
        minHeight={isDrawer ? 'auto' : '432px'}
        p={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="red.500" fontSize="base">
          Error loading plans: {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      w="100%"
      minHeight={isDrawer ? 'auto' : '432px'}
      p={12}
      display="flex"
      flexDirection="column"
      gap={12}
    >
      <VStack align="flex-start" gap={4}>
        <Text color="neutral.white" fontSize="base" fontWeight="normal">
          Billing Cycle
        </Text>

        <VStack align="flex-start" gap={4} w="100%">
          {billingOptions.map((option) => (
            <BillingOptionCard 
              key={option.month} 
              option={option} 
              onSelect={handleBillingOptionSelect}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
