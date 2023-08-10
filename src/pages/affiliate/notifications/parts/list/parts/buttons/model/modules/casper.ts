import { approve_request } from "lib/utils/blockchain/casper/casper_wallet_approve_request"
import { disapprove_request } from "lib/utils/blockchain/casper/casper_wallet_disapprove_request"
import RecordModalModule, { IopenCasperWallet } from "pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/model/recordFormModel"

interface Iapprove {
    shop: any
    casperWallet: IopenCasperWallet
}

const casperApprove = ({

    // Approve request
    approveRequest: async ({ shop }: Iapprove) => {
        const casperWallet = await RecordModalModule.openCasperWallet()
        const { request_id, account_info } = {
            request_id: shop?.recordData?.details?.request_id,
            account_info: {
                publicKey: casperWallet.publicKey,
                account_hash: casperWallet.account_hash,
                signature: casperWallet.signature
            }
        }


        return await approve_request(request_id, account_info)
    }

})

export default casperApprove