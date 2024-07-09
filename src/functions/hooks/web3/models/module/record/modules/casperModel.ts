// import { Isku } from "lib/apis/product/interfaces"
// import { casper_wallet_login, isCapseWalletExtentionInstalled } from "lib/utils/blockchain/casper/casperWallet"
// import { record_merch } from "lib/utils/blockchain/casper/recordMatch"

export interface IRecordCasper {
    product: any
    publicKey: string
    commission: number
    sku: any
    quantity: number
}

export interface IopenCasperWallet {
    account_hash: string
    publicKey: string
    signature: string
}

interface IcasperRecord {
    deploy: any
    deployHash: string | undefined
}

interface Icasper {
    commission: number
    product: any
    sku: any
    quantity: number
    accountAddress: string
}


const RecordCasperModule = ({
    openCasperWallet: (): Promise<IopenCasperWallet> => {
        return new Promise<IopenCasperWallet>(async (resolve, reject) => {
            // if (isCapseWalletExtentionInstalled()) {
            //     try {
            //         await casper_wallet_login(async (account_info: any) => {
            //             resolve({
            //                 account_hash: account_info.account_hash,
            //                 publicKey: account_info.publicKey,
            //                 signature: account_info.signature
            //             })
            //         });
            //     } catch (error) {
            //         reject(error);
            //     }
            // } else {
            //     window.open("https://www.casperwallet.io", "_blank");
            //     reject("Please install casper wallet")
            // }
        })
    },

    casperRecord: async ({ commission, product, publicKey, sku, quantity }: IRecordCasper) => {
        return new Promise<IcasperRecord>(async (resolve, reject) => {
            // try {
            //     const data = {
            //         sku_properties: sku,
            //         account_information: {
            //             publicKey: publicKey,
            //         },
            //         product_title: product.title,
            //         price: sku.price * 100,
            //         amount: product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity,
            //         comission: commission * 100
            //     }

            //     const record = await record_merch(
            //         data.sku_properties,
            //         data.account_information,
            //         data.product_title,
            //         data.price,
            //         data.amount,
            //         data.comission)

            //     resolve(record)
            // } catch (error) {
            //     reject(error)
            // }
        })
    },

    casper: async ({ commission, product, sku, quantity, accountAddress }: Icasper) => {
        // const { casperRecord } = RecordCasperModule
        // const record = await casperRecord({
        //     commission,
        //     product,
        //     sku,
        //     publicKey: accountAddress,
        //     quantity
        // })
        // if (!record.deployHash) throw Error("Desploy hash empty");

        // return record.deployHash
    },
})

export default RecordCasperModule