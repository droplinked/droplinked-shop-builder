import { Box, Flex, HStack, useOutsideClick, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppSwitch from "components/common/swich";
import useAppToast from "functions/hooks/toast/useToast";
import { useGetPermissionValue } from "lib/stores/app/appStore";
import technicalContext from "pages/register-pages/pages/technical/context";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { canActivateNewPaymentMethod } from "./wallets.helpers";
import AppTypography from "components/common/typography/AppTypography";
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";

const WalletsAccordionPayment = ({ chain, token }: { chain: any; token?: any }) => {
    const getPermissionValue = useGetPermissionValue();
    const {
        state: { paymentMethods },
        updateState,
    } = useContext(technicalContext);
    const selectedPaymentMethods = [...(paymentMethods ?? [])];
    const { showToast } = useAppToast();
    const [walletAddress, setWalletAddress] = useState<string>(chain.destinationAddress);
    const [canEditWallet, setWalletEditability] = useState(!!chain.destinationAddress); // If the 'chain' object has an 'destinationAddress' property, we can edit it

    const persistWalletAddress = useCallback(() => {
        if (!walletAddress) return;
        const newWalletAddress = walletAddress?.trim();
        const selectedPaymentMethods = [...paymentMethods];
        const targetPaymentMethod = selectedPaymentMethods.find((payment) => payment?.type === chain?.type);
        if (targetPaymentMethod) {
            targetPaymentMethod.destinationAddress = newWalletAddress;
            if (!newWalletAddress) {
                targetPaymentMethod.isActive = false;
                targetPaymentMethod?.tokens?.forEach((token) => (token.isActive = false));
            }
        } else {
            const newPaymentMethod = { ...chain, destinationAddress: newWalletAddress };
            if (!newWalletAddress) {
                targetPaymentMethod.isActive = false;
                targetPaymentMethod.tokens.forEach((token) => (token.isActive = false));
            }
            selectedPaymentMethods.push(newPaymentMethod);
        }
        updateState("paymentMethods", selectedPaymentMethods);
        setWalletEditability(true);
    }, [walletAddress, paymentMethods, chain]);

    const findAndUpdateToken = (e, token) => {
        const isChecked = e.target.checked;
        if (!chain?.destinationAddress) return showToast({ type: "info", message: "Please enter your wallet address first" });
        const targetChain = selectedPaymentMethods?.find((payment) => payment.type === chain.type);
        if (!targetChain) {
            const newChain = { ...chain, isActive: true, tokens: [{ ...token, isActive: true }] };
            selectedPaymentMethods?.push(newChain);
            return;
        }

        targetChain.isActive = true;
        const targetTokenIndex = targetChain?.tokens?.findIndex((currentToken) => currentToken?.type === token?.type);

        if (isChecked) {
            if (!canActivateNewPaymentMethod(chain, selectedPaymentMethods, getPermissionValue, showToast)) return;
            targetTokenIndex !== -1 ? (targetChain.tokens[targetTokenIndex].isActive = true) : targetChain?.tokens?.push({ ...token, isActive: true });
        } else {
            if (targetTokenIndex !== -1) {
                targetChain.tokens[targetTokenIndex].isActive = false;
            }
            targetChain.isActive = targetChain.tokens.some((token) => token.isActive);
        }
        updateState("paymentMethods", selectedPaymentMethods);
    };

    useEffect(() => {
        const walletAddress = chain.destinationAddress;
        setWalletAddress(walletAddress);
        setWalletEditability(!!walletAddress);
    }, [chain.destinationAddress]);

    const inputRef = useRef(null);
    useOutsideClick({ ref: inputRef, handler: persistWalletAddress, enabled: !canEditWallet });

    return (
        <VStack align={"stretch"} gap={"16px"}>
            <FieldLabel label="Target Wallet" textProps={{ fontSize: "14px", color: "#C2C2C2", fontWeight: "600" }} />

            <Flex bg={"mainLayer"} rounded={"8px"} width={"100%"} gap={4} padding={"16px 16px"} alignItems={"center"}>
                {canEditWallet && (
                    <Box onClick={() => setWalletEditability(false)}>
                        <AppIcons.EditIcon width="16px" height="16px" cursor={"pointer"} />
                    </Box>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Please enter wallet address"
                    spellCheck={false}
                    disabled={canEditWallet}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                />
                {/* {chain.tokens?.length === 1 && <AppSwitch isChecked={chain?.isActive} onChange={(e) => findAndUpdateToken(e, chain?.tokens[0])} />} */}
            </Flex>
            <FieldLabel label="Payments" textProps={{ fontSize: "14px", color: "#C2C2C2", fontWeight: "600" }} />

            <HStack align={"stretch"} width={"full"} justify={"flex-start"}>
                {chain.tokens?.length &&
                    chain?.tokens?.map((token, index) => (
                        <Flex key={index} bg={"mainLayer"} rounded={"8px"} width={"auto"} gap={4} padding={"16px 16px"} alignItems={"center"} justifyContent="space-between">
                            <AppTypography color={"#C2C2C2"}>{token?.type}</AppTypography>
                            <AppSwitch isChecked={token.isActive} onChange={(e) => findAndUpdateToken(e, token)} />
                        </Flex>
                    ))}
            </HStack>
        </VStack>
    );
};

export default WalletsAccordionPayment;
