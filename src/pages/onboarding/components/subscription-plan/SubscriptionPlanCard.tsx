import { Box, Flex, Text } from '@chakra-ui/react';
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd';
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm';
import DotSeparatedList from 'components/redesign/dotSeparatedList/DotSeparatedList';
import React, { useState } from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';

type PlanType = keyof typeof subscriptionPlans;

interface PlanPriceProps {
  price: string;
}

const PlanPrice: React.FC<PlanPriceProps> = ({ price }) => {
  return (
    <Text textColor="neutral.white" fontSize="2xl" fontWeight="bold">
      {price}
    </Text>
  );
};

interface SubscriptionPlanCardProps {
  planType: PlanType;
  price: string;
  features: string[];
  isPopular?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

function SubscriptionPlanCard({ planType, price, features, isPopular, isSelected, onSelect }: SubscriptionPlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const plan = subscriptionPlans[planType];
  const Icon = plan.icon;

  return (
    <Box 
      borderWidth="1px" 
      borderColor={isSelected ? "primary.default" : "neutral.gray.800"} 
      borderRadius="16px" 
      data-state="Expanded"
      bg={isSelected ? "rgba(43, 207, 161, 0.10)" : "transparent"}
      cursor="pointer"
      onClick={onSelect}
      transition="all 0.2s"
    >
      <Flex direction="column">
        <Box p={4}>
          <Flex gap={2} mb={4}>
            <Flex p={3} bg={isSelected ? "label.success" : "#1b1b1b"} borderRadius="lg" borderWidth="1px" borderColor={isSelected ? "#2BCFA1" : "neutral.gray.800"} backdropFilter="blur(20px)" justifyContent="center" alignItems="center">
              <Icon color={isSelected ? "#2BCFA1" : "white" } />
            </Flex>
          </Flex>

          <Flex direction="column" gap={2}>
            <Flex direction="column" gap={1}>
              <DotSeparatedList>
                <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
                  {plan.title}
                </Text>
                {isPopular && <Text color="text.primary">Most Popular</Text>}
              </DotSeparatedList>

              <Text color="#b1b1b1" fontSize="sm">
                {plan.description}
              </Text>
            </Flex>
            <Box>
              <PlanPrice price={price} />
            </Box>
          </Flex>
        </Box>

        <Box borderBottom="1px solid" borderColor="neutral.gray.800" />
        <Box p={4} display={isExpanded ? 'block' : 'none'}>
          {features.map((feature) => (
            <Flex key={feature} gap={2} mb={4}>
              <AvailableoutlinedSm color="white" />
              <Text textColor="neutral.white" flex={1} fontSize="sm">
                {feature}
              </Text>
            </Flex>
          ))}
        </Box>

        <Box borderBottom="1px solid"  borderColor={isSelected ? "primary.default" : "neutral.gray.800"}  />

        <Flex px={4} py={2.5} justifyContent="center" alignItems="center" gap={1.5} onClick={() => setIsExpanded(!isExpanded)} cursor="pointer">
          <Text color={isSelected ? "text.primary" : "text.subtextPlaceholder.dark" } fontSize="sm">
            {isExpanded ? 'Less' : 'More'}
          </Text>
          <ChevrondownMd
            color="white"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s ease-in-out'
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default SubscriptionPlanCard; 