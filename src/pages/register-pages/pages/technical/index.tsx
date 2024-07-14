import { useDisclosure, VStack } from "@chakra-ui/react";
import { paymentMethodsService } from "lib/apis/shop/shopServices";
import { PageContent } from "pages/register-pages/RegisterPages-style";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import technicalContext, { technicalContextState } from "./context";
import FinancialAccounts from "./parts/financial-accounts/FinancialAccounts";
import TechnicalSubmit from "./parts/submit/TechnicalSubmit";
import Wallets from "./parts/wallets/Wallets";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppModal from "components/common/modal/AppModal";
import ConnectWallets from "./parts/connect/ConnectWallets";

function Technical() {
    const userPaymentsService = useMutation(() => paymentMethodsService());
    const [technical, setTechnical] = useState(technicalContextState);
    const currentPath = useLocation().pathname;
    const isRegister = currentPath.includes("register");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const updateState = (key: string, value: string) => setTechnical((prev) => ({ ...prev, [key]: value }));

    // Fetch payments user
    useEffect(() => userPaymentsService.mutate(), []);

    // Stripe is active by default in registration process
    useEffect(() => {
        updateState(
            "paymentMethods",
            isRegister ? [{ type: "STRIPE", destinationAddress: "", isActive: true, tokens: [] }] : userPaymentsService.data?.data?.data.filter((payment) => payment.type !== "STACKS")
        );
    }, [isRegister, userPaymentsService.data?.data?.data]);

    return (
        <technicalContext.Provider value={{ state: technical, updateState }}>
            <PageContent>
                <VStack spacing={4} align="stretch">
                    <FinancialAccounts />
                    <Wallets />
                    <BasicButton onClick={onOpen} textAlign={"left"} width={"auto"} maxW={"100px"} variant="link" color={"#179EF8"} fontWeight={"600"} fontSize={"14px"}>
                        Connect your wallets
                    </BasicButton>
                    <AppModal open={isOpen} close={onClose} size="3xl" isCentered={false} contentProps={{ paddingX: 2, paddingY: 5 }} title={"Connect your wallets"}>
                        <ConnectWallets />
                    </AppModal>
                    <TechnicalSubmit />
                </VStack>
            </PageContent>
        </technicalContext.Provider>
    );
}

export default Technical;
