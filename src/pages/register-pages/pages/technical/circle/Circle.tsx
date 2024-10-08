import { Box, Flex, Image, Input, ModalBody, ModalCloseButton, ModalHeader, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AppModal from "components/redesign/modal/AppModal";
import { IPostWithdrawCircleWallet } from "lib/apis/shop/interfaces";
import { getCircleWallet, postWithdrawCircle } from "lib/apis/shop/shopServices";
import useAppStore from "lib/stores/app/appStore";
import Button from "pages/invoice-management/components/Button";
import React from "react";
import { useMutation, useQuery } from "react-query";

const Circle = () => {
    const { data, isLoading } = useQuery({ queryFn: getCircleWallet, queryKey: "circle_wallet" });
    const { data: withdrawData, mutateAsync: withdraw, isLoading: isWithdrawing } = useMutation((props: IPostWithdrawCircleWallet) => postWithdrawCircle(props));
    const { shop } = useAppStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(shop?.circleWallets);
    return (
        <Box display="flex" width="full" alignItems="center" borderRadius="8px" background="#1C1C1C">
            <Image src="https://upload-file-droplinked.s3.amazonaws.com/0ed7113f38aa1fdd77fef89b65c1928a0d265d9fc8aa26d57bc7424344bd1bf8.png" width={"320px"} height={"full"} objectFit={"cover"} />
            <Box display="flex" padding="36px" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="8px" flex="1 0 0">
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="36px" alignSelf="stretch">
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="16px" alignSelf="stretch">
                            <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
                                <AppTypography color="#FFF" alignSelf="stretch" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">
                                    Circle Wallet
                                </AppTypography>
                                <AppTypography color="#7B7B7B" alignSelf="stretch" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                    Activate the merchant wallet by Circle to enable USDC acceptance. Circle’s programmable wallet offers a secure and seamless way to manage revenue while minimizing
                                    merchant processing fees.
                                </AppTypography>
                            </Box>
                            <Box display="flex" alignItems="flex-start" gap="36px" alignSelf="stretch">
                                <Box display="flex" alignItems="center" gap="8px">
                                    <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                                        <AppIcons.CircleShield />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Secure
                                    </AppTypography>
                                </Box>
                                <Box display="flex" alignItems="center" gap="8px">
                                    <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                                        <AppIcons.CircleDashboard />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Instant Access
                                    </AppTypography>
                                </Box>
                                <Box display="flex" alignItems="center" gap="8px">
                                    <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                                        <AppIcons.CircleRefresh />
                                    </Box>
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                        Automatic Conversion
                                    </AppTypography>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" height="48px" alignItems="flex-start" gap="16px" alignSelf="stretch" position={"relative"}>
                            <Box display="flex" alignItems="flex-start" flex="1 0 0">
                                <Box display="flex" padding="12px 16px" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px" border="1px solid #3C3C3C">
                                    <Input
                                        display="-webkit-box"
                                        style={{ WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}
                                        color="#BCBCBC"
                                        textOverflow="ellipsis"
                                        padding={"0px"}
                                        height={"auto"}
                                        border={"none"}
                                        focusBorderColor="transparent"
                                        fontFamily="Inter"
                                        fontSize="16px"
                                        fontWeight="400"
                                        value={"0xe29E7479c23Db494aAa0D36C93844B2d79f50c2245"}
                                    />
                                    <AppIcons.CircleCopy />
                                </Box>
                                <Box
                                    display="flex"
                                    padding="0px 4px"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="4px"
                                    position="absolute"
                                    left="12px"
                                    top="-8px"
                                    borderRadius="4px"
                                    background="#1C1C1C"
                                >
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">
                                        Wallet Address
                                    </AppTypography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="flex-start" gap="16px">
                        <Button
                            display="flex"
                            border="none"
                            color="#000"
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
                            background="#2BCFA1"
                            onClick={onOpen}
                        >
                            Manage Wallet
                        </Button>
                        <Button
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
                            background="#262626"
                        >
                            Charge Wallet
                        </Button>
                    </Box>
                </Box>
            </Box>
            <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "3xl" }}>
                <ModalHeader display="flex" height="48px" justifyContent="space-between" alignItems="flex-start" alignSelf="stretch">
                    <AppIcons.CircleModal />
                    <ModalCloseButton width={"fit-content"} height={"fit-content"} position={"relative"} color={"white"} />
                </ModalHeader>
                <ModalBody display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" gap={"24px"}>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="8px" alignSelf="stretch">
                        <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">
                            Manage Circle Wallet
                        </AppTypography>
                        <AppTypography color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                            Select one of the products to add into your invoice.
                        </AppTypography>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius="8px" border="1px solid #292929">
                        <Box display="flex" padding="16px 24px" alignItems="center" gap="24px" alignSelf="stretch" flex="3">
                            <Box display={"flex"} alignItems={"center"} gap={"16px"} flex="1">
                                <Box
                                    display="flex"
                                    width="40px"
                                    height="40px"
                                    padding="8px"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="8px"
                                    flexShrink="0"
                                    rounded="36px"
                                    bgColor="#262626"
                                />
                                <AppTypography color="#FFF" flex="1 0 0" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                                    USDC
                                </AppTypography>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" gap="4px" flex="1 0 0">
                                <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                                    138.89
                                </AppTypography>
                                <AppTypography color="#B1B1B1" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px" flex="1 0 0">
                                    USDC
                                </AppTypography>
                            </Box>
                            <Button
                                display="flex"
                                padding="12px 16px"
                                justifyContent="center"
                                alignItems="center"
                                gap="6px"
                                color="#2BCFA1"
                                textAlign="center"
                                fontFamily="Inter"
                                fontSize="14px"
                                fontStyle="normal"
                                fontWeight="500"
                                lineHeight="16px"
                                backgroundColor="transparent"
                                border="none"
                                _hover={{ backgroundColor: "rgba(43, 207, 161, 0.10)" }}
                                _active={{ backgroundColor: "rgba(43, 207, 161, 0.10)" }}
                                onClick={async () => await withdraw({ tokenId: "", amount: 0 })}
                            >
                                Withdraw
                            </Button>
                        </Box>
                    </Box>
                </ModalBody>
            </AppModal>
        </Box>
    );
};

export default Circle;
