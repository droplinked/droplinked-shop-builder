import { Box, ModalBody, ModalCloseButton, ModalHeader, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AppModal from "components/redesign/modal/AppModal";
import { IPostWithdrawCircleWallet } from "lib/apis/shop/interfaces";
import { getCircleWallet, postWithdrawCircle } from "lib/apis/shop/shopServices";
import useAppStore from "lib/stores/app/appStore";
import { capitalizeFirstLetter } from "lib/utils/helpers/helpers";
import Button from "pages/invoice-management/components/Button";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IModalProps } from "types/interface/modal.interface";
import ConnectWallets from "../parts/connect/ConnectWallets";
import { motion } from "framer-motion";

const CircleManage = ({ isOpen, onClose, onOpen }: IModalProps) => {
  const { data, isLoading, refetch } = useQuery({ queryFn: getCircleWallet, queryKey: ["circle_wallet"], refetchOnWindowFocus: true });
  const { shop, user } = useAppStore(), connectWalletModal = useDisclosure();
  const [Error, setError] = useState<string | null>(null);
  const { data: withdrawData, mutateAsync: withdraw, isLoading: isWithdrawing } = useMutation((props: IPostWithdrawCircleWallet) => postWithdrawCircle(props));
  return (
    <>
      <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "3xl" }}>
        <ModalHeader display="flex" height="48px" justifyContent="space-between" alignItems="flex-start" alignSelf="stretch">
          <AppIcons.CircleModal />
          <ModalCloseButton width="fit-content" height="fit-content" position="relative" color="white" />
        </ModalHeader>
        <ModalBody display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" gap="24px">
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="8px" alignSelf="stretch">
            <AppTypography color="#FFF" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="36px">Manage Circle Wallet</AppTypography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius="8px" border="1px solid #292929">
            {data?.data?.data?.map((chain) => {
              const Icon = AppIcons?.[`Circle${capitalizeFirstLetter(chain?.chain?.toLowerCase() || "")}`];
              return (
                <Box key={chain?.chain} display="flex" padding="16px 24px" alignItems="center" gap="24px" alignSelf="stretch" flex="3">
                  <Box display="flex" alignItems="center" gap="16px" flex="1">
                    <Box display="flex" width="40px" height="40px" padding="8px" flexDirection="column" justifyContent="center" alignItems="center" gap="8px" flexShrink="0" rounded="36px" bgColor="#262626">
                      {Icon && <Icon />}
                    </Box>
                    <AppTypography color="#FFF" flex="1 0 0" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">{chain?.tokenName}</AppTypography>
                  </Box>
                  <Box sx={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", flex: "1 0 0", overflow: "hidden", display: "flex", ...(chain?.amount && chain?.amount !== "0" && { "&:hover .hover-amount": { maxWidth: "100%", transition: "max-width .5s ease" }, "&:hover .hover-symbol": { opacity: "0", transition: "opacity .5s ease" } }) }}>
                      <AppTypography className="hover-amount" sx={{ color: "#B1B1B1", display: "-webkit-box", textOverflow: "ellipsis", height: "auto", maxWidth: "50%", fontFamily: "Inter", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px", WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}>{chain?.amount}</AppTypography>
                      <AppTypography className="hover-symbol" sx={{ color: "#B1B1B1", fontFamily: "Inter", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px", flex: "1 0 0", opacity: "1" }}>{chain?.tokenSymbol}</AppTypography>
                  </Box>
                  <Button display="flex" padding="12px 16px" justifyContent="center" alignItems="center" gap="6px" color="#2BCFA1" textAlign="center" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="16px" backgroundColor="transparent" border="none" _hover={{ backgroundColor: "rgba(43, 207, 161, 0.10)" }} _active={{ backgroundColor: "rgba(43, 207, 161, 0.10)" }} isDisabled={isWithdrawing || !chain?.tokenId || !chain?.amount || chain?.amount === "0"} opacity={isWithdrawing ? ".3" : "1"} 
                  onClick={async () => {
                    if (!user?.wallets?.find((wallet) => wallet?.type === chain?.chain)?.address) {
                      if (chain?.tokenId && chain?.amount && chain?.amount !== "0")
                        await withdraw({ tokenId: chain?.tokenId, amount: chain?.amount })
                          .then(async (res) => { if (res?.data?.data === true) await refetch(); })
                          .catch((e) => {});
                    } else setError(chain?.chain);
                  }}>Withdraw</Button>
                </Box>
              );
            })}
          </Box>
          {Error && (
            <Box display="flex" padding="16px" alignItems="center" gap="16px" alignSelf="stretch" borderRadius="8px" border="1px solid #F24" background="rgba(255, 34, 68, 0.05)">
              <Box display="flex" alignItems="flex-start" gap="8px" flex="1 0 0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 6.66675V10.0001M10.0001 13.3334H10.0084M18.3334 10.0001C18.3334 14.6025 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6025 1.66675 10.0001C1.66675 5.39771 5.39771 1.66675 10.0001 1.66675C14.6025 1.66675 18.3334 5.39771 18.3334 10.0001Z" stroke="#FF2244" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" flex="1 0 0">
                  <AppTypography alignSelf="stretch" color="#FFF" fontSize="14px" fontStyle="normal" fontWeight="700" lineHeight="20px">Wallet not connected</AppTypography>
                  <AppTypography alignSelf="stretch" color="#FFF" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">Please connect a {Error} supported wallet first, then proceed with the withdrawal.</AppTypography>
                </Box>
              </Box>
              <Button display="flex" border="none" color="#FFF" textAlign="center" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="16px" padding="12px 16px" justifyContent="center" alignItems="center" gap="6px" borderRadius="8px" background="#262626" onClick={connectWalletModal.onOpen}>Connect Wallet</Button>
            </Box>
          )}
        </ModalBody>
      </AppModal>
      <AppModal modalRootProps={{ isOpen: connectWalletModal.isOpen, onClose: connectWalletModal.onClose, isCentered: false, size: "3xl" }}>
        <ModalHeader display="flex" justifyContent="center" alignItems="center" alignSelf="stretch">
          <AppTypography color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="36px">Connect your wallets</AppTypography>
        </ModalHeader>
        <ModalBody paddingInline="0px !important" padding="0px" overflow="auto">
          <ConnectWallets />
        </ModalBody>
      </AppModal>
    </>
  );
};

export default CircleManage;
