import { Divider, ModalBody, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { AxiosError } from "axios";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import AppModal from "components/redesign/modal/AppModal";
import { Chain, ChainWallet, DropWeb3, Network, Web3Actions } from "droplinked-web3";
import useAppToast from "functions/hooks/toast/useToast";
import { createAirdropProcedure } from "lib/apis/onchain-inventory/services";
import { appDevelopment } from "lib/utils/app/variable";
import { handleValidateManualTransfer } from "pages/onchain-records/utils/helpers";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import React, { useState } from "react";
import { useMutation } from "react-query";
import TabsList from "../tabs-components/TabsList";
import BulkUpload from "./bulk-upload/BulkUpload";
import ManualTransfer from "./manual-transfer/ManualTransfer";
import TransferModalFooter from "./TransferModalFooter";
import TransferModalHeader from "./TransferModalHeader";

interface Props {
    onClose: () => void;
    isOpen: boolean;
    item: ICombinedNft;
}

export default function TransferModal({ onClose, isOpen, item }: Props) {
    const [manualTransferData, setManualTransferData] = useState([{ receiver: "", amount: 0 }]);
    const [isExecuteLoading, setIsExecuteLoading] = useState(false);
    const { showToast } = useAppToast();

    const { quantity, chain, tokenAddress, tokenId, ownerAddress } = item ?? {};
    const network = appDevelopment ? "TESTNET" : "MAINNET";
    const web3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET);

    const { mutateAsync, isLoading } = useMutation(() =>
        createAirdropProcedure({ chain, network, receivers: manualTransferData, tokenAddress, tokenId }),
        {
            onSuccess: async ({ data }) => {
                try {
                    setIsExecuteLoading(true)
                    const { chain, _id } = data;
                    const provider = web3.web3Instance({
                        method: Web3Actions.AIRDROP,
                        chain: Chain[chain],
                        preferredWallet: ChainWallet.Metamask,
                        userAddress: ownerAddress,
                    })
                    const transfer = await provider.executeAirdrop(_id);
                    console.log(transfer.transactionHashes)
                } catch (error) {
                    console.log(error)
                    setIsExecuteLoading(false)
                    showToast({ message: error.message || "Oops! Something went wrong", type: "error" });
                }
            },
            onError: (err: AxiosError<{ data: { message: string } }>) => {
                showToast({ message: err.response.data.data.message ?? "Oops! Something went wrong.", type: "error" });
                console.log(err)
            },
        });

    const handleSubmit = async () => {
        if (handleValidateManualTransfer({ manualTransferData, quantity: +quantity, showToast })) {
            await mutateAsync();
        }
    };

    const handleCloseModal = () => {
        if (isExecuteLoading) return;
        onClose();
    }

    const tabs = [
        {
            title: "Manual",
            content: <ManualTransfer data={manualTransferData} setData={(values) => setManualTransferData(values)} />,
        },
        {
            title: "Bulk Upload",
            content: <BulkUpload />,
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
                <TransferModalHeader>
                    <ExternalLink fontSize={14} fontWeight={500} mt={2} pb={4}>
                        Download Sample Template
                    </ExternalLink>
                    <TabsList tabs={tabs} />
                </TransferModalHeader>
                <ModalBody py={"16px !important"}>
                    <TabPanels>
                        {tabs.map((tab) => (
                            <TabPanel key={tab.title}>{tab.content}</TabPanel>
                        ))}
                    </TabPanels>
                </ModalBody>
                <Divider borderColor={"#292929"} />
                <TransferModalFooter handleSubmit={handleSubmit} onClose={onClose} isLoading={isLoading || isExecuteLoading} />
            </Tabs>
        </AppModal>
    );
}
