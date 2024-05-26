import { IUserWalletsProps } from 'lib/stores/app/appStore'
import { appDevelopment } from 'lib/utils/app/variable'
import { getNetworkProvider } from 'lib/utils/chains/chainProvider'
import { Chain, Network } from 'lib/utils/chains/dto/chains'
import useHookStore from '../store/useHookStore'
import web3Model, { IAcceptData, IRecordPrams, IRequestData } from './models'

// method: "record" | "request" | "accept"
export type IWeb3 = {
    method: "record"
    params: IRecordPrams
    chain: string
    stack: any
    wallets: Array<IUserWalletsProps>
} | {
    method: "request"
    params: IRequestData
    chain: string
    stack: any
    wallets: Array<IUserWalletsProps>
} | {
    method: "accept"
    params: IAcceptData
    chain: string
    stack: any
    wallets: Array<IUserWalletsProps>
}

interface IGetChain {
    chain: string
    wallets: Array<IUserWalletsProps>
}

interface ILogin {
    chain: string
    wallets: Array<IUserWalletsProps>
    stack: any
}

const useAppWeb3 = () => {
    const { record, request, accept } = web3Model
    const { app: { updateWallet } } = useHookStore()

    const getChain = ({ chain, wallets }: IGetChain) => wallets ? wallets.find(el => el.type === chain && el?.address) : null

    const login = ({ chain, wallets, stack }: ILogin) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                // userUpdateService({ wallets: null })
                const chainAccount = getChain({ chain, wallets })

                if (chainAccount?.address) {
                    resolve(chainAccount[chain === "CASPER" ? "public_key" : "address"])
                } else if (chain === "STACKS") {
                    const address: any = await stack.login()
                    resolve(address)
                    updateWallet({ type: "STACKS", address: stack.stxAddress })
                } else {
                    const provider = await (await getNetworkProvider(Chain[chain], Network[appDevelopment ? "TESTNET" : "MAINNET"], null).walletLogin())

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
    }

    const web3 = ({ method, params, chain, wallets, stack }: IWeb3) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const accountAddress = await login({ chain, wallets, stack })
                // const shop = JSON.parse(localStorage.getItem('appStore')).state.shop;
                // console.log(shop);

                if (method === "record") {
                    const records = await record({ params, accountAddress, stack })
                    resolve(records)
                } else if (method === "request") {
                    const requests = await request({ params, accountAddress, stack })
                    resolve(requests)
                } else if (method === "accept") {
                    const requests = await accept({ params, accountAddress, stack })
                    resolve(requests)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    return { web3, login, getChain }
}

export default useAppWeb3