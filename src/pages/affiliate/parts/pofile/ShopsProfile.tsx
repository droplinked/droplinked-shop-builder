import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { useProfile } from 'hooks/useProfile/useProfile';
import SocialAffliate, { ISocialAffliate } from '../social/SocialAffliate';

interface Iprops {
  avatar: string
  title: string
  desciption?: string
  shopname: string
  social: ISocialAffliate
}

function ShopsProfile({ avatar, title, desciption, shopname, social }: Iprops) {
  const { shop } = useProfile()
  const { facebook, instagram, pintrest, snapchat, twitter } = social

  return (
    <VStack align={"stretch"} spacing={3}>
      <Link to={`/${shop.name}/c/affiliate/shops/${shopname}`}>
        <VStack align={"stretch"} spacing={3}>
          <Box><Image src={avatar} borderRadius="100px" width="36px" height="36px" /></Box>
          <Box><Text fontSize={["md", "lg"]} color="#2EC99E" fontFamily={"aven"} fontWeight="bold">{title}</Text></Box>
          {desciption && <Box><Text fontSize={["xs", "sm"]} color="#C2C2C2">{desciption}</Text></Box>}
        </VStack>
      </Link>
      <SocialAffliate facebook={facebook} instagram={instagram} pintrest={pintrest} snapchat={snapchat} twitter={twitter} />
    </VStack>
  )
}

export default ShopsProfile