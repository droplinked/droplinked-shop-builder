import { NFTStorage } from "nft.storage";
import { ethers } from 'ethers';
import { Beneficiary, EthAddress, NFTType, PaymentMethodType, ProductType } from "../../dto/chainStructs";
import { shopABI } from "../../dto/chainABI";
import { Unauthorized } from "../../dto/chainErrors";
import { getGasPrice } from "../../dto/chainConstants";
import { ModalInterface } from "../../dto/modalInterface";
import { Chain } from "../../dto/chains";
export async function uploadToIPFS(metadata: any, apiKey: string) {
    // const client = new NFTStorage({ token: apiKey });
    // if (typeof (metadata) == typeof ({}) || typeof (metadata) == typeof ([])) {
    //     metadata = JSON.stringify(metadata);
    // }
    // const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    // return ipfs_hash;
    return "";
}
export async function EVMrecordMerch(provider: any, chain: Chain,sku_properties: any, address: string, product_title: string, description: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, nftContract: EthAddress, shopAddress: EthAddress, currencyAddress: EthAddress, apiKey: string, modalInterface: ModalInterface) {
    const signer = provider.getSigner();
    console.log(address)

    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const contract = new ethers.Contract(shopAddress, shopABI, signer);
    modalInterface.waiting("Minting...");
    let metadata = {
        "name": product_title,
        "description": description,
        "image": image_url,
        "properties": sku_properties
    }
    
    let ipfsHash = await uploadToIPFS(metadata, apiKey);
    try {
        if (chain !== Chain.REDBELLY){
            type Product = {
                _nftAddress: string,
                _uri: string,
                _amount: number,
                _accepted: boolean,
                _affiliatePercentage: number,
                _price: number,
                _currencyAddress: string,
                _royalty: number,
                _nftType: NFTType,
                _productType: ProductType,
                _paymentType: PaymentMethodType,
                _beneficiaries: Beneficiary[],
                _receiveUSDC: boolean  
            };
            const recordData: Product = {
                _nftAddress: nftContract,
                _uri: `https://ipfs.io/ipfs/${ipfsHash}`,
                _amount: amount,
                _accepted: acceptsManageWallet,
                _affiliatePercentage: commission,
                _price: price,
                _currencyAddress: currencyAddress,
                _royalty: royalty,
                _nftType: NFTType.ERC1155,
                _productType: type,
                _paymentType: PaymentMethodType.USD,
                _beneficiaries: beneficiaries,
                _receiveUSDC: false
            }
            await contract.callStatic.mintAndRegister(recordData);
            modalInterface.waiting("callStatic");
            const gasEstimation = (await contract.estimateGas.mintAndRegister(recordData)).toBigInt();
            modalInterface.waiting("gasEstimation");
            const gasPrice = ((await getGasPrice(provider)).valueOf());
            modalInterface.waiting("Minting the NFT...");
            const tx = await contract.mintAndRegister(recordData, {
                gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
                gasPrice: gasPrice
            });
            modalInterface.waiting("Waiting for confirmation...");
            let receipt = await tx.wait();
            const logs = receipt.logs.map((log: any) => { try { return contract.interface.parseLog(log) } catch { return null } }).filter((log: any) => log != null);
            const productIdLog = logs.find((log: any) => log.name === "ProductRegistered");
            const productId = productIdLog.args.productId.toString();
            const amountRecorded = productIdLog.args.amount.toString();
            modalInterface.success("Successfully recorded the product!");
            return { transactionHash: tx.hash, productId, amountRecorded };
        } else {
            type Product = {
                _nftAddress: string,
                _uri: string,
                _amount: number,
                _accepted: boolean,
                _affiliatePercentage: number,
                _price: number,
                _currencyAddress: string,
                _royalty: number,
                _nftType: NFTType,
                _productType: ProductType,
                _paymentType: PaymentMethodType,
                _beneficiaries: Beneficiary[]
            };
            const recordData: Product = {
                _nftAddress: nftContract,
                _uri: `https://ipfs.io/ipfs/${ipfsHash}`,
                _amount: amount,
                _accepted: acceptsManageWallet,
                _affiliatePercentage: commission,
                _price: price,
                _currencyAddress: currencyAddress,
                _royalty: royalty,
                _nftType: NFTType.ERC1155,
                _productType: type,
                _paymentType: PaymentMethodType.USD,
                _beneficiaries: beneficiaries
            }
            modalInterface.waiting("Minting the NFT...");
            const tx = await contract.mintAndRegister(recordData);
            modalInterface.waiting("Waiting for confirmation...");
            let receipt = await tx.wait();
            const logs = receipt.logs.map((log: any) => { try { return contract.interface.parseLog(log) } catch { return null } }).filter((log: any) => log != null);
            const productIdLog = logs.find((log: any) => log.name === "ProductRegistered");
            const productId = productIdLog.args.productId.toString();
            const amountRecorded = productIdLog.args.amount.toString();
            modalInterface.success("Successfully recorded the product!");
            return { transactionHash: tx.hash, productId, amountRecorded };
        }        
    } catch (e: any) {
        console.error(e);
        if (e.code.toString() === "ACTION_REJECTED") {
            modalInterface.error("Transaction Rejected");
            throw new Error("Transaction Rejected");
        }
        const err = contract.interface.parseError(e.data);
        if (err.name === "OwnableUnauthorizedAccount") {
            modalInterface.error("You are not the owner of the shop");
            throw new Unauthorized("record", address, shopAddress);
        }
        modalInterface.error(e);
        throw e;
    }
}