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
      backgroundColor={'neutral.gray.1000'}
      gap={4}
      w="100%"
    >
      <Box w="fit-content" bg="label.primary" border={'1px solid'} borderColor="neutral.gray.800" p={2} borderRadius="8px">
        <plan.icon color="#2BCFA1" />
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
