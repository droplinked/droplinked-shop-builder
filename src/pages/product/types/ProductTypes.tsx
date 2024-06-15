import { Flex, Image, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import useShopSubscriptionData from 'functions/hooks/shop-subscription-data/useShopSubscriptionData'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import AppErrors from 'lib/utils/statics/errors/errors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

interface ProductType {
  type: "Physical Product" | "Print On Demand" | "Digital Product" | "Event"
  description: string;
  image: string;
  route: string;
  legalUsageKey: string;
}

function ProductTypes() {
  const navigate = useNavigate()
  const { isFetching, isError, data } = useShopSubscriptionData()
  const { showToast } = useAppToast()
  const { shopRoute } = useCustomNavigate()
  const createProductRoute = shopRoute + '/products/create/'

  if (isFetching) return <Loading />

  if (isError) return <AppTypography fontSize={16} color={"red.400"}>{AppErrors.permission.shop_subscription_data_unavailable}</AppTypography>

  const productTypes: ProductType[] = [
    {
      type: "Physical Product",
      description: "Add physical goods and merchandises to sell",
      image: "/assets/images/physical.svg",
      route: createProductRoute + "physical",
      legalUsageKey: "physical_product"
    },
    {
      type: "Print On Demand",
      description: `Transform your Artwork or NFT into exclusive custom apparel, printed
      and shipped by our trusted providers`,
      image: "/assets/images/pod.svg",
      route: createProductRoute + "pod",
      legalUsageKey: "print_on_demand"
    },
    {
      type: "Digital Product",
      description: "Upload digital assents, artworks, NFTs to sell",
      image: "/assets/images/digital.svg",
      route: createProductRoute + "digital",
      legalUsageKey: "digital_product"
    },
    {
      type: "Event",
      description: "Coming soon...",
      image: "",
      route: null,
      legalUsageKey: ""
    }
  ]

  const navigateToProductForm = (productType: ProductType) => {
    const legalUsage = data.data.legalUsage.find(obj => obj.key === productType.legalUsageKey)
    if (legalUsage.remaining === "Unlimited" || +legalUsage.remaining > 0) {
      return navigate(productType.route)
    }
    showToast({ message: AppErrors.permission.product_creation_limit_reached, type: "error" })
  }

  return (
    <VStack align="stretch" spacing={5}>
      {productTypes.map((productType) => (
        <Flex key={productType.type} justifyContent="center" cursor={"pointer"} opacity={!productType.route ? .8 : 1} onClick={() => navigateToProductForm(productType)}>
          <AppCard mini boxProps={{ padding: 0, ...!productType.route && { background: "none" } }}>
            <Flex gap="100px" minHeight="124px" justifyContent="space-between" alignItems="center" padding="0 40px">
              <VStack align="stretch" spacing={1}>
                <AppTypography fontSize='20px' color={productType.type ? "#FFF" : "#878787"} fontWeight='bold'>{productType.type}</AppTypography>
                <AppTypography fontSize='14px' color="#C2C2C2">{productType.description}</AppTypography>
              </VStack>
              <Image src={productType.image} />
            </Flex>
          </AppCard>
        </Flex>
      ))}
    </VStack>
  )
}

export default ProductTypes