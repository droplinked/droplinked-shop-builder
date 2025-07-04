// Shared claim button section with partner-specific navigation logic
import React from 'react'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { usePartnerClaimHandlers } from '../hooks/usePartnerClaimHandlers'
import ClaimNowButton from './ClaimNowButton'

interface ClaimNowProps {
  partnerId: string;
  trialMonths: number;
}

export default function ClaimNow({ partnerId, trialMonths }: ClaimNowProps) {
  const claimHandlers = usePartnerClaimHandlers();
  
  const getClaimHandler = () => {
    switch (partnerId) {
      case 'd3':
        return claimHandlers.handleD3Claim;
      case 'unstoppableDomains':
        return claimHandlers.handleUnstoppableDomainsClaim;
      case 'polygon':
        return claimHandlers.handlePolygonClaim;
      case 'crossmint':
        return claimHandlers.handleCrossmintClaim;
      default:
        return () => console.log('No claim handler for partner:', partnerId);
    }
  };

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={8} textAlign="center">
        <Heading size="2xl">
          Ready to Get Started?
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="600px">
          Claim your {trialMonths} months of Pro Plan access and start building your business today.
        </Text>
        <Box>
          <ClaimNowButton onClaim={getClaimHandler()} />
        </Box>
      </VStack>
    </Container>
  )
} 