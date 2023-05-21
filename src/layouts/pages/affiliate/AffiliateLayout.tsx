import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import AppTypography from 'common/typography/AppTypography';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AffiliateModel from './AffiliateModel';

function AffiliateLayout() {
  const location = useLocation()
  const { links } = AffiliateModel

  return (
    <HStack alignItems={"start"}>
      <VStack width={"150px"} spacing={4} color="#FFF" align={"stretch"}>
        {links().map((el, key) => (
          <Box key={key}>
            <Link to={el.link}>
              <AppTypography color={el.link === location.pathname ? "#2EC99E" : "#FFF"} size={"14px"}>{el.caption}</AppTypography>
            </Link>
          </Box>
        ))}
      </VStack>
      <Box width={"88%"}><Outlet /></Box>
    </HStack>
  )
}

export default AffiliateLayout