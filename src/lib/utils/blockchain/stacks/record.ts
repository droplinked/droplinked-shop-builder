import { principalCV, stringAsciiCV, uintCV } from "@stacks/transactions"
import { appDeveloment } from "lib/utils/app/variable"

interface IstacksRecord {
    params: {
        amount: any,
        price: number,
        commission: any,
        uri: string,
        productID: string
        creator: string
    }
    isRequestPending: any
    openContractCall: any
}

export const stacksRecord = ({ isRequestPending, openContractCall, params }: IstacksRecord) => {
    return new Promise<any>(async (res: any, rej: any) => {
        const { amount, commission, creator, price, uri, productID } = params

        try {
            if (isRequestPending) return rej(false)
            const data = await openContractCall({
                contractAddress: appDeveloment ? process.env.REACT_APP_CONTRACT_ADDRESS_STACKS_TESTNET : process.env.REACT_APP_CONTRACT_ADDRESS_STACKS_MAINNET,
                contractName: process.env.REACT_APP_CONTRACT_NAME_STACK,
                functionName: 'create',
                functionArgs: [
                    uintCV(amount),
                    uintCV(appDeveloment ? 1 : price),
                    uintCV(parseInt(commission)),
                    stringAsciiCV(uri),
                    stringAsciiCV(productID),
                    principalCV(creator),
                ],
            })
            if (data) res(data)
            else rej(false)
        } catch (error) {
            rej(error)
        }
    })
}