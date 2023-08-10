import { getContractABI, getContractAddress, getXRPSignedPrice} from './xrpConstants';
import {ethers} from 'ethers';
/**
 * 
 * @param price the price to pay in USD (as a number)
 * @param recipient address of the reciever
 * @returns tx_hash
 */
async function directBuy(price: number, recipient: any){
    let provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(await getContractAddress(), await getContractABI(), signer);
    const result = await getXRPSignedPrice();
    let latestAnswer = result.latestAnswer;
    const timestamp = result.timestamp;
    const signature = result.signature;
    let amount_to_send = String(Math.floor((Number(price*100)*(1e24/Number(latestAnswer)))*1.01));
    try{
        let tx = await contract.connect(signer).direct_buy(String(price*100), recipient, latestAnswer, timestamp, signature , {gasLimit : 3000000, value : ethers.BigNumber.from(amount_to_send)});
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}

async function recordedBuy(producer : string, token_id : string, productPrice : number, shipping : number, tax : number, amount : number){
    let provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const result = await getXRPSignedPrice();
    let latestAnswer = result.latestAnswer;
    const timestamp = result.timestamp;
    const signature = result.signature;    const signer = provider.getSigner();
    const contract = new ethers.Contract(await getContractAddress(), await getContractABI(), signer);
    let amount_to_send = String(Math.floor((Number((productPrice*amount+tax+shipping)*100)*(1e24/Number(latestAnswer)))*1.01));
    try{
        let tx = await contract.connect(signer).buy_recorded(producer, token_id, String(Math.floor(shipping*100)),String(Math.floor(tax*100)), String(amount), latestAnswer, timestamp, signature  , {gasLimit : 3000000, value : ethers.BigNumber.from(amount_to_send)});
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}

async function affiliateBuy(request_id : string, amount : number, shipping : number, tax : number, productPrice : number){
    let provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const result = await getXRPSignedPrice();
    let latestAnswer = result.latestAnswer;
    const timestamp = result.timestamp;
    const signature = result.signature;    const signer = provider.getSigner();
    const contract = new ethers.Contract(await getContractAddress(), await getContractABI(), signer);
    let amount_to_send = String(Math.floor((Number((productPrice*amount+tax+shipping)*100)*(1e24/Number(latestAnswer)))*1.01));
    try{
        let tx = await contract.connect(signer).buy_recorded(request_id,String(amount), String(shipping), String(tax) , latestAnswer, timestamp, signature  , {gasLimit : 3000000, value : ethers.BigNumber.from(amount_to_send)});
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}



export {directBuy, recordedBuy,affiliateBuy};