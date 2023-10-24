import useAppStore, { IUserProps } from 'lib/stores/app/appStore'
import { appDeveloment } from 'lib/utils/app/variable'
import { getNetworkProvider } from 'lib/utils/chains/chainProvider'
import { Chain, Network } from 'lib/utils/chains/Chains'
import React, { useCallback } from 'react'
import { useStore } from 'zustand'
import useStack from '../stack/useStack'
import useHookStore from '../store/useHookStore'
import web3Model, { IAcceptData, IRecordPrams, IRequestData } from './models'
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
} | {
    method: "accept"
    params: IAcceptData
    chain: string
}

function useAppWeb3() {
    const { record, request, accept } = web3Model
    const { app: { user, updateState } } = useHookStore()
    const stack = useStack()

    // const updateWallet = useCallback((values: IUserProps) => {
    //     updateState({ key: "user", params: { ...user, wallets: [...user?.wallets || [], values] } })
    // }, [user])

    const _login = (chain: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const findAccountAddress = user?.wallets ? user.wallets.find(el => el.type === chain && el?.address) : null
                if (findAccountAddress) {
                    resolve(findAccountAddress.address)
                } else if (chain == "STACKS") {
                    const address: any = await stack.login()
                    resolve(address)
                    // updateWallet({ type: "STACKS", address })
                } else {
                    const provider = await (await getNetworkProvider(Chain[chain], Network[appDeveloment ? "TESTNET" : "MAINNET"], null).walletLogin(null))
                    const address = provider[chain === "CASPER" ? "publicKey" : "address"]
                    resolve(address)
                    // updateWallet({ type: chain, address })
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    const web3 = useCallback(({ method, params, chain }: IWeb3) => {
        {
            return new Promise<any>(async (resolve, reject) => {
                try {
                    const accountAddress = await _login(chain)

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

    return { web3 }
}

export default useAppWeb3