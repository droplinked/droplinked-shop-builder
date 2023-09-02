import { Isku } from 'lib/apis/product/interfaces';
import * as Yup from 'yup';
import { publish_request } from 'lib/utils/blockchain/casper/casper_wallet_publish_request'
import { binancePublishRequest } from 'lib/utils/blockchain/binance/publish'
import { XRPLogin } from 'lib/utils/blockchain/ripple/xrpLogin';
import { IopenCasperWallet } from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/model/modules/casperModel';
import { XRPPublishRequest } from 'lib/utils/blockchain/ripple/xrpPublish';
import { PolygonLogin } from 'lib/utils/blockchain/polygon/metamaskLogin';
import { publish_request_polygon } from 'lib/utils/blockchain/polygon/request';
import { BinanceMetamaskLogin } from 'lib/utils/blockchain/binance/metamaskLogin';

export interface IRequestModelValues {
    quantity: string
}

export interface IPublishRequest {
    sku: Isku
    quantity: number
    casperWallet: IopenCasperWallet
}

interface Irequest {
    blockchain: "POLYGON" | "RIPPLE" | "BINANCE"
    tokenID: string
    recipient: string
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

    requestModel: async ({ blockchain, recipient, tokenID }: Irequest) => {
        let methods = {
            login: null,
            request: null
        }

        switch (blockchain) {
            case 'POLYGON':
                methods = {
                    login: PolygonLogin,
                    request: publish_request_polygon
                }
                break;
            case 'RIPPLE':
                methods = {
                    login: XRPLogin,
                    request: XRPPublishRequest
                }
                break;
            case 'BINANCE':
                methods = {
                    login: BinanceMetamaskLogin,
                    request: binancePublishRequest
                }
                break;

        }

        const login = await methods.login()
        const request = await methods.request(login.address, recipient, tokenID)
        return request
    }
})

export default ModalRequestModel