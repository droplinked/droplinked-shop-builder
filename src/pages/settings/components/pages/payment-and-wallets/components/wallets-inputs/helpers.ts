import { ISettings } from "pages/settings/formConfigs";

export const getDescription = (isSolana?: boolean) => isSolana
    ? "Connect a Solana-based wallet in order to accept Solana based digital assets. You can define percentage payouts across multiple wallet addresses."
    : "Connect one or multiple EVM-based wallets to accept Ethereum based digital assets. You can define percentage payouts across multiple wallet addresses.";

export const getWalletsData = (values: ISettings, walletType: string) => values.paymentWallets?.find(wallet => wallet.type === walletType) || {
    type: walletType,
    destinationAddress: [{ destinationAddress: "", percent: 100 }]
};