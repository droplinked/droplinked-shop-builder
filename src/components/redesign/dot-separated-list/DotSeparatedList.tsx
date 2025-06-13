import { Circle, Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

/**
 * Displays a horizontal list of children separated by dots.
 * Ideal for creating visually distinct sections between inline items.
 *
 * @example
 * <DotSeparatedList>
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 *   <Text>Item 3</Text>
 * </DotSeparatedList>
 */
function DotSeparatedList({ children, ...props }: FlexProps) {
  const validChildren = React.Children.toArray(children).filter(Boolean)

  if (validChildren.length === 0) return null

  return (
    <Flex alignItems="center" gap={2} {...props}>
      {validChildren.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < validChildren.length - 1 && <Circle className="dot-separator" size={1} bg="neutral.gray.800" />}
        </React.Fragment>
      ))}
    </Flex>
  )
}

export default DotSeparatedList