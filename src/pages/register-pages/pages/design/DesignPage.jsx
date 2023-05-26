import { Box, VStack } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useProfile } from "../../../../hooks/useProfile/useProfile";
import ButtonsComponent from "./components/buttons-component/ButtonsComponent";
import IconsComponent from "./components/icons-component/IconsComponent";
import HeaderTitleComponent from "./components/header-title-component/HeaderTitleComponent";
import BannerComponent from "./components/banner-component/BannerComponent";
import ColorInputsComponent from "./components/color-inputs-component/ColorInputsComponent";
import { designContext, initialStatesDesign } from "./design-context";
import { refactorDesignData } from "./utils";
import AppCard from "common/card/AppCard";
import TemplateStore from "./components/template/TemplateStore";

const DesignPage = () => {
  const [designState, setDesignState] = useState(initialStatesDesign);
  const { shop } = useProfile();

  useEffect(() => {
    if (shop) setDesignState(refactorDesignData(shop));
  }, [shop]);

  const resetState = useCallback(() => setDesignState(initialStatesDesign), [])

  const updateState = useCallback((element, value) => {
    if ([typeof element, typeof value].includes("undefined")) return false;
    setDesignState((prev) => ({ ...prev, [element]: value }));
  }, []);

  return (
    <designContext.Provider
      value={{
        state: designState,
        methods: { updateState, resetState },
      }}
    >
      <VStack align={"stretch"} spacing={3}>
        <AppCard>
          <TemplateStore />
          <Box mb="48px" />
          <BannerComponent />
          <Box mb="48px" />
        </AppCard>
        <AppCard>
          <IconsComponent />

          <Box mb="48px" />
          <HeaderTitleComponent />

          <Box mb="48px" />
          <ColorInputsComponent />
        </AppCard>

        <ButtonsComponent />
      </VStack>
    </designContext.Provider>
  );
};

export default DesignPage;
