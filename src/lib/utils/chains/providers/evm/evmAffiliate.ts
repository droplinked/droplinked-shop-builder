import { ethers } from 'ethers';
import { EthAddress, Uint256 } from '../../dto/chainStructs';
import { shopABI } from '../../dto/chainABI';
import { getGasPrice } from '../../dto/chainConstants';
import { RequestAlreadyConfirmed, RequestDoesntExist, RequestNotConfirmed, Unauthorized } from '../../dto/chainErrors';

export let EVMApproveRequest = async function (address: string, requestId: Uint256, shopAddress: EthAddress): Promise<string> {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const contract = new ethers.Contract(shopAddress, shopABI, signer);
    try {
        await contract.callStatic.approveRequest(requestId);
        const gasEstimation = (await contract.estimateGas.approveRequest(requestId)).toBigInt().valueOf();
        const tx = await contract.approveRequest(requestId, {
            gasLimit: gasEstimation * BigInt(105) / BigInt(100),
            gasPrice: getGasPrice(provider)
        })
        return tx.hash;
    } catch (e: any) {
        if (e.code.toString() === "ACTION_REJECTED") {
            throw new Error("Transaction Rejected");
        }
        const err = contract.interface.parseError(e.data);
        if (err.name === "RequestAlreadyConfirmed") {
            throw new RequestAlreadyConfirmed(requestId, shopAddress);
        } else if (err.name === "RequestDoesntExist") {
            throw new RequestDoesntExist(requestId, shopAddress);
        } else if (err.name === "OwnableUnauthorizedAccount") {
            throw new Unauthorized("Approve", address, shopAddress);
        } else {
            throw e;
        }
    }
}

export let EVMDisapproveRequest = async function (address: string, requestId: Uint256, shopAddress: EthAddress) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const contract = new ethers.Contract(shopAddress, shopABI, signer);
    try {
        await contract.callStatic.disapprove(requestId);
        const gasEstimation = (await contract.estimateGas.disapprove(requestId)).toBigInt().valueOf();
        const tx = await contract.disapprove(requestId, {
            gasLimit: gasEstimation * BigInt(105) / BigInt(100),
            gasPrice: getGasPrice(provider)
        });
        return tx.hash;
    } catch (e: any) {
        if (e.code.toString() === "ACTION_REJECTED") {
            throw new Error("Transaction Rejected");
        }
        const err = contract.interface.parseError(e.data);
        if (err.name === "OwnableUnauthorizedAccount") {
            throw new Unauthorized("Disapprove", address, shopAddress);
        } else if (err.name === "RequestDoesntExist") {
            throw new RequestDoesntExist(requestId, shopAddress);
        } else if (err.name === "RequestNotConfirmed") {
            throw new RequestNotConfirmed(requestId, shopAddress);
        }
        throw e;
    }
}