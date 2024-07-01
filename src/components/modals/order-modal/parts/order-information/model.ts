import { appDevelopment } from "lib/utils/app/variable";

namespace OrderInformationModel {
    enum ORDER_STATUS_ENUM {
        PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
        WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
        WAITING_FOR_CONFIRMATION = "WAITING_FOR_CONFIRMATION",
        INITIALIZED_FOR_PAYMENT = "INITIALIZED_FOR_PAYMENT",
        PROCESSING = "PROCESSING",
        SENT = "SENT",
        CANCELED = "CANCELED",
        CANCELED_PAYMENT_TIMEOUT = "CANCELED_PAYMENT_TIMEOUT",
        REFUNDED = "REFUNDED",
        IN_CART = "IN_CART",
    }

    export const getOrderStatusColor = (status: string) => {
        let result
        switch (status) {
            case ORDER_STATUS_ENUM.PAYMENT_CONFIRMED:
                result = "#2BCFA1"
                break;
            case ORDER_STATUS_ENUM.PROCESSING:
            case ORDER_STATUS_ENUM.SENT:
                result = "#fff"
                break;
            case ORDER_STATUS_ENUM.WAITING_FOR_PAYMENT:
            case ORDER_STATUS_ENUM.WAITING_FOR_CONFIRMATION:
            case ORDER_STATUS_ENUM.INITIALIZED_FOR_PAYMENT:
            case ORDER_STATUS_ENUM.CANCELED:
            case ORDER_STATUS_ENUM.CANCELED_PAYMENT_TIMEOUT:
            case ORDER_STATUS_ENUM.REFUNDED:
            case ORDER_STATUS_ENUM.IN_CART:
                result = "#FF665C"
                break
            default: result = "#fff"
        }
        return result
    }

    export const getTransactionLink = (order: any) => {
        const { orderInformation, details } = order
        const { transactionId } = orderInformation
        switch (details.paidWith) {
            case "CASPER":
                return `https://${appDevelopment ? "testnet." : ""}cspr.live/deploy/${transactionId}`
            case "STACKS":
                return `https://explorer.hiro.so/txid/${transactionId}?chain=${appDevelopment ? "testnet" : "mainnet"}`
            case "POLYGON":
                return `https://${appDevelopment ? "mumbai." : ""}polygonscan.com/tx/${transactionId}`
            case "XRPLSIDECHAIN":
                return `https://evm-sidechain.xrpl.org/tx/${transactionId}`
            case "BINANCE":
                return `https://${appDevelopment ? "testnet." : ""}bscscan.com/tx/${transactionId}`
            case "NEAR":
                return `https://explorer.${appDevelopment ? "testnet" : "mainnet"}.aurora.dev/tx/${transactionId}`;
            case "BASE":
                return `https://base${appDevelopment ? "-goerli." : ""}blockscout.com/tx/${transactionId}`;
            case "LINEA":
                return `https://${appDevelopment ? "goerli." : ""}lineascan.build/tx/${transactionId}`
            case "ETH":
                return `https://${appDevelopment ? "sepolia." : ""}etherscan.io/tx/${transactionId}`
            default:
                return ""
        }
    }
}

export default OrderInformationModel