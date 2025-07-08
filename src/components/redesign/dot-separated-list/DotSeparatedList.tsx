import { Circle, Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface DotSeparatedListProps extends FlexProps {
  dotColor?: string
}

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
function DotSeparatedList({ children, dotColor, ...props }: DotSeparatedListProps) {
  const validChildren = React.Children.toArray(children).filter(Boolean)

  if (validChildren.length === 0) return null

  return (
    <Flex flexWrap="wrap" alignItems="center" gap={2} {...props}>
      {validChildren.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < validChildren.length - 1 && <Circle className="dot-separator" size={1} bg={dotColor || "neutral.gray.800"} />}
        </React.Fragment>
      ))}
    </Flex>
  )
}

export default DotSeparatedList