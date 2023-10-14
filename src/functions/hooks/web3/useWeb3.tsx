import { appDeveloment } from 'lib/utils/app/variable'
import { getNetworkProvider } from 'lib/utils/chains/chainProvider'
import { Chain, Network } from 'lib/utils/chains/Chains'
import React from 'react'
import useStack from '../stack/useStack'
import web3Model, { IRecordPrams, IRequestData } from './models'
import RecordCasperModule from './models/module/record/modules/casperModel'

// method: "record" | "request" | "accept"
export type IWeb3 = {
    method: "record"
    params: IRecordPrams
    chain: string
} | {
    method: "request"
    params: IRequestData
    chain: string
}

function useAppWeb3() {
    const { record, request } = web3Model
    const stack = useStack()

    const _login = async (chain: string) => {
        if (chain == "CASPER") {
            return await RecordCasperModule.openCasperWallet()
        } else if (chain == "STACKS") {
            await stack.login()
        } else {
            console.log("asdasdasdsadas", chain);
            
            return await (await getNetworkProvider(Chain[chain], Network[appDeveloment ? "TESTNET" : "MAINNET"], null).walletLogin()).address
        }
    }

    const web3 = ({ method, params, chain }: IWeb3) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                console.log("params", params, chain);
                const accountAddress = await _login(chain)
                console.log(accountAddress);

                if (method === "record") {
                    const records = await record({ params, accountAddress })
                    resolve(records)
                } else if (method === "request") {

                    const requests = await request({ params, accountAddress })
                    resolve(requests)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    return { web3 }
}

export default useAppWeb3