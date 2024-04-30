import { ethers } from 'ethers';
import { EthAddress, Uint256 } from '../../dto/chainStructs';
import { shopABI } from '../../dto/chainABI';
import { AlreadyRequested } from '../../dto/chainErrors';

export let EVMPublishRequest = async function (address: string, productId: Uint256, shopAddress: EthAddress) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const contract = new ethers.Contract(shopAddress, shopABI, signer);
    try {
        await contract.callStatic.requestAffiliate(productId, {
            gasLimit: 300 * 1e3
        });
        const tx = await contract.callStatic.requestAffiliate(productId, {
            gasLimit: 300 * 1e3
        });
        const receipt = await tx.wait();
        const logs = receipt.logs.map((log: any) => { try { return contract.interface.parseLog(log); } catch { return null } }).filter((log: any) => log != null);
        const affiliateLog = logs.find((log: any) => log.name === "AffiliateRequested");
        const requestId = affiliateLog.args.requestId;
        const publisher = affiliateLog.args.requester;
        return { transactionHash: tx.hash, requestId: requestId, publisher: publisher };
    } catch (e: any) {
        if (e.code.toString() === "ACTION_REJECTED") {
            throw new Error("Transaction Rejected");
        }
        const err = contract.interface.parseError(e.data);
        if (err.name === "AlreadyRequested") {
            throw new AlreadyRequested(productId, address);
        }
    }
}
