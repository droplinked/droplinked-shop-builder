import { principalCV, uintCV } from "@stacks/transactions"
import { configStacks } from "lib/utils/blockchain/stacks/_constans"
import { IopenCasperWallet } from "pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel"

interface Iapprove {
    isRequestPending: any
    openContractCall: any
    params: {
        id: string
        publisher: string
    }
}


const stacksApprove = ({

    // Approve request
    approve: async ({ isRequestPending, openContractCall, params: { id, publisher } }: Iapprove) => {
        if (isRequestPending) return

        try {
            return await openContractCall({
                ...configStacks,
                functionName: 'accept-request',
                functionArgs: [uintCV(id), principalCV(publisher)],
            })
        } catch (error) {
            throw new Error(error)
        }
    }

})

export default stacksApprove