import { Divider, ModalBody, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { AxiosError } from "axios";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import AppModal from "components/redesign/modal/AppModal";
import { Chain, ChainWallet, DropWeb3, Network, Web3Actions } from "droplinked-web3";
import useAppToast from "functions/hooks/toast/useToast";
import { createAirdropProcedure, processAirdropTransaction, uploadWalletsCSV } from "lib/apis/onchain-inventory/services";
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
import { useOnchainRecords } from "pages/onchain-records/context/OnchainRecordsContext";
import SampleFile from "./sample/Template.csv"

interface Props {
    onClose: () => void;
    isOpen: boolean;
    item: ICombinedNft;
}

export default function TransferModal({ onClose, isOpen, item }: Props) {
    const [manualTransferData, setManualTransferData] = useState([{ receiver: "", amount: 0 }]);
    const [file, setFile] = useState<File>(null)
    const [isExecuteLoading, setIsExecuteLoading] = useState(false);
    const { showToast } = useAppToast();
    const { refetch } = useOnchainRecords();

    const { quantity, chain, tokenAddress, tokenId, ownerAddress } = item ?? {};
    const network = appDevelopment ? "TESTNET" : "MAINNET";
    const web3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET);

    const { mutateAsync: importCSV, isLoading: isImportLoading } = useMutation(() => {
        const formData = new FormData();
        formData.append("file", file);
        return uploadWalletsCSV(formData);
    },
        {
            onSuccess(data) {
                const receivers = data.data.receivers;
                const isValid = handleValidateManualTransfer({ manualTransferData: receivers, quantity: +quantity, showToast });
                if (isValid) {
                    createAirdrop({ receivers });
                }
            },
            onError(err: AxiosError<{ data: { message: string } }>) {
                showToast({ message: err.response.data.data.message ?? "Oops! Something went wrong.", type: "error" });
            },
        }
    );

    const { mutateAsync: createAirdrop, isLoading: isCreateLoading } = useMutation(
        (variables: { receivers?: typeof manualTransferData }) =>
            createAirdropProcedure({
                chain,
                network,
                receivers: variables.receivers,
                tokenAddress,
                tokenId
            }),
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
                    await processAirdropTransaction({ id: _id, transactionHashes: transfer.transactionHashes });
                    showToast({ message: "Airdrop successfully processed", type: "success" });
                    refetch(); // Call refetch after successful transfer
                    onClose();
                } catch (error) {
                    setIsExecuteLoading(false)
                    showToast({ message: "Oops! Something went wrong", type: "error" });
                }
            },
            onError: (err: AxiosError<{ data: { message: string } }>) => {
                showToast({ message: err.response.data.data.message ?? "Oops! Something went wrong.", type: "error" });
            },
        });

    const handleSubmit = async (selectedIndex: number) => {
        //if we selected manual transfer
        if (selectedIndex === 0) {
            const isValid = handleValidateManualTransfer({ manualTransferData, quantity: +quantity, showToast })
            if (isValid) {
                // Filter out the last item if it's empty
                const dataToSend = [...manualTransferData];
                const lastItem = dataToSend[dataToSend.length - 1];
                if (lastItem && !lastItem.receiver && (!lastItem.amount || lastItem.amount === 0)) {
                    dataToSend.pop();
                }
                await createAirdrop({ receivers: dataToSend });
            }
        }
        //if we selected bulk upload
        else {
            await importCSV();
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
                <TransferModalHeader>
                    <ExternalLink href={SampleFile}
                        width={"max-content"}
                        fontSize={14}
                        fontWeight={500}
                        mt={2}
                        pb={4}
                    >
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
                <TransferModalFooter
                    handleSubmit={handleSubmit}
                    onClose={onClose}
                    isLoading={isCreateLoading || isExecuteLoading || isImportLoading}
                />
            </Tabs>
        </AppModal>
    );
}
