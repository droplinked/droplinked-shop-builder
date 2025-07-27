import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

/**
 * DomainGrid Component - A grid layout for displaying multiple domain cards
 * 
 * @param {object} props - Component props
 * @param {string[]} props.domains - Array of domain names to display
 * @param {BoxProps} [props.containerProps] - Props for the container Box
 * @param {BoxProps} [props.rowProps] - Props for each row Box
 * @param {React.ReactNode} [props.children] - Optional children content
 * 
 * @returns {JSX.Element} Grid layout for domain cards
 */
interface DomainGridProps extends BoxProps {
  domains: string[]
  containerProps?: BoxProps
  rowProps?: BoxProps
  children?: React.ReactNode
}

export default function DomainGrid({ 
  domains, 
  containerProps, 
  rowProps, 
  children, 
  ...props 
}: DomainGridProps) {
  // Define the specific layout for the original design
  // Row 1: 6 domains, items-end alignment
  // Row 2: 7 domains, items-center alignment  
  // Row 3: 6 domains, items-end alignment
  const layout = [
    { domains: domains.slice(0, 6), alignItems: "flex-end" as const },
    { domains: domains.slice(6, 13), alignItems: "center" as const },
    { domains: domains.slice(13, 19), alignItems: "flex-end" as const }
  ]

  return (
    <Box
      alignSelf="stretch"
      position="relative"
      display="inline-flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={6}
      overflow="hidden"
      {...containerProps}
      {...props}
    >
      {layout.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          alignSelf="stretch"
          display="inline-flex"
          justifyContent="center"
          alignItems={row.alignItems}
          gap={6}
          {...rowProps}
        >
          {row.domains.map((domain, domainIndex) => (
            <Box
              key={`${rowIndex}-${domainIndex}`}
              w="48"
              px={6}
              py={5}
              borderRadius="2xl"
              border="1px solid"
              borderColor="neutral.800"
              display="inline-flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={4}
            >
              <Box
                alignSelf="stretch"
                textAlign="center"
                justifyContent="flex-start"
                color="white"
                fontSize="lg"
                fontWeight="medium"
                fontFamily="Inter"
                lineHeight={7}
              >
                {domain}
              </Box>
            </Box>
          ))}
        </Box>
      ))}
      {children}
    </Box>
  )
} 