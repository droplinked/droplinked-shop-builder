import { NFTStorage } from "nft.storage";
import { ethers } from 'ethers';
import { getContractABI, getContractAddress } from './evmConstants'
import { Chain, Network } from "../../dto/chains";
import { Beneficiary, ProductType } from "../../dto/chainStructs";
export async function uploadToIPFS(metadata: any, apiKey: string) {
    const client = new NFTStorage({ token: apiKey });
    if (typeof (metadata) == typeof ({}) || typeof (metadata) == typeof ([])) {
        metadata = JSON.stringify(metadata);
    }
    const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    return ipfs_hash;
}
export async function EVMrecordMerch(chain: Chain, network: Network, sku_properties: any, address: string, product_title: string, discription: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, paymentWallet: string, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, apiKey: string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()) {
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(await getContractAddress(chain, network), await getContractABI(chain), signer);
    let metadata = {
        "name": product_title,
        "description": discription,
        "image": image_url,
        "properties": sku_properties
    }
    let ipfs_hash = await uploadToIPFS(metadata, apiKey);
    try {
        let tx = await contract.mint(`https://ipfs.io/ipfs/${ipfs_hash}`, price, commission, amount, address, type, paymentWallet, beneficiaries, acceptsManageWallet, royalty, {
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