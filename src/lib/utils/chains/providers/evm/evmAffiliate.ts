import { ethers } from 'ethers';
import { getContractABI, getContractAddress } from './evmConstants'
import { Chain, Network } from '../../Chains';

export let EVMApproveRequest = async function (chain: Chain, network: Network, address: string, request_id: number): Promise<string> {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()) {
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(await getContractAddress(chain, network), await getContractABI(chain), signer);
    try {
        let tx = await contract.approve_request(request_id, {
            gasLimit: 3000000
        });
        return tx.hash;
    } catch (e: any) {
        if (e.code.toString() == "ACTION_REJECTED") {
            throw "Transaction Rejected";
        }
        throw e;
    }
}

export let EVMCancelRequest = async function (chain: Chain, network: Network, address: string, request_id: number | string): Promise<string> {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()) {
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(await getContractAddress(chain, network), await getContractABI(chain), signer);
    try {
        let tx = await contract.cancel_request(request_id, {
            gasLimit: 3000000
        });
        return tx.hash;
    } catch (e: any) {
        if (e.code.toString() == "ACTION_REJECTED") {
            throw "Transaction Rejected";
        }
        throw e;
    }
}

export let EVMDisapproveRequest = async function (chain: Chain, network: Network, address: string, request_id: number | string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()) {
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(await getContractAddress(chain, network), await getContractABI(chain), signer);
    try {
        let tx = await contract.disapprove(request_id, {
            gasLimit: 3000000
        });
        return tx.hash;
    } catch (e: any) {
        if (e.code.toString() == "ACTION_REJECTED") {
            throw "Transaction Rejected";
        }
        throw e;
    }
}