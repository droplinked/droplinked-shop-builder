import React from 'react'
import { Box, VStack, Heading, Text } from '@chakra-ui/react'
import DomainGrid from './DomainGrid'
import DomainCard from '../domain-card'

/**
 * Example component demonstrating different ways to use DomainGrid and DomainCard
 */
export default function DomainGridExample() {
  // Example 1: Simple domain list
  const simpleDomains = ['.com', '.org', '.net', '.io', '.tech', '.app']
  
  // Example 2: Custom layout with specific domains
  const customDomains = [
    '.tech', '.moon', '.store', '.pudgy', '.com', '.unstoppable',
    '.dream', '.live', '.space', '.group', '.org', '.net', '.life',
    '.digital', '.secret', '.polygon', '.pw', '.io', '.site'
  ]

  return (
    <VStack spacing={8} align="stretch">
      {/* Example 1: Simple grid */}
      <Box>
        <Heading size="md" mb={4}>Simple Domain Grid</Heading>
        <DomainGrid domains={simpleDomains} />
      </Box>

      {/* Example 2: Custom layout matching original design */}
      <Box>
        <Heading size="md" mb={4}>Custom Layout Grid</Heading>
        <DomainGrid domains={customDomains} />
      </Box>

      {/* Example 3: Individual domain cards */}
      <Box>
        <Heading size="md" mb={4}>Individual Domain Cards</Heading>
        <Box display="flex" gap={4} flexWrap="wrap">
          <DomainCard domain=".com" />
          <DomainCard domain=".org" />
          <DomainCard domain=".net" />
          <DomainCard domain=".io" />
        </Box>
      </Box>

      {/* Example 4: Custom styled domain card */}
      <Box>
        <Heading size="md" mb={4}>Custom Styled Domain Card</Heading>
        <DomainCard 
          domain=".custom" 
          bg="main.primary"
          borderColor="main.primary"
          _hover={{ bg: 'main.secondary', borderColor: 'main.secondary' }}
          transition="all 0.2s"
        />
      </Box>
    </VStack>
  )
} 