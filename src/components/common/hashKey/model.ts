import { appDeveloment } from "lib/utils/app/variable"

interface IgetLink {
    blockchain: string
    hashkey: string
}

const hashkeyModel = {
    getLink: ({ blockchain, hashkey }: IgetLink) => {
        switch (blockchain) {
            case "CASPER":
                return `https://${appDeveloment ? "testnet." : ""}cspr.live/deploy/${hashkey}`
            case "STACKS":
                return `https://explorer.hiro.so/txid/${hashkey}?chain=${appDeveloment ? "testnet" : "mainnet"}`
            case "POLYGON":
                return `https://${appDeveloment ? "mumbai." : ""}polygonscan.com/tx/${hashkey}`
            case "RIPPLE":
                return `https://evm-sidechain.xrpl.org/tx/${hashkey}`
            case "BINANCE":
                return `https://${appDeveloment ? "testnet." : ""}bscscan.com/tx/${hashkey}`
            default:
                return ""
        }
    }
}

export default hashkeyModel