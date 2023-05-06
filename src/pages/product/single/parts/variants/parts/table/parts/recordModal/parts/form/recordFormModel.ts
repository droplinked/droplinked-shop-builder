import { Isku } from "lib/apis/product/interfaces"
import { casper_wallet_login, isCapseWalletExtentionInstalled } from "lib/utils/blockchain/casper/casperWallet"
import { record_merch } from "lib/utils/blockchain/casper/recordMatch"

export interface IRecordCasper {
    sku: Isku
    publicKey: string
    product_title: string
    price: number
    amount: number
    comission: number
}

interface IopenCasperWallet {
    account_hash: string
    publicKey: string
    signature: string
}

interface IcasperRecord {
    deploy: any
    deployHash: string | undefined
}

export default class RecordModalModule {
    static openCasperWallet = (): Promise<IopenCasperWallet> => {
        return new Promise<IopenCasperWallet>((resolve, reject) => {
            if (isCapseWalletExtentionInstalled()) {
                casper_wallet_login(async (account_info) => {
                    resolve({
                        account_hash: account_info.account_hash,
                        publicKey: account_info.publicKey,
                        signature: account_info.signature
                    })
                });
            } else {
                window.open("https://www.casperwallet.io", "_blank");
                reject("Please install casper wallet")
            }
        })
    };

    static casperRecord = async ({ amount, comission, price, product_title, publicKey, sku }: IRecordCasper) => {
        return new Promise<IcasperRecord>(async (resolve, reject) => {
            try {
                const data = {
                    sku_properties: sku,
                    account_information: {
                        publicKey: publicKey,
                    },
                    product_title: product_title,
                    price: price * 100,
                    amount: amount * 100,
                    comission: comission * 100
                }

                console.log(data);
                

                const record = await record_merch(
                    data.sku_properties,
                    data.account_information,
                    data.product_title,
                    data.price,
                    data.amount,
                    data.comission)

                resolve(record)
            } catch (error) {
                reject(error)
            }
        })
    }
}