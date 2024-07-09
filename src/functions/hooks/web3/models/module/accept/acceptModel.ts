// import { configStacks } from "lib/utils/blockchain/stacks/_constans"
import { acceptRejectRequestService } from "lib/apis/affiliate/shopServices"

interface IapproveCasper {
    shop: any
    accountAddress: any
}

interface IapproveStack {
    isRequestPending: any
    openContractCall: any
    params: {
        id: string
        publisher: string
    }
}

interface IDeployAccept {
    deployHash: string
    chain: string
    shop: any
    accept: boolean
}

const acceptModel = ({

    approveRequestStack: async ({ isRequestPending, openContractCall, params: { id, publisher } }: IapproveStack) => {
        if (isRequestPending) return
        try {
            return await openContractCall({
                // ...configStacks,
                functionName: 'accept-request',
                // functionArgs: [uintCV(id), principalCV(publisher)],
            })
        } catch (error) {
            throw new Error(error)
        }
    },

    deploy: ({ deployHash, chain, shop, accept }: IDeployAccept) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const record = await acceptRejectRequestService({
                    chain,
                    params: {
                        ...deployHash && { deploy_hash: deployHash },
                        requestID: shop?._id,
                        status: accept ? "ACCEPTED" : "REJECTED"
                    }
                })
                resolve(record)
            } catch (error) {
                reject(error)
            }
        })
    }
})

export default acceptModel