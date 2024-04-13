import { appDevelopment } from "lib/utils/app/variable"

interface IgetLink {
    blockchain: string
    hashkey: string
}

const hashkeyModel = {
    getLink: ({ blockchain, hashkey }: IgetLink) => {
        switch (blockchain) {
            case "CASPER":
                return `https://${appDevelopment ? "testnet." : ""}cspr.live/deploy/${hashkey}`
            case "STACKS":
                return `https://explorer.hiro.so/txid/${hashkey}?chain=${appDevelopment ? "testnet" : "mainnet"}`
            case "POLYGON":
                return `https://${appDevelopment ? "mumbai." : ""}polygonscan.com/tx/${hashkey}`
            case "XRPLSIDECHAIN":
                return `https://evm-sidechain.xrpl.org/tx/${hashkey}`
            case "BINANCE":
                return `https://${appDevelopment ? "testnet." : ""}bscscan.com/tx/${hashkey}`
            case "NEAR":
                return `https://explorer.${appDevelopment ? "testnet" : "mainnet"}.aurora.dev/tx/${hashkey}`;
            case "BASE":
                return `https://base${appDevelopment ? "-goerli" : ""}.blockscout.com/tx/${hashkey}`;
            case "LINEA":
                return `https://${appDevelopment ? "goerli" : ""}.lineascan.build/tx/${hashkey}`
            case "ETH":
                return `https://${appDevelopment ? "sepolia" : ""}.etherscan.io/tx/${hashkey}`
            default:
                return ""
        }
    }
}

export default hashkeyModel