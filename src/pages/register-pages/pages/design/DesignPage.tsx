import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useReducer } from "react";
import { designContext, initialStateDesignPage } from "./design-context";
import AppCard from "components/common/card/AppCard";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import DesignPageOptions from "./parts/options/DesignPageOptions";
import DesignPageDevices from "./parts/devices/DesignPageDevices";
import DesignPagePreview from "./parts/preview/DesignPagePreview";
import DesignPageButtons from "./parts/buttons/DesignPageButtons";
import designPageReducer from "./reducer";
import DesignPageModel from "./model";
import StickyBox from "react-sticky-box";

const DesignPage = () => {
  const { shop } = useProfile();
  const { reducers } = designPageReducer
  const [state, dispatch] = useReducer(reducers, initialStateDesignPage)
  const { refactorData } = DesignPageModel

  useEffect(() => dispatch({ type: 'updateState', params: { shop: refactorData(shop) } }), [shop])

  return (
    <designContext.Provider
      value={{
        state,
        methods: {
          dispatch,
          resetState: () => { }
        }
      }}
    >
      <Flex gap="24px" alignItems="flex-start">
        <StickyBox offsetTop={20} offsetBottom={20} style={{ width: "72%" }}>
          <VStack align="stretch" spacing="24px">
            <AppCard boxProps={{ padding: "30px" }}>
              <VStack align="stretch" spacing="24px">
                <DesignPageDevices />
                <DesignPagePreview />
              </VStack>
            </AppCard>
            <DesignPageButtons />
          </VStack>
        </StickyBox>
        <Box width="28%"><DesignPageOptions /></Box>
      </Flex>
    </designContext.Provider >
  );
};

export default DesignPage;
