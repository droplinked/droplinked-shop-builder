import { Buffer } from "buffer";
/**
 * 
 * @returns {boolean} true if Metamask is installed on the browser otherwise false
 */
export const isMetamaskInstalled = () : boolean => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
};

async function getAccounts(){
    return await (window as any).ethereum.request({method : 'eth_accounts'});
}

export async function isWalletConnected(){
    let accounts = await getAccounts();
    return accounts && accounts[0] > 0;
}

async function requestAccounts(){
    try{
        return await (window as any).ethereum.request({method : 'eth_requestAccounts'});
    }
    catch(error){
        console.error(error);
    }
}

/**
 * 
 * @param {string} address The address to get the balance of
 * @returns {Promise<number>} the balance of the address in wei
 */
export async function getBalance(address: string): Promise<number>{
    return Number(await (window as any).ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] }));
}

/**
 * 
 * @param network The network to switch to (mainnet or testnet)
 * @returns {Promise<{address : string, network : "testnet" | "mainnet", signature : string,}>} the address, network and signature
 */
export async function BinanceMetamaskLogin(network : "testnet" | "mainnet" = "testnet") : Promise<{
    address : string,
    network : "testnet" | "mainnet",
    signature : string,
}>{
    if(!isMetamaskInstalled()){
        throw ("Wallet is not installed");
    }
    if (!await isWalletConnected()){
        await requestAccounts();
    }
    let address = (await getAccounts())[0];
    let chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
    
    try {
        if (network == "testnet")
        await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainName: 'Smart Chain - Testnet',
                chainId: '0x61',
                nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/']
            }]
        });
        else if (network == "mainnet")
        await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainName: 'Smart Chain',
                chainId: '0x38',
                nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
                rpcUrls: ['https://bsc-dataseed.binance.org/']
            }]
        });
    } catch (err) {

    }

    // If it was on mainnet and network was set to testnet
    if(Number(chainId) == 56 && network == "testnet"){
        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }], 
        });
        chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
    }
    // If it was on testnet and network was set to mainnet
    else if (Number(chainId) == 97 && network == "mainnet"){
        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
        });
        chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
    }
    // If it was on neither mainnet nor testnet
    if (Number(chainId) != 97 && Number(chainId) != 56){
        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: network == "testnet" ? '0x61' : '0x38' }], 
        });
        chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
    }
    const siweMessage = `Please sign this message to let droplinked view your PublicKey & Address and validate your identity`;
    let msg = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`;
    const signature = await (window as any).ethereum.request({ method: 'personal_sign', params: [msg,address]});
    return {
        address : address,
        network : network,
        signature : signature
    };
}

