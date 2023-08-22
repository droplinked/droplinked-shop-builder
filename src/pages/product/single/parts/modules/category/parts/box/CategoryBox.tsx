import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends BoxProps { }

function CategoryBox(props: IProps) {

  return (
    <Box backgroundColor="#292929" cursor="pointer" padding="30px" borderRadius="8px" {...props}>{props.children}</Box>
  )
}

export default CategoryBox