export interface IRetrieveNFTs {
    myProducts: boolean;
    body: {
        address: string;
        chain: string;
        network: string;
    }
}