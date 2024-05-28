import { ethers } from "ethers";
import { ChainProvider, WalletNotFoundException } from "../../chainProvider";
import { AffiliateRequestData, Beneficiary, EthAddress, ProductType, RecordData, Uint256 } from "../../dto/chainStructs";
import { Chain, ChainWallet, Network } from "../../dto/chains";
import { ModalInterface, defaultModal } from "../../dto/modalInterface";
import { EVMApproveRequest, EVMDisapproveRequest } from "./evmAffiliate";
import { EVMDeployShop } from "./evmDeployShop";
import { evmLogin, isMetamaskInstalled, getAccounts, isWalletConnected, isChainCorrect, changeChain } from "./evmLogin";
import { EVMPublishRequest } from "./evmPublish";
import { EVMrecordMerch } from "./evmRecord";

export class EVMProvider implements ChainProvider {
    chain: Chain = Chain.BINANCE;
    network: Network = Network.TESTNET;
    address: string = "";
    modalInterface: ModalInterface = new defaultModal();
    wallet: ChainWallet = ChainWallet.Metamask;

    constructor(_chain: Chain, _network: Network) {
        this.chain = _chain;
        this.network = _network;
    }

    setWallet(wallet: ChainWallet) {
        this.wallet = wallet;
        return this;
    }

    setModal(modal: ModalInterface): ChainProvider {
        this.modalInterface = modal;
        return this;
    }

    getWalletProvider() {
        const ethereum = (window as any).ethereum;
        if (!ethereum) throw new WalletNotFoundException("No EVM Wallet is installed");
        // multiple wallet installed
        if (ethereum.providerMap) {
            if (this.wallet === ChainWallet.Metamask) {
                if (!ethereum.providerMap.get("MetaMask"))
                    throw new WalletNotFoundException("Metamask is not installed");
                return new ethers.providers.Web3Provider(ethereum.providers.find((x: any) => { return x.isMetaMask }));
            } else if (this.wallet === ChainWallet.CoinBase) {
                if (!ethereum.providerMap.get('CoinbaseWallet'))
                    throw new WalletNotFoundException(
                        'Coinbase wallet not found'
                    );
                return new ethers.providers.Web3Provider(
                    ethereum.providers.find((x: any) => {
                        return x.isCoinbaseWallet;
                    })
                );
            } else if (this.wallet === ChainWallet.Phantom) {
                if (!ethereum.providerMap.get('CoinbaseWallet'))
                    throw new WalletNotFoundException(
                        'Coinbase wallet not found'
                    );
                return new ethers.providers.Web3Provider(
                    ethereum.providers.find((x: any) => {
                        return x.isCoinbaseWallet;
                    })
                );
            } else {
                throw new Error('Wallet not implemented');
            }
        } else {
            // single wallet installed
            if (this.wallet === ChainWallet.CoinBase) {
                if (!(window as any).ethereum.isCoinbaseWallet)
                    throw new WalletNotFoundException("Coinbase wallet not found");

            } else if (this.wallet === ChainWallet.Metamask) {
                if (!(window as any).ethereum.isMetaMask)
                    throw new WalletNotFoundException("Metamask wallet not found");
            }
            return new ethers.providers.Web3Provider((window as any).ethereum);
        }
    }


    async deployShop(shopName: string, shopAddress: string, shopOwner: string, shopLogo: string, shopDescription: string): Promise<any> {
        await this.handleWallet(this.address);
        return await EVMDeployShop(this.getWalletProvider(),this.chain, this.network, this.address, shopName, shopAddress, shopOwner, shopLogo, shopDescription, this.modalInterface);
    }

    casperRecordProduct(skuProperties: any, productTitle: string, description: string, imageUrl: string, price: number, amount: number, commission: number, apiKey: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    setAddress(address: string): ChainProvider {
        this.address = address;
        return this;
    }

    async handleWallet(_address: string) {
        if (!isMetamaskInstalled()) {
            this.modalInterface.error("Metamask is not installed");
            throw new WalletNotFoundException("Metamask is not installed");
        }
        this.modalInterface.waiting("Getting accounts...");
        const provider = this.getWalletProvider();
        const ethereum = provider.provider as any;
        let accounts = await getAccounts(ethereum);
        if (!isWalletConnected(ethereum) || accounts.length === 0) {
            this.modalInterface.waiting("Please connect your wallet");
            let { address } = await this.walletLogin();
            if (_address.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
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
        if (!await isChainCorrect(ethereum,this.chain, this.network)) {
            this.modalInterface.waiting("Changing chain...");
            await changeChain(ethereum,this.chain, this.network);
        }
        if (String(accounts[0]).toLocaleLowerCase() !== _address.toLocaleLowerCase()) {
            this.modalInterface.waiting("Change your account based on the one you used to login...");
            await (window as any).ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {
                    },
                }]
            });
            this.handleWallet(_address);
        }
        this.modalInterface.success("Wallet connected");
    }
    async walletLogin() {
        let { address, signature } = await evmLogin(this.getWalletProvider(), this.chain, this.network, this.modalInterface);
        this.address = address;
        return { address, signature };
    }
    async recordProduct(sku_properties: any, product_title: string, description: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, nftContract: EthAddress, shopAddress: EthAddress, currencyAddress: EthAddress, apiKey: string): Promise<RecordData> {
        await this.handleWallet(this.address);
        return await EVMrecordMerch(this.getWalletProvider(),sku_properties, this.address, product_title, description, image_url, price, amount, commission, type, beneficiaries, acceptsManageWallet, royalty, nftContract, shopAddress, currencyAddress, apiKey, this.modalInterface);
    }
    async publishRequest(productId: Uint256, shopAddress: EthAddress): Promise<AffiliateRequestData> {
        await this.handleWallet(this.address);
        return await EVMPublishRequest(this.getWalletProvider(),this.address, productId, shopAddress, this.modalInterface);
    }
    async approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMApproveRequest(this.getWalletProvider(),this.address, requestId, shopAddress, this.modalInterface);
    }
    async disapproveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string> {
        await this.handleWallet(this.address);
        return await EVMDisapproveRequest(this.getWalletProvider(),this.address, requestId, shopAddress, this.modalInterface);
    }
}