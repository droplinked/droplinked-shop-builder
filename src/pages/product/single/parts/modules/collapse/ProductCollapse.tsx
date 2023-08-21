import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import React, { useCallback, useState } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'

interface IProps {
  children: any
  title: string
  description: string
  show?: boolean
}

function ProductCollapse({ children, description, title, show = false }: IProps) {
  const [Show, setShow] = useState(show)

  const toggle = useCallback(() => setShow(prev => !prev), [])

  return (
    <AppCard mini>
      <VStack align={"stretch"} spacing={10}>
        <Flex justifyContent={"space-between"} onClick={toggle} style={{ cursor: "pointer" }} alignItems="center">
          <Box><ProductPageTitle head isReuired title={title} description={description} /></Box>
          <Box><AppIcons.ArrowDown style={{ transition: ".3s", ...Show && { transform: "rotate(180deg)" } }} /></Box>
        </Flex>
        <Box display={Show ? "block" : "none"}>{children}</Box>
      </VStack>
    </AppCard>
  )
}

export default ProductCollapse