import { Box, HStack, VStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import WithPermission from 'functions/hoc/shop-permissions/WithPermission';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AffiliateModel from './AffiliateModel';

function AffiliateLayout() {
  const location = useLocation()
  const { links } = AffiliateModel

  return (
    <WithPermission requiredPermission='affiliate_panel'>
      <HStack alignItems={"start"}>
        {/* <VStack width={"150px"} spacing={4} color="#FFF" align={"stretch"}>
          {links().map((el, key) => (
            <Box key={key}>
              <Link to={el.link}>
                <AppTypography color={el.link === location.pathname ? "#2EC99E" : "#FFF"} fontSize="14px">{el.caption}</AppTypography>
              </Link>
            </Box>
          ))}
        </VStack> */}
        <Box width={"100%"}><Outlet /></Box>
      </HStack>
    </WithPermission>
  )
}

export default AffiliateLayout