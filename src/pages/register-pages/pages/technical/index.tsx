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

  // Fetch payments user
  useEffect(() => userPaymentsService.mutate(), [])

  // Stripe is active by default in registration process
  useEffect(() => {
    updateState("paymentMethods", isRegister ? [{ type: "STRIPE", destinationAddress: "", isActive: true, tokens: [] }] : userPaymentsService.data?.data?.data.filter(payment => payment.type !== "STACKS"))
  }, [isRegister, userPaymentsService.data?.data?.data])

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
