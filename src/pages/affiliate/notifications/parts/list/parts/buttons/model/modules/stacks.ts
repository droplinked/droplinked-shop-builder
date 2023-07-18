import { principalCV, uintCV } from "@stacks/transactions"
import { configStacks } from "lib/utils/blockchain/stacks/_constans"
import { IopenCasperWallet } from "pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel"

interface Iapprove {
    isRequestPending: any
    openContractCall: any
    params: {
        id: number
        publisher: string
    }
}


export default class stacksApprove {

    // Approve request
    static async approve({ isRequestPending, openContractCall, params: { id, publisher } }: Iapprove) {
        if (isRequestPending) return

        try {
            await openContractCall({
                ...configStacks,
                functionName: 'accept-request',
                functionArgs: [uintCV(id), principalCV(publisher)],
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    // Disapprove request
    // static disapprove = async ({ shop }: Iapprove) => {

    // }

}