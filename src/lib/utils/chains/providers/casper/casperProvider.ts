import { Chain, ChainWallet, Network } from "../../dto/chains";
import { ChainProvider } from "../../chainProvider";
// import { casperApproveRequest, casperDisapproveRequest } from "./casperAffiliate";
// import { casperRecordMerch } from "./casperRecord";
import { AffiliateRequestData, Beneficiary, DeployedShop, ProductType, RecordData, Uint256 } from "../../dto/chainStructs";
import { ModalInterface } from "../../dto/modalInterface";
import { RecordProduct } from "../../dto/recordDTO";

export class CasperProvider implements ChainProvider{
    network: Network = Network.TESTNET;
    chain: Chain = Chain.CASPER;
    address: string = "";
    constructor(_chain: Chain, _network: Network) {
        this.chain = _chain;
        this.network = _network;
    }
    recordBatch(products: RecordProduct[], shopAddress: string, nftContract: string): Promise<RecordData> {
        throw new Error("Method not implemented.");
    }
    deployShop(shopName: string, shopAddress: string, shopOwner: string, shopLogo: string, shopDescription: string): Promise<DeployedShop> {
        throw new Error("Method not implemented.");
    }
    recordProduct(sku_properties: any, product_title: string, description: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, nftContract: string, shopAddress: string, currencyAddress: string, apiKey: string): Promise<RecordData> {
        throw new Error("Method not implemented.");
    }
    publishRequest(producerAccountAddress: string, tokenId: Uint256): Promise<AffiliateRequestData> {
        throw new Error("Method not implemented.");
    }
    setAddress(address: string): ChainProvider {
        throw new Error("Method not implemented.");
    }
    setWallet(wallet: ChainWallet): ChainProvider {
        throw new Error("Method not implemented.");
    }
    setModal(modal: ModalInterface): ChainProvider {
        throw new Error("Method not implemented.");
    }
    async walletLogin(): Promise<any> {
    }
    async casperRecordProduct(skuProperties: any, productTitle: string, description: string, imageUrl: string, price: number, amount: number, commission: number, apiKey: string): Promise<string> {
        // return await casperRecordMerch(this.network, skuProperties, this.address, productTitle, description, imageUrl, price, amount, commission, apiKey);
        return "";
    }
    async approveRequest(requestId: number): Promise<string> {
        // return await casperApproveRequest(this.network, this.address, requestId);
        return "";
    }
    async cancelRequest(requestId: string | number): Promise<string> {
        return "";
    }
    async disapproveRequest(requestId: string | number): Promise<string> {
        // return casperDisapproveRequest(this.network, this.address, requestId);
        return "";
    }
    
}