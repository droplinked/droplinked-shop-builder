import { principalCV, uintCV } from "@stacks/transactions"
import { appDeveloment } from "lib/utils/app/variable"
import { configStacks } from "./_constans"

interface IProps {
    isRequestPending: any
    openContractCall: any
    params: {
        id: number,
        amount: number,
        commission: number,
        publisher: string
    }
}
const stacksRequest = async ({ isRequestPending, params, openContractCall }: IProps) => {
    return new Promise<any>(async (res: any, rej: any) => {
        const { amount, commission, id, publisher } = params
        if (isRequestPending) return rej(false)

        try {
            const data = await openContractCall({
                ...configStacks,
                functionName: 'create-request',
                functionArgs: [
                    uintCV(id),
                    uintCV(amount),
                    uintCV(commission),
                    principalCV(publisher),
                ],
            })
            res(data)
        } catch (error) {
            rej(error)
        }
    })
}

export default stacksRequest