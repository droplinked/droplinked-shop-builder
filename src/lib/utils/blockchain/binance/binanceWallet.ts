/**
 * 
 * @returns {Promise<string>} the Currently active Binance Account
 */
export async function getCurrentBinanceAccount(): Promise<string>{
    return (await (window as any).BinanceChain.enable())[0];
}

export async function signBinance(message: any){
    console.log((window as any).BinanceChain)
    console.log(await (window as any).BinanceChain.bnbSign(await getCurrentBinanceAccount(), message));
}

export async function binanceLogin(){
    let result = await (window as any).BinanceChain.bnbSign(await getCurrentBinanceAccount(), "Please sign this message to let droplinked access to your PublicKey and validate your identity.");
    return {
        "signature" : result.signature,
        "address" : await getCurrentBinanceAccount()
    };
}

