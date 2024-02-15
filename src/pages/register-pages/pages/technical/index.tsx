import { VStack } from "@chakra-ui/react";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { paymentMethodsService } from "lib/apis/shop/shopServices";
import { PageContent } from "pages/register-pages/RegisterPages-style";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import technicalContext, { technicalContextState } from "./context";
import technicalModel from "./model";
import FinancialAccounts from "./parts/financial-accounts/FinancialAccounts";
import Payments from "./parts/payment";
import TechnicalSubmit from "./parts/submit/TechnicalSubmit";
import SupportedLoginMethods from "./parts/supported-login-methods/SupportedLoginMethods";
import Wallet from "./parts/wallet";

function Technical() {
  const userPaymentsService = useMutation(() => paymentMethodsService())
  const [Technical, setTechnical] = useState(technicalContextState);
  const { shop } = useProfile()
  const { refactorPayment } = technicalModel
  const currentPath = useLocation().pathname
  const isRegister = currentPath.includes("register")

  const updateState = (key: string, value: string) => setTechnical((prev) => ({ ...prev, [key]: value }))

  const updatePayment = useCallback((key: string, value: string, title: string) => {
    const refactor = (payments: any) => refactorPayment({
      payments,
      key,
      value,
      type: title
    })
    setTechnical((prev) => ({ ...prev, paymentMethods: refactor(prev.paymentMethods) }))
  }, [])

  // Set default "STRIPE" when register
  const userPayments = useMemo(() => {
    return isRegister ? [{ type: "STRIPE", destinationAddress: "", isActive: true }] : userPaymentsService.data?.data?.data
  }, [isRegister, userPaymentsService.data])

  // Fetch payments user
  useEffect(() => userPaymentsService.mutate(), [])

  // update imsType as state managment
  // useEffect(() => {
  //   updateState("imsType", shop?.imsType || "")
  // }, [shop]);

  return (
    <technicalContext.Provider value={{ state: Technical, updateState, updatePayment, userPayments }}>
      <PageContent>
        <VStack spacing={4} align="stretch">
          {/* <Ims /> */}
          <FinancialAccounts />
          <SupportedLoginMethods />
          {Technical.imsType !== "SHOPIFY" && <Payments />}
          <Wallet />
          <TechnicalSubmit />
        </VStack>
      </PageContent>
    </technicalContext.Provider>
  );
}

export default Technical;
