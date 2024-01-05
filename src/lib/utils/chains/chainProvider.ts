import { Beneficiary, Chain, Network, ProductType } from "./Chains";
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
    recordProduct(sku_properties: any, product_title: string, discription: string, image_url: string, price: number, amount: number, commission: number, type: ProductType, paymentWallet: string, beneficiaries: Beneficiary[], acceptsManageWallet: boolean, royalty: number, apiKey: string): Promise<string>;
    publishRequest(producerAccountAddress: string, tokenId: number | string): Promise<string>;
    approveRequest(requestId: number): Promise<string>;
    cancelRequest(requestId: number | string): Promise<string>;
    disapproveRequest(requestId: number | string): Promise<string>;
    setAddress(address: string): ChainProvider;
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
};

export function getNetworkProvider(chain: Chain, network: Network, address: string) {
    if (chainMapping[chain][network] == null)
        throw new ChainNotImplementedException("The given chain is not implemented yet");
    return chainMapping[chain][network]?.setAddress(address);
}