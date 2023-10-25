import { appDeveloment } from 'lib/utils/app/variable'
import { getNetworkProvider } from 'lib/utils/chains/chainProvider'
import { Chain, Network } from 'lib/utils/chains/Chains'
import React, { useCallback } from 'react'
import useStack from '../stack/useStack'
import useHookStore from '../store/useHookStore'
import web3Model, { IAcceptData, IRecordPrams, IRequestData } from './models'

// method: "record" | "request" | "accept"
export type IWeb3 = {
    method: "record"
    params: IRecordPrams
    chain: string
} | {
    method: "request"
    params: IRequestData
    chain: string
} | {
    method: "accept"
    params: IAcceptData
    chain: string
}

function useAppWeb3() {
    const { record, request, accept } = web3Model
    const { app: { user, updateWallet } } = useHookStore()
    const stack = useStack()

    const getChain = (chain: string) => user?.wallets ? user.wallets.find(el => el.type === chain && el?.address) : null

    const login = useCallback((chain: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const chainAccount = getChain(chain)
                if (chainAccount) {
                    resolve(chainAccount[chain === "CASPER" ? "public_key" : "address"])
                } else if (chain == "STACKS") {
                    const address: any = await stack.login()
                    resolve(address)
                    updateWallet({ type: "STACKS", address })
                } else {
                    const provider = await (await getNetworkProvider(Chain[chain], Network[appDeveloment ? "TESTNET" : "MAINNET"], null).walletLogin(null))

                    if (chain === "CASPER") {
                        resolve(provider.publicKey)
                        updateWallet({ type: chain, address: provider.account_hash, public_key: provider.publicKey })
                    } else {
                        resolve(provider.address)
                        updateWallet({ type: chain, address: provider.address })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    }, [])

    const web3 = useCallback(({ method, params, chain }: IWeb3) => {
        {
            return new Promise<any>(async (resolve, reject) => {
                try {
                    const accountAddress = await login(chain)

                    if (method === "record") {
                        const records = await record({ params, accountAddress })
                        resolve(records)
                    } else if (method === "request") {
                        const requests = await request({ params, accountAddress })
                        resolve(requests)
                    } else if (method === "accept") {
                        const requests = await accept({ params, accountAddress })
                        resolve(requests)
                    }
                } catch (error) {
                    reject(error);
                }
            })
        }
    }, [user])

    return { web3, login, getChain }
}

export default useAppWeb3