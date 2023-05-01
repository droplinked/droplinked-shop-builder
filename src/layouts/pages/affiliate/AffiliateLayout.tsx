import { Box, HStack, Text, VStack } from '@chakra-ui/react'
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
          <Box key={key}><Link to={el.link}><Text color={el.link === location.pathname ? "#2EC99E" : ""} fontSize={"sm"}>{el.caption}</Text></Link></Box>
        ))}
      </VStack>
      <Box width={"88%"}><Outlet /></Box>
    </HStack>
  )
}

export default AffiliateLayout