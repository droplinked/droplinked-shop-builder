import { IDroplinkedNFTs, IWalletNFTs } from "services/onchain-inventory/interface"
import { ICombinedNft } from "./interface"

export const mapWalletData = (walletNfts: IWalletNFTs): ICombinedNft => {
    return ({
        chain: walletNfts.chain,
        imageUrl: walletNfts.imageUrl,
        name: walletNfts.collectionName,
        quantity: walletNfts.amount,
        description: walletNfts.description,
        tokenAddress: walletNfts.tokenAddress,
        tokenId: walletNfts.tokenId,
        ownerAddress: walletNfts.ownerAddress,
        isDroplinkedProduct: false,
        productAddress: undefined,
        price: undefined,
        sku: []
    })
}

export const mapDroplinkedData = (droplinkedNfts: IDroplinkedNFTs): ICombinedNft => {
    return ({
        chain: droplinkedNfts.chain,
        imageUrl: droplinkedNfts.image,
        name: droplinkedNfts.name,
        quantity: droplinkedNfts.productQuantity,
        price: droplinkedNfts.productPrice,
        sku: droplinkedNfts.skus,
        productAddress: droplinkedNfts.productAddress,
        ownerAddress: undefined,
        isDroplinkedProduct: true,
        description: undefined,
        tokenAddress: undefined,
        tokenId: undefined,
    })
}