import { Flex } from "@chakra-ui/react";
import AppCard from "components/common/card/AppCard";
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";
import AppTypography from "components/common/typography/AppTypography";
import { authSupportedWalletsService } from "lib/apis/auth/services";
import { getShopInformationService, paymentPublicService } from "lib/apis/shop/shopServices";
import React, { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import technicalContext from "../../context";
import { WalletLoginLoading } from "./wallet.loadings";
import WalletWithoutLogin from "./wallet.without.login";
import WalletsAccordion from "./wallets.accordion";
import { makePayments } from "./wallets.helpers";

const Wallets = () => {
    const {
        updateState,
        state: { paymentMethods },
    } = useContext(technicalContext);

    const { data: supported, isSuccess: supportedSuccess, error: supportedError } = useQuery("supported-login-methods", authSupportedWalletsService, { refetchOnWindowFocus: false });
    const { data: payment, isLoading } = useQuery({ queryFn: paymentPublicService, queryKey: "available_payment_methods_service" });
    const { data: selected, error: selectedError } = useQuery("selected-login-methods", getShopInformationService, {
        refetchOnWindowFocus: false,
        enabled: supportedSuccess,
        onSuccess: (res) => {
            let selectedMethods = res?.data?.data?.loginMethods;
            if (!Array.isArray(selectedMethods) || selectedMethods.length === 0) {
                const [
                    {
                        name,
                        wallets: [firstWallet],
                    },
                ] = supported?.data?.data || [];
                selectedMethods = [{ name, wallets: [{ ...firstWallet, isActivated: true }] }];
            }
            updateState("loginMethods", selectedMethods);
        },
    });

    const { paymentsInLogin, paymentsWithoutLogin } = useMemo(() => {
        const available = [];
        const others = [];
        payment?.data?.data?.forEach((method) => {
            if (supported?.data?.data?.some((loginMethod) => loginMethod?.name?.toUpperCase() === method?.type?.toUpperCase()) || method?.type?.toUpperCase() === "XRPLSIDECHAIN") {
                available.push(method);
            } else {
                others.push(method);
            }
        });
        return { paymentsInLogin: available, paymentsWithoutLogin: others };
    }, [payment, supported]);

    return (
        <AppCard>
            <Flex direction={"column"} gap={"24px"}>
                <Flex direction={"column"} gap={"8px"}>
                    <FieldLabel label="User Login Methods" textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired />
                    <AppTypography fontSize="14px" color="#C2C2C2">
                        Activate the payment methods and add target wallet for each of them.
                    </AppTypography>
                    <AppTypography fontSize="14px" color="#C2C2C2">
                        Allow or deny login option for each wallet
                    </AppTypography>
                </Flex>
                {isLoading && <WalletLoginLoading />}
                <Flex direction={"column"} gap={"8px"}>
                    {!isLoading && supported?.data?.data?.map((login_method, index) => <WalletsAccordion key={index} chain={login_method} payment={payment?.data?.data} />)}
                    {!isLoading &&
                        makePayments({
                            paymentMethods: paymentMethods,
                            paymentPublic: paymentsWithoutLogin,
                        })?.map((method, index) => <WalletWithoutLogin key={index} payment={method} />)}
                </Flex>
            </Flex>
        </AppCard>
    );
};

export default Wallets;
