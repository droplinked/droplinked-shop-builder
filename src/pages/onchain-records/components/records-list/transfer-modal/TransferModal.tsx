import { Tabs } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import { useState } from "react";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import { useOnchainRecords } from "pages/onchain-records/context/OnchainRecordsContext";
import { useTransfer } from "../../../hooks/useTransfer";
import BulkUpload from "./bulk-upload/BulkUpload";
import ManualTransfer from "./manual-transfer/ManualTransfer";
import TransferModalBody from "./TransferModalBody";
import TransferModalFooter from "./TransferModalFooter";
import TransferModalHeader from "./TransferModalHeader";
import React from "react";
interface Props {
    onClose: () => void;
    isOpen: boolean;
    item: ICombinedNft;
}

/**
 * Modal component for NFT transfer operations
 * Provides UI for both manual transfer and bulk upload options
 */
export default function TransferModal({ onClose, isOpen, item }: Props) {
    // State for manual transfer form data
    const [manualTransferData, setManualTransferData] = useState([{ receiver: "", amount: 0 }]);
    // State for bulk upload file
    const [file, setFile] = useState<File>(null);
    const { refetch } = useOnchainRecords();

    // Initialize transfer hook with success callback
    const { handleTransfer, isLoading, isExecuteLoading } = useTransfer({
        item,
        onSuccess: () => {
            refetch(); // Refresh NFT data after successful transfer
            onClose(); // Close modal
        }
    });

    /**
     * Handle form submission for both manual and bulk transfer
     * @param selectedIndex - Selected tab index (0 for manual, 1 for bulk upload)
     */
    const handleSubmit = (selectedIndex: number) => {
        handleTransfer(manualTransferData, selectedIndex, file);
    };

    /**
     * Prevent modal closure during transfer execution
     */
    const handleCloseModal = () => {
        if (isExecuteLoading) return;
        onClose();
    };

    // Define tabs configuration for the modal
    const tabs = [
        {
            title: "Manual",
            content: <ManualTransfer data={manualTransferData} setData={(values) => setManualTransferData(values)} />,
        },
        {
            title: "Bulk Upload",
            content: <BulkUpload file={file} setFile={setFile} />,
        },
    ];

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: handleCloseModal, isCentered: true, size: "3xl" }}
            modalContentProps={{
                gap: 0,
                paddingBlock: 0,
                paddingBottom: { base: "16px", md: "36px" },
            }}
        >
            <Tabs isLazy={true}>
                {/* Modal sections */}
                <TransferModalHeader tabs={tabs} />
                <TransferModalBody tabs={tabs} />
                <TransferModalFooter
                    handleSubmit={handleSubmit}
                    onClose={onClose}
                    isLoading={isLoading}
                />
            </Tabs>
        </AppModal>
    );
}
