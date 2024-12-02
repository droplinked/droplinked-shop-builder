import { Box, ModalBody } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import WalletStatus from "components/common/walletStatus/WalletStatus";
import Button from "components/redesign/button/Button";
import AppModal from "components/redesign/modal/AppModal";
import { postCreateCircleWallet } from "lib/apis/shop/shopServices";
import useAppStore from "lib/stores/app/appStore";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function CreateWallet({ hasCreatedCircleWallet }: { hasCreatedCircleWallet: boolean }) {
    const navigate = useNavigate();
    const { updateState, shop } = useAppStore();
    const {
        isLoading: isCreatingWallet,
        isError,
        data: createWalletData,
    } = useQuery({
        queryFn: postCreateCircleWallet,
        queryKey: ["create-wallet"],
        enabled: !hasCreatedCircleWallet,
        onSuccess(res) {
            if (res?.data?.data) updateState({ key: "shop", params: { ...shop, circleWallets: res?.data?.data } });
        },
    });
    return (
        <AppModal modalRootProps={{ isOpen: true, onClose: () => { }, size: "3xl", isCentered: true }} modalContentProps={{ width: "auto !important", padding: "0px !important" }}>
            <ModalBody
                display="flex"
                width={{ base: "360px", md: "625px" }}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="36px"
                padding={"0px !important"}
                paddingInline={"0px !important"}
                paddingBlock={"0px !important"}
                rounded="24px"
            >
                <WalletStatus isLoading={isCreatingWallet && !isError} variant={isError ? "red" : "green"} icon={createWalletData?.data?.data || hasCreatedCircleWallet ? "tick" : "wallet"} />
                <Box display="flex" padding="0px 48px 48px 48px" flexDirection="column" alignItems="center" gap="48px" flex="1 0 0" alignSelf="stretch">
                    <Box display="flex" flexDirection="column" alignItems="center" gap="12px" flex="1 0 0" alignSelf="stretch">
                        <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                            {!(createWalletData?.data?.data || hasCreatedCircleWallet) && (isCreatingWallet || isError) ? "Initializing Wallet" : "Wallet Created!"}
                        </AppTypography>
                        <AppTypography color="#B1B1B1" align={"center"} fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                            {!(createWalletData?.data?.data || hasCreatedCircleWallet) && (isCreatingWallet || isError)
                                ? "Please wait while a new wallet is generated"
                                : "You can now manage your funds, make transactions, and explore the full range of features."}
                        </AppTypography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                        <Button
                            backgroundColor={"#292929"}
                            border={"none"}
                            display="flex"
                            padding="12px 16px"
                            justifyContent="center"
                            alignItems="center"
                            color="#FFF"
                            textAlign="center"
                            fontFamily="Inter"
                            fontSize={{ base: "14px", md: "16px" }}
                            fontStyle="normal"
                            fontWeight="500"
                            lineHeight={{ base: "16px", md: "24px" }}
                            onClick={() => !isCreatingWallet && !isError && navigate("/analytics/settings/technical")}
                            {...((isCreatingWallet || isError) && { background: "#292929", color: "#737373", cursor: "not-allowed" })}
                        >
                            Access Wallet
                        </Button>
                        <Button
                            padding="12px 20px"
                            color="#000"
                            textAlign="center"
                            fontFamily="Inter"
                            fontSize={{ base: "14px", md: "16px" }}
                            fontStyle="normal"
                            fontWeight="500"
                            lineHeight={{ base: "16px", md: "24px" }}
                            onClick={() => !isCreatingWallet && navigate("/analytics")}
                            {...(isCreatingWallet && { background: "#292929", color: "#737373", cursor: "not-allowed", border: "none" })}
                        >
                            Go to Dashboard
                        </Button>
                    </Box>
                </Box>
            </ModalBody>
        </AppModal>
    );
}

export default CreateWallet;
