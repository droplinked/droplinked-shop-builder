import { appDeveloment } from "lib/utils/app/variable"

namespace OrderDetailsModel {
    export const getTransactionLink = (order: any) => {
        const { transactionId, details } = order
        switch (details.paidWith) {
            case "CASPER":
                return `https://${appDeveloment ? "testnet." : ""}cspr.live/deploy/${transactionId}`
            case "STACKS":
                return `https://explorer.hiro.so/txid/${transactionId}?chain=${appDeveloment ? "testnet" : "mainnet"}`
            case "POLYGON":
                return `https://${appDeveloment ? "mumbai." : ""}polygonscan.com/tx/${transactionId}`
            case "XRPLSIDECHAIN":
                return `https://evm-sidechain.xrpl.org/tx/${transactionId}`
            case "BINANCE":
                return `https://${appDeveloment ? "testnet." : ""}bscscan.com/tx/${transactionId}`
            case "NEAR":
                return `https://explorer.${appDeveloment ? "testnet" : "mainnet"}.aurora.dev/tx/${transactionId}`;
            case "BASE":
                return `https://base${appDeveloment ? "-goerli" : ""}.blockscout.com/tx/${transactionId}`;
            case "LINEA":
                return `https://${appDeveloment ? "goerli" : ""}.lineascan.build/tx/${transactionId}`
            case "ETH":
                return `https://${appDeveloment? "sepolia": ""}.etherscan.io/tx/${transactionId}`
            default:
                return ""
        }
    }
}

export default OrderDetailsModel