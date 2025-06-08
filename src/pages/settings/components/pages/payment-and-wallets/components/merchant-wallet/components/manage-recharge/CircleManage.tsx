import { Box, ModalBody, ModalHeader, Skeleton, SkeletonCircle, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import AppModal from "components/redesign/modal/AppModal";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import { motion } from "framer-motion";
import { IPostWithdrawCircleWallet } from "lib/apis/shop/interfaces";
import { getCircleWallet, postWithdrawCircle } from "lib/apis/shop/shopServices";
import useAppStore from "stores/app/appStore";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IModalProps } from "types/interface/modal.interface";
import ConnectWallets from "./connect/ConnectWallets";
import { ChainIcons } from "utils/constants/chainIcons";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import { appDevelopment } from "utils/app/variable";

const CircleManage = ({ isOpen, onClose, onOpen }: IModalProps) => {
    const { data, refetch } = useQuery({ queryFn: getCircleWallet, queryKey: ["circle_wallet"], refetchOnWindowFocus: true });
    const { user } = useAppStore(),
        connectWalletModal = useDisclosure();
    const [Error, setError] = useState<string | null>(null);
    const [withdrawingChain, setWithdrawingChain] = useState<string | null>(null);
    const { mutateAsync: withdraw, isLoading: isWithdrawing } = useMutation((props: IPostWithdrawCircleWallet) => postWithdrawCircle(props));

    const handleWithdraw = async (chain: any) => {

        if (chain?.tokenSymbol === "USDC" && !appDevelopment) {
            setError("USDC");
            return;
        }
        if (user?.wallets?.find((wallet) => wallet?.type === chain?.chain)?.address) {
            if (chain?.tokenId && chain?.amount && chain?.amount !== "0") {
                setWithdrawingChain(chain?.chain);
                await withdraw({ tokenId: chain?.tokenId, amount: chain?.amount })
                    .then(async (res) => {
                        if (res?.data?.data === true) await refetch();
                    })
                    .catch((e) => { })
                    .finally(() => {
                        setWithdrawingChain(null);
                    });
            }
        } else setError(chain?.chain);
    };

    const WalletListSkeleton = () => (
        <>
            {[1, 2, 3].map((_, index) => (
                <Box key={index} display="flex" padding="16px 24px" alignItems="center" gap="24px" alignSelf="stretch" flex="3">
                    <Box display="flex" alignItems="center" gap="16px" flex="1">
                        <SkeletonCircle size="10" />
                        <Skeleton height="24px" width="120px" />
                    </Box>
                    <Skeleton height="24px" flex={1} />
                    <Skeleton height="40px" width="100px" />
                </Box>
            ))}
        </>
    );

    const EmptyWalletList = () => (
        <Box display="flex" justifyContent="center" alignItems="center" padding="24px" width="100%">
            <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                No wallets available
            </AppTypography>
        </Box>
    );
    const buttonVariants = {
        idle: { scale: 1 },
        withdrawing: { scale: [1, 0.97, 1], transition: { duration: 1.5, repeat: Infinity } },
    };

    const arrowVariants = {
        idle: { y: 10, opacity: 1 },
        withdrawing: {
            y: [-10, 10, -10],
            opacity: [0.5, 0, 1],
            transition: {
                y: { duration: 1.5, repeat: Infinity },
                opacity: { duration: 1.5, repeat: Infinity },
            },
        },
    };

    return (
        <>
            <AppModal
                modalRootProps={{ isOpen, onClose, isCentered: true, size: "4xl" }}
                modalContentProps={{ gap: 0, paddingBlock: 0, paddingBottom: "48px" }}
            >
                <ModalHeaderData
                    icon={<AppIcons.CircleModal />}
                    modalHeaderProps={{
                        bgColor: "#141414",
                        paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                    }}
                    descriptionProps={{
                        color: "#B1B1B1 !important"
                    }}
                    title={"Manage Wallet"}
                    description="Manage USDC powered wallet by Circle"
                />
                <ModalBody mt={"48px"} display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" gap="24px">
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="8px" alignSelf="stretch">
                        <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                            Manage Circle Wallet
                        </AppTypography>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius="8px" border="1px solid" borderColor="neutral.gray.800">
                        {data?.data?.data === undefined ? (
                            <WalletListSkeleton />
                        ) : data?.data?.data.length === 0 ? (
                            <EmptyWalletList />
                        ) : (
                            data?.data?.data?.map((chain) => {
                                const Icon = ChainIcons[chain?.tokenSymbol];
                                const isWithdrawingThisChain = withdrawingChain === chain?.chain;
                                return (
                                    <Box key={chain?.chain} display="flex" padding="16px 24px" alignItems="center" gap="24px" alignSelf="stretch" flex="3">
                                        <Box display="flex" alignItems="center" gap="16px" flex="1">
                                            {Icon && <IconWrapper icon={<Icon />}></IconWrapper>}
                                            <AppTypography color="#FFF" flex="1 0 0" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                                                {chain?.tokenName}
                                            </AppTypography>
                                        </Box>
                                        {isWithdrawingThisChain ? (
                                            <Skeleton height="24px" flex={"1 0 0"} />
                                        ) : (
                                            <Box
                                                sx={{
                                                    justifyContent: "flex-start",
                                                    alignItems: "flex-start",
                                                    gap: "4px",
                                                    flex: "1 0 0",
                                                    overflow: "hidden",
                                                    maxH: "24px",
                                                    display: "flex",
                                                    ...(chain?.amount &&
                                                        chain?.amount !== "0" && {
                                                        "&:hover .hover-amount": { maxWidth: "100%", transition: "max-width .5s ease" },
                                                        "&:hover .hover-symbol": { opacity: "0", transition: "opacity .5s ease" },
                                                    }),
                                                }}
                                            >
                                                <AppTypography
                                                    className="hover-amount"
                                                    sx={{
                                                        color: "#B1B1B1",
                                                        display: "-webkit-box",
                                                        textOverflow: "ellipsis",
                                                        height: "auto",
                                                        maxWidth: "50%",
                                                        fontFamily: "Inter",
                                                        fontSize: "16px",
                                                        fontStyle: "normal",
                                                        fontWeight: "400",
                                                        lineHeight: "24px",
                                                        WebkitBoxOrient: "vertical",
                                                        WebkitLineClamp: 1,
                                                    }}
                                                >
                                                    {chain?.amount && Number(chain?.amount).toFixed(2)}
                                                </AppTypography>
                                                <AppTypography
                                                    className="hover-symbol"
                                                    sx={{
                                                        color: "#B1B1B1",
                                                        fontFamily: "Inter",
                                                        fontSize: "16px",
                                                        fontStyle: "normal",
                                                        fontWeight: "400",
                                                        lineHeight: "24px",
                                                        flex: "1 0 0",
                                                        opacity: "1",
                                                    }}
                                                >
                                                    {chain?.tokenSymbol}
                                                </AppTypography>
                                            </Box>
                                        )}
                                        <motion.button
                                            style={{
                                                display: "flex",
                                                borderRadius: "8px",
                                                padding: "12px 16px",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "6px",
                                                color: "#2BCFA1",
                                                textAlign: "center",
                                                fontFamily: "Inter",
                                                fontSize: "14px",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "16px",
                                                backgroundColor: "transparent",
                                                border: "none",
                                                opacity: isWithdrawing || !chain?.tokenId || !chain?.amount || chain?.amount === "0" ? ".3" : "1",
                                                cursor: isWithdrawing || !chain?.tokenId || !chain?.amount || chain?.amount === "0" ? "not-allowed" : "pointer",
                                                position: "relative",
                                                overflow: "hidden",
                                            }}
                                            whileHover={{ backgroundColor: "rgba(43, 207, 161, 0.10)" }}
                                            whileFocus={{ backgroundColor: "rgba(43, 207, 161, 0.10)" }}
                                            disabled={isWithdrawing || !chain?.tokenId || !chain?.amount || chain?.amount === "0"}
                                            onClick={() => handleWithdraw(chain)}
                                            variants={buttonVariants}
                                            animate={isWithdrawingThisChain ? "withdrawing" : "idle"}
                                        >
                                            {isWithdrawingThisChain ? "Withdrawing" : "Withdraw"}
                                            <motion.div
                                                style={{
                                                    transform: "translateX(-80%)",
                                                    display: isWithdrawingThisChain ? "block" : "none",
                                                }}
                                                variants={arrowVariants}
                                                animate={isWithdrawingThisChain ? "withdrawing" : "idle"}
                                            >
                                                <Box transform="rotate(180deg)">
                                                    <AppIcons.CircleWithdraw />
                                                </Box>
                                            </motion.div>
                                        </motion.button>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                    {Error && (
                        <Box display="flex" padding="16px" alignItems="center" gap="16px" alignSelf="stretch" borderRadius="8px" border="1px solid #F24" background="rgba(255, 34, 68, 0.05)">
                            <Box display="flex" alignItems="flex-start" gap="8px" flex="1 0 0">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.0001 6.66675V10.0001M10.0001 13.3334H10.0084M18.3334 10.0001C18.3334 14.6025 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6025 1.66675 10.0001C1.66675 5.39771 5.39771 1.66675 10.0001 1.66675C14.6025 1.66675 18.3334 5.39771 18.3334 10.0001Z"
                                        stroke="#FF2244"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" flex="1 0 0">
                                    <AppTypography alignSelf="stretch" color="#FFF" fontSize="14px" fontStyle="normal" fontWeight="700" lineHeight="20px">
                                        {Error === "USDC" ? 'For USDC withdrawals, your account needs to be verified.' : 'Wallet not connected'}

                                    </AppTypography>
                                    <AppTypography alignSelf="stretch" color="#FFF" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        {Error === "USDC"
                                            ? "Please contact Droplinked support at support@droplinked.com for verification."
                                            : `Please connect a ${Error} supported wallet first, then proceed with the withdrawal.`}
                                    </AppTypography>
                                </Box>
                            </Box>
                            {Error === "USDC" ? null :

                                <AppButton
                                    display="flex"
                                    border="none"
                                    color="#FFF"
                                    textAlign="center"
                                    fontFamily="Inter"
                                    fontSize="14px"
                                    fontStyle="normal"
                                    fontWeight="500"
                                    lineHeight="16px"
                                    padding="12px 16px"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="6px"
                                    borderRadius="8px"
                                    background="neutral.gray.850"
                                    onClick={connectWalletModal.onOpen}
                                >
                                    Connect Wallet
                                </AppButton>}

                        </Box>
                    )}
                </ModalBody>
            </AppModal>
            <AppModal modalRootProps={{ isOpen: connectWalletModal.isOpen, onClose: connectWalletModal.onClose, isCentered: false, size: "3xl" }}>
                <ModalHeader display="flex" justifyContent="center" alignItems="center" alignSelf="stretch">
                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                        Connect your wallets
                    </AppTypography>
                </ModalHeader>
                <ModalBody paddingInline="0px !important" padding="0px" overflow="auto">
                    <ConnectWallets />
                </ModalBody>
            </AppModal>
        </>
    );
};

export default CircleManage;
