import { AffiliateRequestData, DeployedShop, EthAddress, ProductType, RecordData, Uint256 } from "./dto/chainStructs";
import { Beneficiary } from "./dto/chainStructs";
import { Chain, ChainWallet, Network } from "./dto/chains";
import { ModalInterface, defaultModal } from "./dto/modalInterface";
import { CasperProvider } from "./providers/casper/casperProvider";
import { EVMProvider } from "./providers/evm/evmProvider";

export class WalletNotFoundException {
    public readonly message: string = "";
    constructor(field: string) {
        this.message = field;
    }
}

export class AccountChangedException {
    public readonly message: string = "";
    constructor(field: string) {
        this.message = field;
    }
}

export class ChainNotImplementedException {
    public readonly message: string = "";
    constructor(field: string) {
        this.message = field;
    }
}

export interface ChainProvider {
    walletLogin(): Promise<any>;
    casperRecordProduct(skuProperties: any, productTitle: string, description: string, imageUrl: string, price: number, amount: number, commission: number, apiKey: string): Promise<string>;
    deployShop(shopName: string, shopAddress: string, shopOwner: EthAddress, shopLogo: string, shopDescription: string): Promise<DeployedShop>;
    recordProduct(sku_properties: any, product_title: string, description: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, nftContract: EthAddress, shopAddress: EthAddress, currencyAddress: EthAddress, apiKey: string): Promise<RecordData>;
    publishRequest(productId: Uint256, shopAddress: EthAddress): Promise<AffiliateRequestData>;
    approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string>;
    disapproveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string>;
    setAddress(address: EthAddress): ChainProvider;
    setWallet(wallet: ChainWallet): ChainProvider;
    setModal(modal: ModalInterface): ChainProvider;
}

let chainMapping = {
    [Chain.BINANCE]: {
        [Network.TESTNET]: new EVMProvider(Chain.BINANCE, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.BINANCE, Network.MAINNET),
    },
    [Chain.POLYGON]: {
        [Network.TESTNET]: new EVMProvider(Chain.POLYGON, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.POLYGON, Network.MAINNET),
    },
    [Chain.NEAR]: {
        [Network.TESTNET]: new EVMProvider(Chain.NEAR, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.NEAR, Network.MAINNET)
    },
    [Chain.CASPER]: {
        [Network.TESTNET]: new CasperProvider(Chain.CASPER, Network.TESTNET),
        [Network.MAINNET]: new CasperProvider(Chain.CASPER, Network.MAINNET),
    },
    [Chain.XRPLSIDECHAIN]: {
        [Network.TESTNET]: new EVMProvider(Chain.XRPLSIDECHAIN, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.XRPLSIDECHAIN, Network.MAINNET),
    },
    [Chain.BASE]: {
        [Network.TESTNET]: new EVMProvider(Chain.BASE, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.BASE, Network.MAINNET),
    },
    [Chain.STACKS]: {
        [Network.TESTNET]: null,
        [Network.MAINNET]: null,
    },
    [Chain.SKALE]: {
        [Network.TESTNET]: new EVMProvider(Chain.SKALE, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.SKALE, Network.MAINNET),
    },
    [Chain.LINEA]: {
        [Network.TESTNET]: new EVMProvider(Chain.LINEA, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.LINEA, Network.MAINNET),
    },
    [Chain.ETH]: {
        [Network.TESTNET]: new EVMProvider(Chain.ETH, Network.TESTNET),
        [Network.MAINNET]: new EVMProvider(Chain.ETH, Network.MAINNET),
    }
};

export function getNetworkProvider(chain: Chain, network: Network, address: string, wallet: ChainWallet = ChainWallet.Metamask, modalInterface: ModalInterface = new defaultModal()) {
    if (chainMapping[chain][network] == null)
        throw new ChainNotImplementedException("The given chain is not implemented yet");
    if (modalInterface == null) {
        modalInterface = new defaultModal();
    }
    if (wallet == null && (chain !== Chain.CASPER && chain !== Chain.STACKS)) {
        wallet = ChainWallet.Metamask;
    }
    return chainMapping[chain][network]?.setAddress(address).setModal(modalInterface).setWallet(wallet);
}