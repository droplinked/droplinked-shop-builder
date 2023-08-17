import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import React from 'react'
import { Link } from 'react-router-dom'

function ProductTypes() {
  const { shopRoute } = useCustomNavigate()
  const routeCreate = shopRoute + '/products/create/'

  const data = [
    {
      title: "Physical Product",
      description: "Add physical goods and merchandises to sell",
      image: "/assets/images/physical.svg",
      type: routeCreate + "physical"
    },
    {
      title: "Digital Product",
      description: "Upload digital assents, artworks, NFTs to sell",
      image: "/assets/images/digital.svg",
      type: routeCreate + "digital"
    },
    {
      title: "Print On Demand",
      description: `Transform your Artwork or NFT into exclusive custom apparel, printed
      and shipped by our trusted providers`,
      image: "/assets/images/pod.svg",
      type: routeCreate + "pod"
    },
    {
      title: "Event",
      description: "Coming soon...",
      image: "",
      type: null
    }
  ]

  return (
    <VStack align="stretch" spacing={5}>
      {data.map((el, key) => (
        <Link to={el.type || ""}>
          <Flex key={key} justifyContent="center">
            <AppCard mini boxProps={{ padding: 0, ...!el.type && { background: "none" } }}>
              <Flex gap="100px" justifyContent="space-between" alignItems="center" padding="0 40px">
                <VStack align="stretch" spacing={1}>
                  <AppTypography size='20px' color={el.type ? "#FFF" : "#878787"} weight='bolder'>{el.title}</AppTypography>
                  <AppTypography size='14px' color="#C2C2C2">{el.description}</AppTypography>
                </VStack>
                <Image src={el.image} />
              </Flex>
            </AppCard>
          </Flex>
        </Link>
      ))
      }
    </VStack >
  )
}

export default ProductTypes