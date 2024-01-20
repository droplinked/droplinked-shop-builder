import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import SocialAffliate, { ISocialAffliate } from '../social/SocialAffliate';
import AppTypography from 'components/common/typography/AppTypography';

interface Iprops {
  avatar: string
  title: string
  desciption?: string
  shopname: string
  social: ISocialAffliate
  link?: string
}

function ShopsProfile({ avatar, title, desciption, shopname, social, link }: Iprops) {
  const { shop } = useProfile()

  const jsxContent = useMemo(() => (
    <VStack align={"stretch"} spacing={3}>
      <Box><Image src={avatar} borderRadius="100px" width="36px" height="36px" /></Box>
      <Box><AppTypography fontSize='14px' color="#2EC99E" fontWeight="bold">{title}</AppTypography></Box>
      {desciption && <Box><AppTypography fontSize='12px' color="#C2C2C2">{desciption}</AppTypography></Box>}
    </VStack>
  ), [avatar, desciption, title])

  return (
    <VStack align={"stretch"} spacing={3}>
      {link && link.search("http") >= 0 ? (
        <a href={link} target="_blank">{jsxContent}</a>
      ) : (
        <Link to={link || `/${shop.name}/c/affiliate/shops/${shopname}`}>{jsxContent}</Link>
      )}
      <SocialAffliate social={social} />
    </VStack>
  )
}

export default ShopsProfile