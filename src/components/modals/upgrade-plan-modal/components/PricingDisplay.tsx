import { Flex, FlexProps, HStack, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { IPrice, SubscriptionPlan } from 'services/subscription/interfaces';

interface PricingDisplayProps extends FlexProps {
  plan: SubscriptionPlan;
  showFree?: boolean;
  planDuration?: number;
  showOriginalPrice?: boolean;
}

export function PricingDisplay({
  plan,
  showFree = false,
  planDuration,
  showOriginalPrice = true,
  ...props
}: PricingDisplayProps) {

  const targetPrice = useMemo(
    () =>
      typeof plan.price[0] === 'string'
        ? null
        : (plan.price as IPrice[]).find(
            (price) => price.month === planDuration
          ),
    [plan.price, planDuration]
  );

  // Get the actual discount for the current duration
  const actualDiscount = useMemo(() => {
    if (typeof plan.price[0] === 'string') return undefined;

    const priceArray = plan.price as IPrice[];
    const currentPrice = priceArray.find(
      (price) => price.month === planDuration
    );
    return currentPrice?.discount;
  }, [plan.price, planDuration]);

  // Calculate original and final prices
  const { originalPrice, finalPrice } = useMemo(() => {
    if (showFree) {
      return { originalPrice: '', finalPrice: 'Free' };
    }

    if (typeof plan.price[0] === 'string') {
      return { originalPrice: '', finalPrice: plan.price[0] as string };
    }

    if (!targetPrice) {
      return { originalPrice: '', finalPrice: 'N/A' };
    }

    const original = targetPrice.discountPrice || targetPrice.price;
    const final = actualDiscount ? targetPrice.price : original;

    return {
      originalPrice: `$${original}`,
      finalPrice: `$${final}`
    };
  }, [plan.price, targetPrice, actualDiscount, showFree]);

  // Don't show original price if it's the same as final price, if final price is Free, or if there's no discount
  const shouldShowOriginal =
    showOriginalPrice &&
    originalPrice !== finalPrice &&
    finalPrice !== 'Free' &&
    originalPrice !== '' &&
    actualDiscount;

  const flexProps = useMemo(
    () => ({
      flexWrap: 'wrap' as const,
      alignItems: 'baseline' as const,
      rowGap: 0,
      columnGap: 3,
      ...props
    }),
    [props]
  );

  return (
    <Flex {...flexProps}>
      <HStack align="flex-end" spacing={2}>
        {shouldShowOriginal && (
          <Text
            color="text.error"
            fontSize="sm"
            fontWeight="normal"
            textDecoration="line-through"
          >
            {originalPrice}
          </Text>
        )}
        <Text color="neutral.white" fontSize="lg" fontWeight="bold">
          {finalPrice}
        </Text>
      </HStack>
    </Flex>
  );
}
