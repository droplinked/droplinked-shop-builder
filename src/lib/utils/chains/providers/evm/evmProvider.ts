import { ChainProvider, WalletNotFoundException } from "../../chainProvider";
import { Beneficiary, ProductType } from "../../dto/chainStructs";
import { Chain, Network } from "../../dto/chains";
import { EVMApproveRequest, EVMCancelRequest, EVMDisapproveRequest } from "./evmAffiliate";
import { metamaskLogin, isMetamaskInstalled, getAccounts, isWalletConnected, isChainCorrect, changeChain } from "./evmLogin";
import { EVMPublishRequest } from "./evmPublish";
import { EVMrecordMerch } from "./evmRecord";

export class EVMProvider implements ChainProvider {
    chain: Chain = Chain.BINANCE;
    network: Network = Network.TESTNET;
    address: string = "";
    constructor(_chain: Chain, _network: Network) {
        this.chain = _chain;
        this.network = _network;
    }
    casperRecordProduct(skuProperties: any, productTitle: string, description: string, imageUrl: string, price: number, amount: number, commission: number, apiKey: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    setAddress(address: string): ChainProvider {
        this.address = address;
        return this;
    }
    async handleWallet(_address: string) {
        if (!isMetamaskInstalled())
            throw new WalletNotFoundException("Metamask is not installed");
        let accs = await getAccounts();
        if (!isWalletConnected() || accs.length == 0) {
            let { address } = await this.walletLogin();
            if (_address.toLocaleLowerCase() != address.toLocaleLowerCase()) {
                await (window as any).ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{
                        eth_accounts: {},
                    }]
                });
                this.handleWallet(_address);
                // throw new AccountChangedException("The current account on your wallet is not the one you've logged in with!");
            }
        }
        if (!await isChainCorrect(this.chain, this.network)) {
            await changeChain(this.chain, this.network);
        }
        if (String(accs[0]).toLocaleLowerCase() != _address.toLocaleLowerCase()) {
            await (window as any).ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {},
                }]
            });
            this.handleWallet(_address);
            // throw new AccountChangedException("The current account on your wallet is not the one you've logged in with!");
        }
    }
    async walletLogin() {
        let { address, signature } = await metamaskLogin(this.chain, this.network);
        this.address = address;
        return { address, signature };
    }
    async recordProduct(sku_properties: any, product_title: string, discription: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, paymentWallet: string, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, apiKey: string): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMrecordMerch(this.chain, this.network, sku_properties, this.address, product_title, discription, image_url, price, amount, commission, type, paymentWallet, beneficiaries, acceptsManageWallet, royalty, apiKey);
    }
    async publishRequest(producerAccountAddress: string, tokenId: string | number): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMPublishRequest(this.chain, this.network, this.address, producerAccountAddress, tokenId);
    }
    async approveRequest(requestId: number): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMApproveRequest(this.chain, this.network, this.address, requestId);
    }
    async cancelRequest(requestId: string | number): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMCancelRequest(this.chain, this.network, this.address, requestId);
    }
    async disapproveRequest(requestId: string | number): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMDisapproveRequest(this.chain, this.network, this.address, requestId);
    }
}