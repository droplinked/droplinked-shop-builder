import { Box, Flex, HStack, useOutsideClick } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import useAppToast from "functions/hooks/toast/useToast";
import { useGetPermissionValue } from "lib/stores/app/appStore";
import AppErrors from "lib/utils/statics/errors/errors";
import technicalContext from "pages/register-pages/pages/technical/context";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { canActivateNewPaymentMethod } from "./wallets.helpers";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";

const WalletWithoutLogin = ({ payment, token }: { payment: any; token?: any }) => {
    const getPermissionValue = useGetPermissionValue();
    const {
        state: { paymentMethods },
        updateState,
    } = useContext(technicalContext);
    const selectedPaymentMethods = [...(paymentMethods ?? [])];
    const { showToast } = useAppToast();
    const [isExpanded, setExpanded] = useState(false);

    const findAndUpdateChain = (e) => {
        const existingChainIndex = selectedPaymentMethods.findIndex((selected_payment_methods) => selected_payment_methods.type === payment.type);
        if (e.target.checked) {
            if (!canActivateNewPaymentMethod(payment, selectedPaymentMethods, getPermissionValue, showToast)) return;
            existingChainIndex !== -1 ? (selectedPaymentMethods[existingChainIndex].isActive = true) : selectedPaymentMethods.push({ ...payment, isActive: true });
        } else {
            // const activePaymentMethodsCount = selectedPaymentMethods.filter(payment => payment.isActive).length
            // if (activePaymentMethodsCount === 1) return
            selectedPaymentMethods[existingChainIndex].isActive = false;
        }
        updateState("paymentMethods", selectedPaymentMethods);
    };
    const ChainIcon = useMemo(() => <BlockchainDisplay blockchain={payment?.type?.toUpperCase()} show="icon" props={{ width: "24px", height: "24px" }} />, [payment?.type]);

    return (
        <Flex direction={"column"} gap={"24px"} borderRadius={"8px"} padding={"24px"} backgroundColor={"#141414"}>
            <Flex justifyContent={"space-between"} alignItems="center" style={{ cursor: "pointer" }} onClick={() => setExpanded(!isExpanded)}>
                <Flex alignItems={"center"} gap={"16px"}>
                    {ChainIcon}
                    <AppTypography fontSize={"14px"} fontWeight={"bold"} color={"#C2C2C2"}>
                        {payment?.type && capitalizeFirstLetter(payment?.type)}
                    </AppTypography>
                </Flex>
                <AppIcons.ArrowDown style={{ transition: ".3s", ...(isExpanded && { transform: "rotate(180deg)" }) }} />
            </Flex>
            {isExpanded && (
                <Flex alignItems={"center"} gap={4} justifyContent={"space-between"}>
                    <AppTypography fontSize="14px" color="#C2C2C2" fontWeight="bold">
                        <BlockchainDisplay show="name" blockchain={token ? `${payment.type} (${token.type})` : payment.type} />
                    </AppTypography>
                    <AppSwitch isChecked={token ? payment.isActive && token.isActive : payment.isActive} onChange={findAndUpdateChain} />
                </Flex>
            )}
        </Flex>
    );
};

export default WalletWithoutLogin;
