import { Flex, Text } from '@chakra-ui/react'
import { SlashMd } from 'assets/icons/Sign/Slash/SlashMd'
import React from 'react'
import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  to: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Flex gap={1} justify="flex-start" align="center">
      {items.map((item, index) => {
        const isFirst = index === 0
        
        const content = (
          <Link to={item.to}>
            <Text 
              color="text.subtext.placeholder.dark" 
              fontSize={{base: "14px", md: "16px"}} 
              fontWeight="400" 
              _hover={{color: "white"}}
            > 
              {item.label}
            </Text>
          </Link>
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



