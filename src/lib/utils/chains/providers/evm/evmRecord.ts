import { NFTStorage } from "nft.storage";
import { ethers } from 'ethers';
import { Chain, Network } from "../../dto/chains";
import { Beneficiary, EthAddress, NFTType, PaymentMethodType, ProductType } from "../../dto/chainStructs";
import { shopABI } from "../../dto/chainABI";
export async function uploadToIPFS(metadata: any, apiKey: string) {
    const client = new NFTStorage({ token: apiKey });
    if (typeof (metadata) == typeof ({}) || typeof (metadata) == typeof ([])) {
        metadata = JSON.stringify(metadata);
    }
    const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    return ipfs_hash;
}
export async function EVMrecordMerch(chain: Chain, network: Network, sku_properties: any, address: string, product_title: string, discription: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, nftContract: EthAddress, shopAddress: EthAddress, apiKey: string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()) {
        throw "Address does not match signer address";
    }
    const currencyAddress = "0x0000000000000000000000000000000000000000";
    const contract = new ethers.Contract(shopAddress, shopABI, signer);
    let metadata = {
        "name": product_title,
        "description": discription,
        "image": image_url,
        "properties": sku_properties
    }
    let ipfsHash = await uploadToIPFS(metadata, apiKey);
    try {
        let tx = await contract.mintAndRegister(nftContract, `https://ipfs.io/ipfs/${ipfsHash}`, amount, acceptsManageWallet, commission, price, currencyAddress, royalty, NFTType.ERC1155, type, PaymentMethodType.USD, beneficiaries);
        let receipt = await tx.wait();
        const logs = receipt.logs.map((log: any) => { try { return contract.interface.parseLog(log) } catch { return null } }).filter((log: any) => log != null);
        const productIdLog = logs.find((log: any) => log.name === "ProductRegistered");
        const productId = productIdLog.args.productId.toString();
        const amountRecorded = productIdLog.args.amount.toString();
        return { transactionHash: tx.hash, productId, amountRecorded };
    } catch (e: any) {
        if (e.code.toString() == "ACTION_REJECTED") {
            throw "Transaction Rejected";
        }
        throw e;
    }
}