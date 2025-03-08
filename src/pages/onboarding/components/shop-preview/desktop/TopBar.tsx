import { Box, Flex, Text } from "@chakra-ui/react";
import { CopyMd } from "assets/icons/Action/Copy/CopyMd";
import { Refresh2Sm } from "assets/icons/Action/Refresh2/Refresh2Sm";
import { ChevronleftLg } from "assets/icons/Navigation/ChevronLeft/ChevronleftLg";
import { ChevronrightLg } from "assets/icons/Navigation/ChevronRight/ChevronrightLg";
import { PlusMd } from "assets/icons/Sign/Plus/PlusMd";
import { SidebarMd } from "assets/icons/StyleDesigner/Sidebar/SidebarMd";
import { DownloadcircleMd } from "assets/icons/System/DownloadCircle/DownloadcircleMd";
import { LockSm } from "assets/icons/System/Lock/LockSm";
import useOnboardingStore from "pages/onboarding/store/useOnboardingStore";
import React from "react";
import { appDevelopment } from "utils/app/variable";

export default function TopBar() {
  const { storeData } = useOnboardingStore();

  const shopAddress = `${appDevelopment ? "dev." : ""}droplinked.io/${storeData?.url}`;

  return (
    <Flex direction="column" borderBottom={"1px solid #292929"}>
      <Box padding={{ base: 4, md: "16px 24px" }} bg="#141414" borderTopRadius={8}>
        <Text color="white" fontSize={{ base: 16, lg: 18 }}>
          Store Preview
        </Text>
      </Box>
      <Flex
        align="center"
        justify="space-between"
        padding={{ base: 4, md: "12px 24px" }}
        borderTop="1px solid #292929"
      >
        <Flex gap={{ base: 6, lg: 8 }} align="center">
          <Flex gap={2}>
            <Box w="12px" h="12px" bg="#f24" borderRadius="full" />
            <Box w="12px" h="12px" bg="#FFD951" borderRadius="full" />
            <Box w="12px" h="12px" bg="#2BCFA1" borderRadius="full" />
          </Flex>
          <SidebarMd color="white" />
          <Flex display={{ base: "none", xl: "flex" }} gap={2}>
            <ChevronleftLg color="white" />
            <ChevronrightLg color="#4f4f4f" />
          </Flex>
        </Flex>

        <Box flex={1} mx={6}>
          <Flex
            h="32px"
            align="center"
            border="1px solid #292929"
            bg="#222"
            paddingInline={2}
            paddingBlock={1}
            borderRadius={8}
          >
            <Flex gap={1} marginLeft="auto">
              <LockSm color="white" />
              <Text color="white" fontSize={12}>
                {shopAddress}
              </Text>
            </Flex>
            <Refresh2Sm color="white" style={{ marginLeft: "auto" }} />
          </Flex>
        </Box>

        <Flex gap={4}>
          <DownloadcircleMd color="white" />
          <PlusMd color="white" />
          <CopyMd color="white" />
        </Flex>
      </Flex>
    </Flex>
  );
}
