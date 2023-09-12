import { Box, Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Link } from 'react-router-dom'

function HeaderMain() {
  return (
    <Flex justifyContent="space-between" padding="30px" alignItems="center">
      <Flex color="#FFF" gap="100px">
        <Link to=''><AppTypography size='14px'>About Us</AppTypography></Link>
        <Link to=''><AppTypography size='14px'>Help Center</AppTypography></Link>
      </Flex>
      <Box><AppTypography color="#C2C2C2" border="" size='12px'>Sign In</AppTypography></Box>
    </Flex>
  )
}

export default HeaderMain