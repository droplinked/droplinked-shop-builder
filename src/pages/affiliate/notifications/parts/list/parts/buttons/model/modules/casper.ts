import RecordCasperModule, { IopenCasperWallet } from "functions/hooks/web3/models/module/record/modules/casperModel"
import { approve_request } from "lib/utils/blockchain/casper/casper_wallet_approve_request"

interface Iapprove {
    shop: any
    casperWallet: IopenCasperWallet
}

const casperApprove = ({

    // Approve request
    approveRequest: async ({ shop }: Iapprove) => {
        const casperWallet = await RecordCasperModule.openCasperWallet()
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