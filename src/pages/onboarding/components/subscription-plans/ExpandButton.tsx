import { Flex, Text } from '@chakra-ui/react'
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd'
import React from 'react'

interface ExpandButtonProps {
  isExpanded: boolean
  isSelected: boolean
  onToggle: () => void
}

function ExpandButton({ isExpanded, isSelected, onToggle }: ExpandButtonProps) {

  return (
    <Flex
      px={4}
      py={2.5}
      justifyContent="center"
      alignItems="center"
      gap={1.5}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      cursor="pointer"
    >
      <Text color={isSelected ? 'text.primary' : 'text.subtext.placeholder.dark'} fontSize="sm">
        {isExpanded ? 'Less' : 'More'}
      </Text>
      <ChevrondownMd
        color={isSelected ? '#2bcfa1' : '#7b7b7b'}
        style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s ease-in-out'
        }}
      />
    </Flex>
  )
}

export default ExpandButton
