import { Isku } from 'lib/apis/product/interfaces';
import * as Yup from 'yup';
import { IopenCasperWallet } from "pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel"
import { publish_request } from 'lib/utils/blockchain/casper/casper_wallet_publish_request'

export interface IRequestModelValues {
    quantity: string
}

export interface IPublishRequest {
    sku: Isku
    quantity: number
    casperWallet: IopenCasperWallet
}

export default class ModalRequestModel {
    static formSchema = () => {
        return Yup.object().shape({
            quantity: Yup.string().required('Required'),
        });
    }

    static publish_request = async ({ casperWallet, quantity, sku }: IPublishRequest) => {        
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
    }
}