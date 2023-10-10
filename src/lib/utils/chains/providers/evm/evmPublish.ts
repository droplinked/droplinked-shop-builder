import { ethers } from 'ethers';
import { getContractABI, getContractAddress } from './evmConstants'
import { Chain, Network } from '../../Chains';

export let EVMPublishRequest = async function (chain: Chain, network: Network, address: string, producer_account_address: string, token_id: number | string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()) {
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(await getContractAddress(chain, network), await getContractABI(chain), signer);
    try {
        let tx = await contract.publish_request(producer_account_address, token_id);
        return tx.hash;
    } catch (e: any) {
        if (e.code.toString() == "ACTION_REJECTED") {
            throw "Transaction Rejected";
        }
        throw e;
    }
}
