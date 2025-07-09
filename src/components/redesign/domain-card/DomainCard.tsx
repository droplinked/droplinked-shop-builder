import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

/**
 * DomainCard Component - A reusable card component for displaying domain names
 * 
 * @param {object} props - Component props
 * @param {string} props.domain - The domain name to display (e.g., ".tech", ".com")
 * @param {BoxProps} [props.boxProps] - Additional props for the Box component
 * @param {React.ReactNode} [props.children] - Optional children content
 * 
 * @returns {JSX.Element} Styled domain card component
 */
interface DomainCardProps extends BoxProps {
  domain: string
  children?: React.ReactNode
}

export default function DomainCard({ domain, children, ...props }: DomainCardProps) {
  return (
    <Box
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
      {...props}
    >
      <Box
        textAlign="center"
        color="white"
        fontSize="lg"
        fontWeight="medium"
        fontFamily="Inter"
        lineHeight={7}
      >
        {domain}
      </Box>
      {children}
    </Box>
  )
} 