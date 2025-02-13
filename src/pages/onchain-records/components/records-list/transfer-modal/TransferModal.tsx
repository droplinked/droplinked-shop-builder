import { Divider, ModalBody, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import AppModal from "components/redesign/modal/AppModal";
import useAppToast from "functions/hooks/toast/useToast";
import { handleValidateManualTransfer } from "pages/onchain-records/utils/helpers";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import React, { useState } from "react";
import TabsList from "../tabs-components/TabsList";
import BulkUpload from "./bulk-upload/BulkUpload";
import ManualTransfer from "./manual-transfer/ManualTransfer";
import TransferModalFooter from "./TransferModalFooter";
import TransferModalHeader from "./TransferModalHeader";
import { useMutation } from "react-query";
import { createAirdropProcedure } from "lib/apis/onchain-inventory/services";
import { appDevelopment } from "lib/utils/app/variable";
import { Chain, ChainWallet, DropWeb3, Network, Web3Actions } from "droplinked-web3";
import { AxiosError } from "axios";

interface Props {
    onClose: () => void;
    isOpen: boolean;
    item: ICombinedNft;
}

export default function TransferModal({ onClose, isOpen, item }: Props) {
    const [manualTransferData, setManualTransferData] = useState([{ receiver: "", amount: 0 }]);
    const { showToast } = useAppToast();

    const { quantity, chain, tokenAddress, tokenId } = item ?? {};
    const network = appDevelopment ? "TESTNET" : "MAINNET";
    const web3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET);

    const { mutateAsync, isLoading, data } = useMutation(() =>
        createAirdropProcedure({ chain, network, receivers: manualTransferData, tokenAddress, tokenId }),
        {
            onSuccess: ({ data }) => {
                const { chain, network, _id } = data;
                web3.web3Instance({
                    method: Web3Actions.AIRDROP,
                    chain: Chain[chain],
                    preferredWallet: ChainWallet.Metamask,
                    airdropId: _id,
                })
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
            modalRootProps={{ isOpen, onClose, isCentered: true, size: "3xl" }}
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
                <TransferModalFooter handleSubmit={handleSubmit} onClose={onClose} isLoading={isLoading} />
            </Tabs>
        </AppModal>
    );
}
