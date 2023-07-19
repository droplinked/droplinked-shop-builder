import { approve_request } from "lib/utils/blockchain/casper/casper_wallet_approve_request"
import { disapprove_request } from "lib/utils/blockchain/casper/casper_wallet_disapprove_request"
import RecordModalModule, { IopenCasperWallet } from "pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel"

interface Iapprove {
    shop: any
    casperWallet: IopenCasperWallet
}

export default class casperApprove {

    // Approve request
    static approveRequest = async ({ shop }: Iapprove) => {
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

    // Disapprove request
    static disapproveRequest = async ({ shop }: Iapprove) => {
        const casperWallet = await RecordModalModule.openCasperWallet()
        const { approved_id, account_info, amount, publisher_account_hash } = {
            approved_id: shop?.casperData?.details?.approved_id,
            amount: parseFloat(shop?.casperData?.details?.amount),
            publisher_account_hash: shop?.casperData?.details?.publisher,
            account_info: {
                publicKey: casperWallet.publicKey,
                account_hash: casperWallet.account_hash,
                signature: casperWallet.signature
            }
        }
     

        return await disapprove_request(approved_id, amount, publisher_account_hash, account_info)
    }

}