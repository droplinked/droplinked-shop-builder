import { PageContent } from "pages/register-pages/RegisterPages-style";
import React, { useCallback, useEffect, useState } from "react";
import Ims from "./parts/ims";
import Payments from "./parts/payment";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import technicalContext, { technicalContextState } from "./context";
import { appDeveloment } from "lib/utils/app/variable";
import technicalModel from "./model";
import Wallet from "./parts/wallet";
import AppCard from "components/shared/card/AppCard";
import TechnicalSubmit from "./parts/submit/TechnicalSubmit";

function Technical() {
  const [Technical, setTechnical] = useState(technicalContextState);
  const selector = useSelector((state) => state);
  const { refactorPayment } = technicalModel

  const updateState = (key, value) => setTechnical((prev) => ({ ...prev, [key]: value }))

  const updatePayment = useCallback((key, value, title) => {
    setTechnical((prev) => ({ ...prev, payments: refactorPayment({ payments: prev.payments, key, value, type: title }) }))
  })

  // update imsType as state managment
  useEffect(() => {
    updateState("imsType", selector?.shop?.currentShop?.imsType || "")
  }, [selector]);

  return (
    <technicalContext.Provider value={{ state: Technical, updateState, updatePayment }}>
      <PageContent>
        <AppCard>
          <VStack spacing={10} align="stretch">
            <Ims />
            <Payments />
            {appDeveloment && <Wallet />}
            <Flex justifyContent={"right"} width={"100%"}>
              <Box><TechnicalSubmit /></Box>
            </Flex>
          </VStack>
        </AppCard>
      </PageContent>
    </technicalContext.Provider>
  );
}

export default Technical;
