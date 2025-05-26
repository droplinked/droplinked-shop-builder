import { useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { Chain, ChainWallet, DropWeb3, Network, Web3Actions } from "droplinked-web3";
import { createAirdropProcedure, processAirdropTransaction, uploadWalletsCSV } from "services/onchain-inventory/services";
import { appDevelopment } from "utils/app/variable";
import useAppToast from "hooks/toast/useToast";
import { handleValidateManualTransfer } from "../utils/helpers";
import { ICombinedNft } from "../utils/interface";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

/**
 * Props interface for useTransfer hook
 * @param item - The NFT item to be transferred
 * @param onSuccess - Callback function to be called after successful transfer
 */
interface UseTransferProps {
    item: ICombinedNft;
    onSuccess: () => void;
}

/**
 * Custom hook to handle NFT transfer operations including manual transfer and bulk upload
 * Manages the transfer process, loading states, and error handling
 */
export const useTransfer = ({ item, onSuccess }: UseTransferProps) => {
    // Loading state for transfer execution
    const [isExecuteLoading, setIsExecuteLoading] = useState(false)
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("onchainRecords")

    // Extract required properties from the NFT item
    const { quantity, chain, tokenAddress, tokenId, ownerAddress } = item ?? {}
    const network = appDevelopment ? "TESTNET" : "MAINNET"
    const web3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET)

    /**
     * Mutation for handling CSV file upload
     * Processes the uploaded file and validates receivers before creating airdrop
     */
    const { mutateAsync: importCSV, isLoading: isImportLoading } = useMutation(
        (file: File) => {
            const formData = new FormData()
            formData.append("file", file)
            return uploadWalletsCSV(formData)
        },
        {
            onSuccess(data) {
                const receivers = data.data.receivers
                const isValid = handleValidateManualTransfer({ manualTransferData: receivers, quantity: +quantity, showToast, t })
                if (isValid) {
                    createAirdrop({ receivers })
                }
            },
            onError(err: AxiosError<{ data: { message: string } }>) {
                showToast({ message: err.response.data.data.message ?? t("default_api_error"), type: "error" })
            },
        }
    )

    /**
     * Mutation for creating and executing airdrop
     * Handles the blockchain interaction for token transfer
     */
    const { mutateAsync: createAirdrop, isLoading: isCreateLoading } = useMutation(
        (variables: { receivers?: Array<{ receiver: string; amount: number }> }) =>
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
                    const { chain, _id } = data
                    const provider = web3.web3Instance({
                        method: Web3Actions.AIRDROP,
                        chain: Chain[chain],
                        preferredWallet: ChainWallet.Metamask,
                        userAddress: ownerAddress,
                    })
                    const transfer = await provider.executeAirdrop(_id)
                    await processAirdropTransaction({ id: _id, transactionHashes: transfer.transactionHashes })
                    showToast({ message: t("airdrop_success"), type: "success" })
                    onSuccess()
                } catch (error) {
                    setIsExecuteLoading(false)
                    showToast({ message: t("default_api_error"), type: "error" })
                }
            },
            onError: (err: AxiosError<{ data: { message: string } }>) => {
                showToast({ message: err.response.data.data.message ?? t("default_api_error"), type: "error" })
            },
        }
    )

    /**
     * Handles both manual transfer and bulk upload scenarios
     * @param manualTransferData - Array of receiver addresses and amounts for manual transfer
     * @param selectedIndex - Selected tab index (0 for manual, 1 for bulk upload)
     * @param file - CSV file for bulk upload
     */
    const handleTransfer = async (manualTransferData: Array<{ receiver: string; amount: number }>, selectedIndex: number, file: File) => {
        if (selectedIndex === 0) {
            const isValid = handleValidateManualTransfer({ manualTransferData, quantity: +quantity, showToast, t })
            if (isValid) {
                const dataToSend = [...manualTransferData]
                const lastItem = dataToSend[dataToSend.length - 1]
                if (lastItem && !lastItem.receiver && (!lastItem.amount || lastItem.amount === 0)) {
                    dataToSend.pop()
                }
                await createAirdrop({ receivers: dataToSend })
            }
        } else {
            await importCSV(file)
        }
    }

    return {
        handleTransfer,
        isLoading: isCreateLoading || isExecuteLoading || isImportLoading,
        isExecuteLoading
    }
}
