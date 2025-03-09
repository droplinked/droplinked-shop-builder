import { Box, Flex, Text } from "@chakra-ui/react"
import { CopyMd } from "assets/icons/Action/Copy/CopyMd"
import { Refresh2Sm } from "assets/icons/Action/Refresh2/Refresh2Sm"
import { ChevronleftLg } from "assets/icons/Navigation/ChevronLeft/ChevronleftLg"
import { ChevronrightLg } from "assets/icons/Navigation/ChevronRight/ChevronrightLg"
import { PlusMd } from "assets/icons/Sign/Plus/PlusMd"
import { SidebarMd } from "assets/icons/StyleDesigner/Sidebar/SidebarMd"
import { DownloadcircleMd } from "assets/icons/System/DownloadCircle/DownloadcircleMd"
import { LockSm } from "assets/icons/System/Lock/LockSm"
import useOnboardingStore from "pages/onboarding/store/useOnboardingStore"
import React from "react"
import { appDevelopment } from "utils/app/variable"

// Chrome-style color dots component
const ChromeDots = () => (
  <Flex display="flex" gap={2}>
    <Box w="12px" h="12px" borderRadius="full" bg="#f24" />
    <Box w="12px" h="12px" borderRadius="full" bg="#FFD951" />
    <Box w="12px" h="12px" borderRadius="full" bg="#2BCFA1" />
  </Flex>
)

// Navigation arrow buttons component
const NavigationButtons = () => (
  <Flex display={{ base: "none", xl: "flex" }} gap={2}>
    <ChevronleftLg color="white" />
    <ChevronrightLg color="#4f4f4f" />
  </Flex>
)

// Right side actions component
const ActionButtons = () => (
  <Flex display="flex" gap={4}>
    <DownloadcircleMd color="white" />
    <PlusMd color="white" />
    <CopyMd color="white" />
  </Flex>
)

export default function TopBar() {
  const { storeData } = useOnboardingStore()
  const shopAddress = `${appDevelopment ? "dev." : ""}droplinked.io/${storeData?.url}`

  return (
    <Flex direction="column" borderBottom="1px solid #292929">
      {/* Header */}
      <Box position="relative" padding={{ base: 4, md: "16px 24px" }} borderTopRadius={8} bg="#141414">
        <Text fontSize={{ base: 16, lg: 18 }} color="white">
          Store Preview
        </Text>
      </Box>

      {/* Browser toolbar */}
      <Flex
        position="relative"
        padding={{ base: 4, md: "12px 24px" }}
        borderTop="1px solid #292929"
        align="center"
        justify="space-between"
        display={{ base: "none", xl: "flex" }}
      >
        {/* Left controls */}
        <Flex gap={{ base: 6, lg: 8 }} align="center">
          <ChromeDots />
          <SidebarMd color="white" />
          <NavigationButtons />
        </Flex>

        {/* Address bar */}
        <Box position="relative" flex={1} mx={6}>
          <Flex
            position="relative"
            h="32px"
            border="1px solid #292929"
            borderRadius={8}
            paddingInline={2}
            paddingBlock={1}
            align="center"
            bg="#222"
          >
            <Flex marginLeft="auto" gap={1}>
              <LockSm color="white" />
              <Text fontSize={12} color="white">
                {shopAddress}
              </Text>
            </Flex>
            <Refresh2Sm color="white" style={{ marginLeft: "auto" }} />
          </Flex>
        </Box>

        {/* Right controls */}
        <ActionButtons />
      </Flex>
    </Flex>
  )
}
