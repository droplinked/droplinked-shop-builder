import { Flex, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";

// Icons
import AppIcons from "assest/icon/Appicons";

// Components
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import AddAddressField from "./_components/AddAddressField";
import AddressAndPercentField from "./_components/AddressAndPercentField";

// Toast
import useAppToast from "functions/hooks/toast/useToast";

// App Store
import { useGetPermissionValue } from "lib/stores/app/appStore";

// Context
import technicalContext from "pages/register-pages/pages/technical/context";

// Funcs
import { calculateTotalPercent, canActivateNewPaymentMethod, persistWalletAddressUpdate } from "./wallets.helpers";

const MotionFlex = motion(Flex)

const WalletsAccordionPayment = ({ chain }: { chain: any }) => {
    const getPermissionValue = useGetPermissionValue();
    const { state: { paymentMethods }, updateState } = useContext(technicalContext);
    const selectedPaymentMethods = [...(paymentMethods ?? [])];
    const { showToast } = useAppToast();

    const [wallets, setWallets] = useState(chain?.destinationAddress || []);
    const [editableWallets, setEditableWallets] = useState([]);

    const calculatePercent = calculateTotalPercent(wallets)

    const persistWalletAddress = useCallback(() => {
        persistWalletAddressUpdate(wallets, paymentMethods, chain, updateState);
    }, [chain, paymentMethods, updateState, wallets]);

    const findAndUpdateToken = (e, token) => {
        const isChecked = e.target.checked;
        if (!wallets) return showToast({ type: "info", message: "Please enter your wallet address first" });
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
        setWallets(chain.destinationAddress);
    }, []);

    // Handler to add a new wallet in input mode
    const addNewWallet = () => {
        setWallets([...wallets, { destinationAddress: "", percent: undefined, isNew: true }]);
    };

    // Handler to save btn on input mode
    const saveWalletAddress = (index: number) => {
        const trimmedAddress = wallets[index].destinationAddress.trim();

        if (!trimmedAddress) {
            return showToast({ type: "info", message: "Please enter a valid wallet address" });
        }

        if (wallets.some((wallet, i) => wallet.destinationAddress.trim() === trimmedAddress && i !== index)) {
            showToast({ type: "warning", message: "This wallet address already exists. Please enter a unique address." });
            return;
        }

        const updatedWallets = wallets.map((wallet, i) => {
            if (i === index) {
                return {
                    ...wallet,
                    destinationAddress: trimmedAddress,
                    isNew: false,
                };
            }
            return wallet;
        });

        const newPercent = Math.floor(100 / updatedWallets.length);
        const remainingPercent = 100 - newPercent * updatedWallets.length;

        const updatedWalletsWithPercent = updatedWallets.map((wallet, i) => ({
            ...wallet,
            percent: i === updatedWallets.length - 1 ? newPercent + remainingPercent : newPercent,
        }));

        setWallets(updatedWalletsWithPercent);

        // Get the updated payment methods
        const updatedPaymentMethods = [...paymentMethods];
        let targetPaymentMethod = updatedPaymentMethods.find((payment) => payment?.type === chain?.type);

        if (targetPaymentMethod) {
            // Update the existing payment method
            targetPaymentMethod.destinationAddress = updatedWalletsWithPercent.map(wallet => ({
                destinationAddress: wallet.destinationAddress,
                percent: wallet.percent,
            }));

            // Activate the first token when the first wallet address is saved
            if (updatedWalletsWithPercent.length === 1 && chain.tokens?.length > 0) {
                targetPaymentMethod.isActive = true;
                targetPaymentMethod.tokens[0].isActive = true;
            }

            // Disable the tokens if have not any wallet address
            if (targetPaymentMethod.destinationAddress.length === 0) {
                targetPaymentMethod.isActive = false;
                targetPaymentMethod.tokens?.forEach((token) => (token.isActive = false));
            }
        } else {
            // Add a new payment method if not found
            const newPaymentMethod = {
                ...chain,
                isActive: updatedWalletsWithPercent.length > 0, // Activate if there's at least one wallet address
                destinationAddress: updatedWalletsWithPercent.map(wallet => ({
                    destinationAddress: wallet.destinationAddress,
                    percent: wallet.percent,
                })),
                tokens: chain.tokens.map((token, index) => ({
                    ...token,
                    isActive: updatedWalletsWithPercent.length === 1 && index === 0, // Activate the first token if the first wallet is added
                })),
            };
            updatedPaymentMethods.push(newPaymentMethod);
        }

        updateState("paymentMethods", updatedPaymentMethods);
        setEditableWallets(editableWallets?.filter((i) => i !== index));
    };

    // Handler to update wallet address in the state
    const handleAddressChange = (e, index: number) => {
        const updatedWallets = [...wallets];
        updatedWallets[index].destinationAddress = e.target.value;
        setWallets(updatedWallets);
    };

    // Handler to update the percent value
    const handlePercentChange = (e, index: number) => {
        let value = parseInt(e.target.value, 10);

        if (value < 1) value = 1;
        if (value > 100) value = 100;

        const updatedWallets = [...wallets];
        updatedWallets[index].percent = value;
        setWallets(updatedWallets);

        const updatedPaymentMethods = [...paymentMethods];
        const targetPaymentMethod = updatedPaymentMethods.find((payment) => payment?.type === chain?.type);

        if (targetPaymentMethod && value) {
            targetPaymentMethod.destinationAddress[index].percent = value;
            updateState("paymentMethods", updatedPaymentMethods);
        }
    };

    const removeWallet = (index: number) => {
        const updatedWallets = wallets.filter((_, i) => i !== index);

        const newPercent = Math.floor(100 / updatedWallets.length);
        const remainingPercent = 100 - (newPercent * updatedWallets.length);

        const updatedWalletsWithPercent = updatedWallets.map((wallet, i) => {
            if (i === updatedWallets.length - 1) {
                return { ...wallet, percent: newPercent + remainingPercent };
            }
            return { ...wallet, percent: newPercent };
        });

        setWallets(updatedWalletsWithPercent);

        const updatedPaymentMethods = [...paymentMethods];
        const targetPaymentMethod = updatedPaymentMethods.find((payment) => payment?.type === chain?.type);

        if (targetPaymentMethod) {
            targetPaymentMethod.destinationAddress = updatedWalletsWithPercent.map(wallet => ({
                destinationAddress: wallet.destinationAddress,
                percent: wallet.percent,
            }));

            if (targetPaymentMethod.destinationAddress.length === 0) {
                targetPaymentMethod.isActive = false;
                targetPaymentMethod.tokens?.forEach((token) => (token.isActive = false));
            }
        }

        updateState("paymentMethods", updatedPaymentMethods);
    };

    const toggleEditMode = (index: number) => {
        if (editableWallets.includes(index)) {
            const updatedWallets = [...wallets];
            const currentAddress = updatedWallets[index].destinationAddress.trim();

            // Check if the current address is duplicated in other wallets
            const isDuplicate = updatedWallets.some((wallet, i) => i !== index && wallet.destinationAddress.trim() === currentAddress);

            if (isDuplicate) {
                showToast({ type: "warning", message: "This wallet address already exists. Please enter a unique address." });
                return;
            }

            setEditableWallets(editableWallets.filter((i) => i !== index));
        } else {
            setEditableWallets([...editableWallets, index]);
        }
    };

    return (
        <VStack align={"stretch"} gap={"16px"}>
            <Flex alignItems={"center"} justifyContent={"space-between"} alignSelf={"stretch"}>
                <FieldLabel label="Target Wallet" textProps={{ fontSize: "14px", color: "#C2C2C2", fontWeight: "600" }} />
                <Flex alignItems={"center"} justifyContent={"center"} gap={"6px"} padding={"8px 12px"} cursor={"pointer"} onClick={addNewWallet}>
                    <AppIcons.BluePlus />
                    <AppTypography fontSize={"12px"} fontWeight={500} color={"#179EF8"}>Add new wallet</AppTypography>
                </Flex>
            </Flex>

            <MotionFlex
                alignItems={"flex-start"}
                flexDirection={"column"}
                gap={"12px"}
                alignSelf={"stretch"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {wallets?.length !== 0 &&
                    <MotionFlex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        alignSelf={"stretch"}
                        width={"100%"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AppTypography fontSize={"14px"} fontWeight={500} color={"#C2C2C2"} width={"85%"}>Address</AppTypography>
                        {!wallets[0]?.isNew && <AppTypography fontSize={"14px"} fontWeight={500} color={"#C2C2C2"} textAlign={"left"} width={"15%"}>Percent</AppTypography>}
                    </MotionFlex>
                }

                {wallets && wallets?.map((wallet, index: number) => (
                    wallet?.isNew ? (
                        <AddAddressField
                            key={wallet._id}
                            wallet={wallet}
                            index={index}
                            handleAddressChange={handleAddressChange}
                            saveWalletAddress={saveWalletAddress}
                        />
                    ) : (
                        <AddressAndPercentField
                            key={wallet._id}
                            wallet={wallet}
                            index={index}
                            handleAddressChange={handleAddressChange}
                            handlePercentChange={handlePercentChange}
                            toggleEditMode={toggleEditMode}
                            removeWallet={removeWallet}
                            editableWallets={editableWallets}
                            persistWalletAddress={persistWalletAddress}
                        />
                    )
                ))}
            </MotionFlex>


            {wallets?.length !== 0 && calculatePercent.totalPercent !== 100 && calculatePercent.status !== "MISSING_ADDRESSES" &&
                <MotionFlex
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    alignItems={"flex-start"}
                    alignSelf={"stretch"}
                    gap={"8px"}
                    padding={"16px"}
                    borderRadius={"8px"}
                    border={"1px solid #F24"}
                    bgColor={"rgba(255, 34, 68, 0.05)"}
                >
                    <AppIcons.RedAlert />
                    <AppTypography fontSize={"14px"} fontWeight={400}>{calculateTotalPercent(wallets).message}</AppTypography>
                </MotionFlex>
            }

            <FieldLabel label="Payments" textProps={{ fontSize: "14px", color: "#C2C2C2", fontWeight: "600" }} />

            <HStack align={"stretch"} width={"full"} justify={"flex-start"} flexWrap={"wrap"}>
                {chain.tokens?.length &&
                    chain?.tokens?.map((token, index) => (
                        <Flex key={index} bg={"mainLayer"} rounded={"8px"} width={"auto"} gap={4} padding={"16px 16px"} alignItems={"center"} justifyContent="space-between">
                            <AppTypography color={"#C2C2C2"}>{token?.name}</AppTypography>
                            <AppSwitch isChecked={token.isActive} onChange={(e) => findAndUpdateToken(e, token)} />
                        </Flex>
                    ))}
            </HStack>
        </VStack>
    );
};

export default WalletsAccordionPayment;
