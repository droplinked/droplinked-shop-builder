import { principalCV, stringAsciiCV, uintCV } from "@stacks/transactions"
import { appDevelopment } from "lib/utils/app/variable"
import { configStacks } from "./_constans"

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
                ...configStacks,
                functionName: 'create',
                functionArgs: [
                    uintCV(amount),
                    uintCV(appDevelopment ? 1 : price),
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