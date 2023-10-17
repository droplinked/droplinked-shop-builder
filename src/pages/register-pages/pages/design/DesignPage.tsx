import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { designContext, initialStatesDesign } from "./design-context";
import { refactorDesignData } from "./utils";
import AppCard from "components/common/card/AppCard";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import DesignPageOptions from "./parts/options/DesignPageOptions";

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
      <Flex gap="24px" alignItems="baseline">
        <AppCard boxProps={{ width: "72%", padding: "30px" }}>
          left
        </AppCard>
        <Box width="28%"><DesignPageOptions /></Box>
      </Flex>
    </designContext.Provider>
  );
};

export default DesignPage;
