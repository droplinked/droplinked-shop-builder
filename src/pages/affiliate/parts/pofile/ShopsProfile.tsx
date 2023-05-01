import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';
import { useProfile } from 'hooks/useProfile/useProfile';

interface Iprops {
  avatar: string
  title: string
  desciption?: string
}

function ShopsProfile({ avatar, title, desciption }: Iprops) {
  const { shop } = useProfile()
  const social = [
    {
      icon: "",
      link: ""
    }
  ]

  return (
    <Link to={`/${shop.name}/c/affiliate/shops/shopname`}>
      <VStack align={"stretch"}>
        <Box><Image src={avatar} borderRadius="100px" width="36px" height="36px" /></Box>
        <Box><Text fontSize={"lg"} color="#2EC99E" fontFamily={"aven"} fontWeight="bold">{title}</Text></Box>
        {desciption && <Box><Text fontSize={"sm"} color="#C2C2C2">{desciption}</Text></Box>}
      </VStack>
    </Link>
  )
}

export default ShopsProfile