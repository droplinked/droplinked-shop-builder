import axios from 'axios';
import { Buffer } from 'buffer';
async function getContractAddress(){
    let result = String((await axios.get("https://apiv3dev.droplinked.com/storage/contractAddress-XRP-Testnet")).data.value);
    return result;
}
async function getContractABI(){
	let result = (await axios.get("https://apiv3dev.droplinked.com/storage/ABI-XRP-Testnet")).data.value;
	result = Buffer.from(result,'base64').toString();
	result = JSON.parse(result);
	return result;
}

async function getXRPSignedPrice() : Promise<{signature : String, timestamp: String, latestAnswer : String, contractAddress : String}>{
	let result = (await axios.get("https://apiv3dev.droplinked.com/payment/ripplesidechain/signed-price")).data.value;
	return result;
}

export function toBase64(str: any){
	return btoa(str);
}
export {getContractABI, getContractAddress, getXRPSignedPrice};
