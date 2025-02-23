import { ModalBody } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppModal from "components/redesign/modal/AppModal";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import ConnectWallets from "pages/register-pages/component/connect/ConnectWallets";
import React from "react";
import { useOnchainRecords } from "../context/OnchainRecordsContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConnectWalletModal({ isOpen, onClose }: Props) {
    const { refetch } = useOnchainRecords();

    const handleClose = () => {
        onClose();
        refetch();
    }

    return (
        <AppModal
            modalRootProps={{
                isOpen: isOpen,
                onClose: handleClose,
                isCentered: false,
                size: "3xl",
            }}
            modalContentProps={{
                background: "#141414",
                paddingTop: { lg: 12, md: 8, base: 4 },
                paddingBlock: "0px"
            }}>
            <ModalHeaderData
                modalHeaderProps={{
                    bgColor: "#141414",
                }}
                descriptionColor="#B1B1B1 !important"
                title="Connect your wallets"
                icon={<AppIcons.Wallet />}
                description="Please select a wallet to connect."
            />
            <ModalBody paddingInline="0px !important" padding="0px" overflow="auto">
                <ConnectWallets />
            </ModalBody>
        </AppModal>
    );
}
