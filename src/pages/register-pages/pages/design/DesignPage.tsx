import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { designContext, IDesignPageStates, initialStateDesignPage } from "./design-context";
import AppCard from "components/common/card/AppCard";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import DesignPageOptions from "./parts/options/DesignPageOptions";
import DesignPageDevices from "./parts/devices/DesignPageDevices";
import DesignPagePreview from "./parts/preview/DesignPagePreview";
import DesignPageButtons from "./parts/buttons/DesignPageButtons";

const DesignPage = () => {
  const { shop } = useProfile();
  const [States, setStates] = useState<IDesignPageStates>({
    state: initialStateDesignPage
  });

  const updateState = useCallback((key: any, value) => {
    setStates((prev: IDesignPageStates) => ({ ...prev, state: { ...prev.state, [key]: value } }))
  }, [])

  return (
    <designContext.Provider
      value={{
        state: States.state,
        methods: {
          updateState,
          resetState: () => { }
        }
      }}
    >
      <Flex gap="24px" alignItems="flex-start">
        <VStack align="stretch" width="72%" spacing="24px">
          <AppCard boxProps={{ padding: "30px" }}>
            <VStack align="stretch" spacing="24px">
              <DesignPageDevices />
              <DesignPagePreview />
            </VStack>
          </AppCard>
          <DesignPageButtons />
        </VStack>
        <Box width="28%"><DesignPageOptions /></Box>
      </Flex>
    </designContext.Provider >
  );
};

export default DesignPage;
