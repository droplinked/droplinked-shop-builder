import { Divider, ModalBody, ModalFooter, TabPanel, TabPanels, Tabs, useMediaQuery } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import ModalHeaderIconWrapper from "components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper";
import AppModal from "components/redesign/modal/AppModal";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import React, { useState } from "react";
import TabsList from "../tabs-components/TabsList";
import ManualTransfer from "./manual-transfer/ManualTransfer";
import BulkUpload from "./bulk-upload/BulkUpload";

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

export default function TransferModal({ onClose, isOpen }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const [manualTransferData, setManualTransferData] = useState([{ address: '', percent: 0 }]);

    const tabs = [
        {
            title: "Manual",
            content: <ManualTransfer
                data={manualTransferData}
                setData={(values) => setManualTransferData(values)}
            />
        },
        {
            title: "Bulk Upload",
            content: <BulkUpload />
        },
    ];

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, isCentered: true, size: "3xl" }}
            modalContentProps={{
                gap: 0,
                paddingBlock: 0,
                paddingBottom: { base: "16px", md: "36px" }
            }}
        >
            <Tabs isLazy={true}>
                <ModalHeaderData
                    modalHeaderProps={{
                        bgColor: "#141414",
                        paddingBlock: { md: "unset", base: "16px 0px !important" },
                        borderBottom: "1px solid #292929",
                        pt: { md: "48px !important", base: "16px !important" },
                        pb: "0px !important",
                    }}
                    descriptionColor="#B1B1B1 !important"
                    title="Transfer Records"
                    {...(!isSmallerThan768 && {
                        icon: (
                            <ModalHeaderIconWrapper>
                                <AppIcons.Transfer />
                            </ModalHeaderIconWrapper>
                        ),
                    })}
                    description="Send onchain records to one or multiple parties below."
                >
                    <ExternalLink fontSize={14} fontWeight={500} mt={2} pb={4}>
                        Download Sample Template
                    </ExternalLink>
                    <TabsList tabs={tabs} />
                </ModalHeaderData>
                <ModalBody py={"16px !important"}>
                    <TabPanels>
                        {tabs.map((tab) => (
                            <TabPanel key={tab.title}>{tab.content}</TabPanel>
                        ))}
                    </TabPanels>
                </ModalBody>
                <Divider borderColor={"#292929"} />
                <ModalFooter
                    pt={{ base: "16px !important", md: "36px !important" }}
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={4}
                >
                    <Button width={{ base: "25%", md: "max-content" }} fontWeight={500} onClick={onClose} fontSize={14} variant="secondary">
                        Cancel
                    </Button>
                    <Button width={{ base: "70%", md: "max-content" }} fontWeight={500} onClick={onClose} fontSize={14}>
                        Validate
                    </Button>
                </ModalFooter>
            </Tabs>
        </AppModal>
    );
}
