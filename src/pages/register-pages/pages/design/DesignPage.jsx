import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  Text18px,
} from "../../RegisterPages-style";
import { useProfile } from "../../../../hooks/useProfile/useProfile";
import { DesignPageStyles } from "./DesignPage-style";

import darkThemplateImage from "assest/image/dark-theme-image.jpg";
import ButtonsComponent from "./components/buttons-component/ButtonsComponent";
import IconsComponent from "./components/icons-component/IconsComponent";
import HeaderTitleComponent from "./components/header-title-component/HeaderTitleComponent";
import BannerComponent from "./components/banner-component/BannerComponent";
import ColorInputsComponent from "./components/color-inputs-component/ColorInputsComponent";

//import theme2Image from "./theme-2.jpg";

import { designContext, initialStatesDesign } from "./design-context";
import { refactorDesignData } from "./utils";
import AppCard from "components/shared/card/AppCard";
import { CardTitle } from "components/shared/card/component-style";
import AppTypography from "components/shared/typography/AppTypography";

//
const IMAGES = [{ img: darkThemplateImage, name: "theme-2" }];

const DesignPage = () => {
  const [selectedTheme, setSelectedTheme] = useState(IMAGES[0]);

  const [designState, setDesignState] = useState(initialStatesDesign);

  const { MainThemeImage } = DesignPageStyles;

  const { shop } = useProfile();

  useEffect(() => {
    if (shop) setDesignState(refactorDesignData(shop));
  }, [shop]);

  const updateState = useCallback((element, value) => {
    if ([typeof element, typeof value].includes("undefined")) return false;
    setDesignState((prev) => ({ ...prev, [element]: value }));
  }, []);

  return (
    <designContext.Provider
      value={{
        state: designState,
        methods: { updateState },
      }}
    >
      <VStack align={"stretch"}>
        <VStack>
          <AppCard>
            <AppTypography size="14px">
              Pick an editable template and customize it with your brand logo,
              title, header banner, etc.
            </AppTypography>
          </AppCard>
          <AppCard>
            <CardTitle>Templates</CardTitle>
            <Box mb="48px" />
            <Box w="auto" overflow="hidden">
              <MainThemeImage src={selectedTheme.img} m="2px" />
            </Box>

            <Box mb="48px" />
            <Flex
              w="100%"
              maxW="100%"
              overflow="hidden"
              gap="24px"
              justifyContent="space-between"
              alignItems="center"
            >
              {IMAGES.map((currentObj) => {
                return (
                  <Image
                    key={currentObj.img}
                    src={currentObj.img}
                    // onClick={() => {
                    //   selectTheme(currentObj);
                    // }}
                    w="30%"
                    h="154px"
                    borderRadius="8px"
                    cursor="pointer"
                  />
                );
              })}
            </Flex>
            <Box mb="104px" />
            <Text18px>Details</Text18px>
            <Box mb="48px" />
            <IconsComponent />

            <Box mb="48px" />
            <HeaderTitleComponent />

            <Box mb="48px" />
            <BannerComponent />

            <Box mb="48px" />
            <ColorInputsComponent />
          </AppCard>
        </VStack>

        <ButtonsComponent />
      </VStack>
    </designContext.Provider>
  );
};

export default DesignPage;
