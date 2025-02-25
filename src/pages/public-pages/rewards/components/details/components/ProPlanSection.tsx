import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';

const ProPlanSection = () => {
  const features = [
    'Token gating',
    'Mint-to-Merch',
    'Unlimited tokenization',
    'Unlimited digital goods',
    'Unlimited physical products',
    'Customizable domains',
    'Customizable fav icon',
    'Customizable shipping',
    'Digital coupons and giftcards',
    'Warehouse system integration',
    'Premium customer support'
  ];

  return (
    <Box w={{ base: '100%', lg: '526px' }} flexShrink={0} position="relative">
      <Box h="full" w="100%" borderRadius="3xl" border="1px solid #222222" display="flex" flexDirection="column" overflow="hidden" position="relative" zIndex="1">
        <Box display="flex" flexDirection="column" gap={4} p={6}>
          <Box w="56px" h="56px" bg="#141414" borderRadius="xl" border="1px solid #222222" backdropFilter="blur(10px)" display="flex" justifyContent="center" alignItems="center">
            <AppIcons.ProPlan width={'24px'} height={'24px'} color="#2BCFA1" />
          </Box>
          <VStack spacing={1} align="start">
            <Text fontSize="xl" fontWeight="bold" color="white">
              Pro Plan
            </Text>
            <Text fontSize="base" color="#7b7b7b">
              Enjoy premium features.
            </Text>
          </VStack>
        </Box>

        <Flex w="100%" h="100%" justify="center" align="start" overflow="visible" alignItems="stretch">
          {/* Box 1 */}
          <Box
            flex="1"
            border="1px solid rgba(255, 255, 255, 0.16)"
            bg="radial-gradient(1011.8% 141.42% at 0% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), #010101"
            borderRadius="2xl"
            borderBottom="none"
            position="relative"
            transform="translateX(-30%)"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)'
            }}
          />

          {/* Box 2 */}
          <Box
            flex="grow"
            minWidth="300px"
            p="8"
            bgPosition="center"
            borderRadius="2xl"
            border="1px solid #2bcfa1"
            borderBottom="none"
            bgImage="url('/assets/images/rewards/Light greyish.svg')"
            position="relative"
          >
            <Text position="absolute" right="32px" top="32px" color="var(--Text-White, #FFF)" fontFamily="Inter" fontSize="36px" fontStyle="normal" fontWeight="700" lineHeight="52px" opacity="0.04">
              Pro
            </Text>

            <VStack align="start" spacing={4} h="100%">
              <Box w="56px" h="56px" borderRadius="xl" border="2px solid rgba(43, 207, 161, 0.08)" backdropFilter="blur(10px)" display="flex" justifyContent="center" alignItems="center">
                <AppIcons.ProPlan width={'24px'} height={'24px'} color="white" />
              </Box>

              <VStack spacing={1} align="start">
                <Text fontSize="xl" fontWeight="bold" color="white">
                  Pro Plan
                </Text>
                <Text fontSize="base" color="#b1b1b1">
                  For small businesses and teams ready to grow.
                </Text>
              </VStack>

              <VStack spacing={4} align="start">
                <Text fontSize="base" color="#b1b1b1">
                  Includes everything in Starter, plus:
                </Text>
                {features.map((feature, index) => (
                  <HStack key={index} spacing={2}>
                    <AppIcons.Tick style={{ flexShrink: 0 }} />
                    <Text fontSize="sm" color="white">
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* Box 3 */}
          <Box
            flex="1"
            border="1px solid rgba(255, 255, 255, 0.16)"
            bg="radial-gradient(1011.8% 141.42% at 0% 0%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 100%), #010101"
            borderRadius="2xl"
            borderBottom="none"
            position="relative"
            transform="translateX(30%)"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)'
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProPlanSection;
