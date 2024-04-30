import { VStack } from "@chakra-ui/react";
import { paymentMethodsService } from "lib/apis/shop/shopServices";
import { PageContent } from "pages/register-pages/RegisterPages-style";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import technicalContext, { technicalContextState } from "./context";
import FinancialAccounts from "./parts/financial-accounts/FinancialAccounts";
import Payments from "./parts/payment";
import TechnicalSubmit from "./parts/submit/TechnicalSubmit";
import SupportedLoginMethods from "./parts/supported-login-methods/SupportedLoginMethods";
import Wallet from "./parts/wallet";

function Technical() {
  const userPaymentsService = useMutation(() => paymentMethodsService())
  const [technical, setTechnical] = useState(technicalContextState)
  const currentPath = useLocation().pathname
  const isRegister = currentPath.includes("register")

  const updateState = (key: string, value: string) => setTechnical((prev) => ({ ...prev, [key]: value }))

  // Set default "STRIPE" when register
  // const userPayments = useMemo(() => {
  //   return isRegister ? [{ type: "STRIPE", destinationAddress: "", isActive: true }] : userPaymentsService.data?.data?.data
  // }, [isRegister, userPaymentsService.data])

  // Fetch payments user
  useEffect(() => userPaymentsService.mutate(), [])

  useEffect(() => {
    updateState("paymentMethods", userPaymentsService.data?.data?.data)
  }, [userPaymentsService.data?.data?.data])

  return (
    <technicalContext.Provider value={{ state: technical, updateState }}>
      <PageContent>
        <VStack spacing={4} align="stretch">
          <FinancialAccounts />
          <SupportedLoginMethods />
          {technical.imsType !== "SHOPIFY" && <Payments />}
          <Wallet />
          <TechnicalSubmit />
        </VStack>
      </PageContent>
    </technicalContext.Provider>
  );
}

export default Technical;
