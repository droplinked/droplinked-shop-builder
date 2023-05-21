import { PageContent } from "pages/register-pages/RegisterPages-style";
import React, { useCallback, useEffect, useState } from "react";
import Ims from "./parts/ims";
import Payments from "./parts/payment";
import { Box, Flex, VStack } from "@chakra-ui/react";
import technicalContext, { technicalContextState } from "./context";
import { appDeveloment } from "lib/utils/app/variable";
import technicalModel from "./model";
import Wallet from "./parts/wallet";
import AppCard from "common/card/AppCard";
import TechnicalSubmit from "./parts/submit/TechnicalSubmit";
import { useProfile } from "hooks/useProfile/useProfile";
import { paymentMethodsService } from "lib/apis/shop/shopServices";
import { useMutation } from "react-query";

function Technical() {
  const userPayments = useMutation(() => paymentMethodsService())
  const [Technical, setTechnical] = useState(technicalContextState);
  const { shop } = useProfile()
  const { refactorPayment } = technicalModel

  const updateState = (key: string, value: string) => setTechnical((prev) => ({ ...prev, [key]: value }))

  const updatePayment = useCallback((key: string, value: string, title: string) => {
    setTechnical((prev) => ({ ...prev, payments: refactorPayment({ payments: prev.payments, key, value, type: title }) }))
  }, [])

  // Fetch payments user
  useEffect(() => userPayments.mutate(), [])

  // update imsType as state managment
  useEffect(() => {
    updateState("imsType", shop?.imsType || "")
  }, [shop]);

  return (
    <technicalContext.Provider value={{ state: Technical, updateState, updatePayment, userPayments: userPayments.data?.data?.data }}>
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
