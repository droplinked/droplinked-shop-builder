import { Chain, Network } from "../../Chains";
import { ChainProvider } from "../../chainProvider";
import { casperApproveRequest, casperDisapproveRequest } from "./casperAffiliate";
import { casperPublishRequest } from "./casperPublish";
import { casperRecordMerch } from "./casperRecord";
import { casper_login } from "./casperWalletAuth";

export class CasperProvider implements ChainProvider{
    network: Network = Network.TESTNET;
    chain: Chain = Chain.CASPER;
    address: string = "";
    constructor(_chain: Chain, _network: Network) {
        this.chain = _chain;
        this.network = _network;
    }
    async walletLogin(onConnected:any): Promise<any> {
        return casper_login(onConnected);
    }
    async recordProduct(skuProperties: any, productTitle: string, description: string, imageUrl: string, price: number, amount: number, commission: number, apiKey: string): Promise<string> {
        return await casperRecordMerch(this.network, skuProperties, this.address, productTitle, description, imageUrl, price, amount, commission, apiKey);
    }
    async publishRequest(producerAccountAddress: string, tokenId: string | number): Promise<string> {
        return await casperPublishRequest(this.network, this.address, producerAccountAddress, tokenId)
    }
    async approveRequest(requestId: number): Promise<string> {
        return await casperApproveRequest(this.network, this.address, requestId);
    }
    async cancelRequest(requestId: string | number): Promise<string> {
        return "";
    }
    async disapproveRequest(requestId: string | number): Promise<string> {
        return casperDisapproveRequest(this.network, this.address, requestId);
    }
    setAddress(address: string): ChainProvider {
        this.address = address;
        return this;
    }
}