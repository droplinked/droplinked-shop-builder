import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useState } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'

interface IProps {
  children: any
  title: string
  description: string
}

function ProductCollapse({ children, description, title }: IProps) {
  const [Show, setShow] = useState(false)

  const toggle = useCallback(() => setShow(prev => !prev), [])

  return (
    <AppCard mini>
      <VStack align={"stretch"} spacing={10}>
        <Flex justifyContent={"space-between"} onClick={toggle} style={{ cursor: "pointer" }} alignItems="center">
          <Box><ProductPageTitle head isReuired title={title} description={description} /></Box>
          <Box><AppIcons.arrowDown style={{ transition: ".3s", ...Show && { transform: "rotate(180deg)" } }} /></Box>
        </Flex>
        {Show && <Box>{children}</Box>}
      </VStack>
    </AppCard>
  )
}

export default ProductCollapse