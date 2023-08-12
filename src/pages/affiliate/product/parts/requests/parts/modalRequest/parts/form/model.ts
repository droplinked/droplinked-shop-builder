import { Isku } from 'lib/apis/product/interfaces';
import * as Yup from 'yup';
import { publish_request } from 'lib/utils/blockchain/casper/casper_wallet_publish_request'
import { XRPLogin } from 'lib/utils/blockchain/ripple/xrpLogin';
import { IopenCasperWallet } from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/model/modules/casperModel';

export interface IRequestModelValues {
    quantity: string
}

export interface IPublishRequest {
    sku: Isku
    quantity: number
    casperWallet: IopenCasperWallet
}

const ModalRequestModel = ({
    formSchema: () => {
        return Yup.object().shape({
            quantity: Yup.string().required('Required'),
        });
    },

    publish_request: async ({ casperWallet, quantity, sku }: IPublishRequest) => {
        const data = {
            holder_id: parseInt(sku?.recordData?.data?.details?.holder_id),
            amount: quantity,
            producer_public_key: sku?.recordData?.data?.details?.recipient,
            account_info: {
                publicKey: casperWallet.publicKey,
                account_hash: casperWallet.account_hash,
                signature: casperWallet.signature
            },
        }

        return await publish_request(data.holder_id, data.amount, data.producer_public_key, data.account_info)
    },

    rippleRequest: async () => {
        const login = await XRPLogin()
        // const request = await XRPPublishRequest(login.address, )

        // return request
    }
})

export default ModalRequestModel