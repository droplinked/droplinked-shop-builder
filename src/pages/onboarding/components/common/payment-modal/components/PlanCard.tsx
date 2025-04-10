import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

export default function PlanCard({ plan }) {
  return (
    <Flex
      direction={'column'}
      border={'1px solid'}
      borderColor={'neutral.gray.800'}
      borderRadius={8}
      padding={{ xl: 9, base: 6 }}
      backgroundImage={'/assets/images/popular-plan-bg.png'}
      backgroundColor={'neutral.gray.1000'}
      backgroundPosition={'top right'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'auto 180%'}
      gap={4}
      w="100%"
    >
      <Box w="fit-content" bg="neutral.gray.900" border={'1px solid'} borderColor="neutral.gray.800" p={2} borderRadius="8px">
        <plan.icon color="white" />
      </Box>
      <Flex flexDir="column">
        <AppTypography color="#fff" fontSize="18px" fontWeight={700}>
          {plan.title}
        </AppTypography>
        <AppTypography color="#B1B1B1" fontSize="14px" fontWeight={400}>
          {plan.description}
        </AppTypography>
      </Flex>
    </Flex>
  );
}
