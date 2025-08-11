import { Flex, Text } from '@chakra-ui/react'
import { SlashMd } from 'assets/icons/Sign/Slash/SlashMd'
import React from 'react'
import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Flex gap={1} justify="flex-start" align="center">
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1
        const content = item.to && !isLast ? (
          <Link to={item.to}>
            <Text color="text.subtext.placeholder.dark" fontSize={{base: "14px", md: "16px"}} fontWeight="400px">
              {item.label}
            </Text>
          </Link>
        ) : (
          <Text color="text.subtext.placeholder.dark" fontSize={{base: "14px", md: "16px"}} fontWeight="400px">
            {item.label}
          </Text>
        )

        return (
          <Flex key={`${item.label}-${index}`} justifyContent="flex-start" alignItems="center" gap={1}>
            {!isFirst && <SlashMd color="#7b7b7b" />}
            {content}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Breadcrumbs



