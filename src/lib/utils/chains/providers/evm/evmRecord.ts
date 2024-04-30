import { NFTStorage } from "nft.storage";
import { ethers } from 'ethers';
import { Chain, Network } from "../../dto/chains";
import { Beneficiary, EthAddress, NFTType, PaymentMethodType, ProductType } from "../../dto/chainStructs";
import { shopABI } from "../../dto/chainABI";
import { Unauthorized } from "../../dto/chainErrors";
import { getGasPrice } from "../../dto/chainConstants";
export async function uploadToIPFS(metadata: any, apiKey: string) {
    const client = new NFTStorage({ token: apiKey });
    if (typeof (metadata) == typeof ({}) || typeof (metadata) == typeof ([])) {
        metadata = JSON.stringify(metadata);
    }
    const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    return ipfs_hash;
}
export async function EVMrecordMerch(chain: Chain, network: Network, sku_properties: any, address: string, product_title: string, description: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, nftContract: EthAddress, shopAddress: EthAddress, currencyAddress: EthAddress, apiKey: string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const contract = new ethers.Contract(shopAddress, shopABI, signer);
    let metadata = {
        "name": product_title,
        "description": description,
        "image": image_url,
        "properties": sku_properties
    }
    let ipfsHash = await uploadToIPFS(metadata, apiKey);
    try {
        await contract.callStatic.mintAndRegister(nftContract, `https://ipfs.io/ipfs/${ipfsHash}`, amount, acceptsManageWallet, commission, price, currencyAddress, royalty, NFTType.ERC1155, type, PaymentMethodType.USD, beneficiaries);
        const gasEstimation = (await contract.estimateGas.mintAndRegister(nftContract, `https://ipfs.io/ipfs/${ipfsHash}`, amount, acceptsManageWallet, commission, price, currencyAddress, royalty, NFTType.ERC1155, type, PaymentMethodType.USD, beneficiaries)).toBigInt();
        const gasPrice = ((await getGasPrice(provider)).valueOf());
        const tx = await contract.mintAndRegister(nftContract, `https://ipfs.io/ipfs/${ipfsHash}`, amount, acceptsManageWallet, commission, price, currencyAddress, royalty, NFTType.ERC1155, type, PaymentMethodType.USD, beneficiaries, {
            gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
            gasPrice: gasPrice
        });
        let receipt = await tx.wait();
        const logs = receipt.logs.map((log: any) => { try { return contract.interface.parseLog(log) } catch { return null } }).filter((log: any) => log != null);
        const productIdLog = logs.find((log: any) => log.name === "ProductRegistered");
        const productId = productIdLog.args.productId.toString();
        const amountRecorded = productIdLog.args.amount.toString();
        return { transactionHash: tx.hash, productId, amountRecorded };
    } catch (e: any) {
        if (e.code.toString() === "ACTION_REJECTED") {
            throw new Error("Transaction Rejected");
        }
        const err = contract.interface.parseError(e.data);
        if (err.name === "OwnableUnauthorizedAccount") {
            throw new Unauthorized("record", address, shopAddress);
        }
        throw e;
    }
}