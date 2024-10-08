import { Box, Flex, ModalBody, StyleProps, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AuthModal from "components/modals/auth-modal/AuthModal";
import AppModal from "components/redesign/modal/AppModal";
import { IPostUserVerifyD3 } from "lib/apis/user/interfaces";
import { postUserVerifyD3 } from "lib/apis/user/services";
import { appDevelopment } from "lib/utils/app/variable";
import { getNetworkProvider } from "lib/utils/chains/chainProvider";
import { Chain, Network } from "lib/utils/chains/dto/chains";
import Button from "pages/invoice-management/components/Button";
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage";
import React, { useContext, useMemo } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import D3Context, { D3StepsType } from "../../context/d3.context";
import WalletStatusSideIcons from "components/common/walletStatus/WalletStatusSideIcons";
const D3Modal = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { mutateAsync, isLoading } = useMutation((props: IPostUserVerifyD3) => postUserVerifyD3(props));
    const navigate = useNavigate();
    const { isOpen: signupModalIsOpen, onOpen: signupModalOnOpen, onClose: signupModalOnClose } = useDisclosure();
    const [searchParams] = useSearchParams();
    const { states: { currentStep }, methods: { updateStates } } = useContext(D3Context);
    const connect_d3_wallet = () => {
        return new Promise((resolve, reject) => {
            updateStates({ key: "currentStep", value: "loading" });
            getNetworkProvider(Chain.ETH, Network[appDevelopment ? "TESTNET" : "MAINNET"], null)
                .walletLogin()
                .then(async (res) => {
                    console.log(res);
                    await mutateAsync({ walletAddress: res?.address, walletType: "EVM" }).then((verifyRes) => {
                        console.log(verifyRes?.data?.data);
                        if (!verifyRes?.data?.data || verifyRes?.data?.data === "false" || verifyRes?.data?.data === false) return updateStates({ key: "currentStep", value: "error" });
                        searchParams.set("d3-id", verifyRes?.data?.data);
                        updateStates({ key: "currentStep", value: "done" });
                    });
                    resolve(res);
                })
                .catch((error) => {
                    updateStates({ key: "currentStep", value: "error" });
                    // reject(error);
                });
        });
    };
    const connect_wallet_steps: {
        [K in D3StepsType]: {
            title: string;
            description: string;
            buttons: { left: null | { label: string; onClick: () => void; styles?: StyleProps }; right: { label: string; onClick: () => void; rightIcon?: any; styles?: StyleProps } };
        };
    } = {
        connect: {
            title: "Connect Wallet for Verification",
            description: "Connect your wallet to check if you're eligible for the 6 month Pro Plan.",
            buttons: {
                left: {
                    label: "Close",
                    onClick: onClose,
                    styles: {},
                },
                right: { label: "Check Wallet Eligibility", onClick: async () => await connect_d3_wallet(), rightIcon: <AppIcons.SidebarNext />, styles: {} },
            },
        },
        loading: {
            title: "Verifying Wallet Status",
            description: "Please wait while your wallet is verified for eligibility.",
            buttons: {
                left: {
                    label: "Close",
                    onClick: () => { },
                    styles: {
                        background: "#292929",
                        color: "#737373",
                        cursor: "not-allowed",
                    },
                },
                right: {
                    label: "Check Wallet Eligibility",
                    onClick: () => { },
                    rightIcon: <AppIcons.SidebarNext />,
                    styles: {
                        background: "#292929",
                        color: "#737373",
                        cursor: "not-allowed",
                        border: "none",
                    },
                },
            },
        },
        error: {
            title: "Wallet Verification Unsuccessful",
            description: "It looks like your wallet doesn’t meet the criteria. Unfortunately, you're not eligible to claim the offer.",
            buttons: { left: null, right: { label: "Return", onClick: () => updateStates({ key: "currentStep", value: "connect" }) } },
        },
        done: {
            title: "Congrats, Wallet Offer Verified",
            description: "You can now create an account and enjoy 6 months of a Pro Plan.",
            buttons: {
                left: null,
                right: {
                    label: "Claim Now",
                    onClick: () => {
                        if (searchParams.get("d3-id")) {
                            navigate(`/d3/?d3-id=${searchParams.get("d3-id").toString()}`);
                            if (searchParams.get("d3-id")) {
                                console.log(searchParams.get("d3-id"));
                                onClose();
                                signupModalOnOpen();
                            }
                        }
                    },
                },
            },
        },
    };
    const current_state = useMemo(() => connect_wallet_steps?.[currentStep], [currentStep, updateStates]);

    return (
        <>
            <Button paddingInline={{ base: 4, lg: 5 }} fontSize={{ base: 14, lg: 16 }} fontWeight={500} onClick={onOpen}>
                Claim Now
            </Button>
            <AppModal modalRootProps={{ isOpen, onClose, size: "3xl", isCentered: true }} modalContentProps={{ width: "auto !important", padding: "0px !important" }}>
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
                    <WalletStatusSideIcons variant={currentStep === "error" ? "red" : "green"} isLoading={currentStep === "loading"} icon={currentStep === "done" ? "tick" : "wallet"} />
                    <Box display="flex" padding={{ base: "0px 16px 36px 16px", md: "0px 48px 48px 48px" }} flexDirection="column" alignItems="flex-end" gap="48px" alignSelf="stretch">
                        <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                            <AppTypography color="#FFF" fontFamily="Inter" fontSize={{ base: "18px", md: "24px" }} fontStyle="normal" fontWeight="700" lineHeight="36px">
                                {current_state?.title}
                            </AppTypography>
                            <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize={{ base: "14px", md: "16px" }} fontStyle="normal" fontWeight="400" lineHeight="24px">
                                {current_state?.description}
                            </AppTypography>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={{ base: "12px", md: "auto" }} alignSelf="stretch" flexDir={{ base: "column", md: "row" }}>
                                <Box display={"flex"} alignItems={"center"} gap={"12px"} flex={"1 0 0"}>
                                    <Box as="svg" width="32px" height="32px" viewBox="0 0 32 32" fill="none">
                                        <rect width="32" height="32" rx="16" fill="#2BCFA1" fill-opacity="0.1" />
                                        <path
                                            d="M16 10L16.9535 13.5412C17.0698 13.9733 17.128 14.1894 17.2428 14.366C17.3444 14.5223 17.4777 14.6556 17.634 14.7572C17.8106 14.872 18.0267 14.9302 18.4588 15.0465L22 16L18.4588 16.9535C18.0267 17.0698 17.8106 17.128 17.634 17.2428C17.4777 17.3444 17.3444 17.4777 17.2428 17.634C17.128 17.8106 17.0698 18.0267 16.9535 18.4588L16 22L15.0465 18.4588C14.9302 18.0267 14.872 17.8106 14.7572 17.634C14.6556 17.4777 14.5223 17.3444 14.366 17.2428C14.1894 17.128 13.9733 17.0698 13.5412 16.9535L10 16L13.5412 15.0465C13.9733 14.9302 14.1894 14.872 14.366 14.7572C14.5223 14.6556 14.6556 14.5223 14.7572 14.366C14.872 14.1894 14.9302 13.9733 15.0465 13.5412L16 10Z"
                                            stroke="#2BCFA1"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        6 Month Pro Plan
                                    </AppTypography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"} gap={"12px"} flex={"1 0 0"}>
                                    <Box as="svg" width="32px" height="32px" viewBox="0 0 32 32" fill="none">
                                        <rect x="0.5" width="32" height="32" rx="16" fill="#2BCFA1" fill-opacity="0.1" />
                                        <path
                                            d="M20.9 10H12.1C11.2163 10 10.5 10.7163 10.5 11.6V20.4C10.5 21.2837 11.2163 22 12.1 22H20.9C21.7837 22 22.5 21.2837 22.5 20.4V11.6C22.5 10.7163 21.7837 10 20.9 10Z"
                                            stroke="#2BCFA1"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M17.8335 17L19.8335 14.6666M18.1192 18.1666C18.1192 18.811 17.6076 19.3333 16.9764 19.3333C16.3452 19.3333 15.8335 18.811 15.8335 18.1666C15.8335 17.5223 16.3452 17 16.9764 17C17.6076 17 18.1192 17.5223 18.1192 18.1666Z"
                                            stroke="#2BCFA1"
                                            stroke-linecap="round"
                                        />
                                        <path d="M13.1665 16C13.1665 14.159 14.7584 12.6666 16.7221 12.6666C17.3697 12.6666 17.9769 12.8289 18.4998 13.1126" stroke="#2BCFA1" stroke-linecap="round" />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Instant Verification
                                    </AppTypography>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" gap="24px" alignSelf="stretch">
                                <Flex flex={"1 0 0"} alignItems={"flex-start"}>
                                    {current_state?.buttons?.left && (
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
                                            onClick={current_state?.buttons?.left?.onClick}
                                            {...current_state?.buttons?.left?.styles}
                                        >
                                            Close
                                        </Button>
                                    )}
                                </Flex>
                                <Button
                                    padding="12px 20px"
                                    color="#000"
                                    textAlign="center"
                                    fontFamily="Inter"
                                    fontSize={{ base: "14px", md: "16px" }}
                                    fontStyle="normal"
                                    fontWeight="500"
                                    lineHeight={{ base: "16px", md: "24px" }}
                                    onClick={current_state?.buttons?.right?.onClick}
                                    {...current_state.buttons?.right?.styles}
                                >
                                    {current_state?.buttons?.right?.label}
                                    {current_state?.buttons?.right?.rightIcon && current_state?.buttons?.right?.rightIcon}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </ModalBody>
            </AppModal>
            {signupModalIsOpen && <AuthModal show={true} type={MODAL_TYPE.SIGNUP} close={signupModalOnClose} />}
        </>
    );
};

export default D3Modal;