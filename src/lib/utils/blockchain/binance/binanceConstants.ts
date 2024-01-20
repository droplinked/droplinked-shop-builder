import {ethers} from 'ethers';
import axios from 'axios';
async function getContractAddress(){
    let result = String((await axios.get("https://apiv3dev.droplinked.com/storage/contractAddressBinance")).data.value);
    return result;
}
async function getContractABI(){
	let result = (await axios.get("https://apiv3dev.droplinked.com/storage/binanceABI")).data.value;
	result = atob(result);
	result = JSON.parse(result);
	return result;
}

async function getChainlinkABI(){
	let result = (await axios.get("https://apiv3dev.droplinked.com/storage/chainLinkABIBinance")).data.value;
	result = atob(result);
	result = JSON.parse(result);
	return result;
}

export function toBase64(str: any){
	return btoa(str);
}
export {getContractABI, getContractAddress, getChainlinkABI};
// export const provider = new ethers.providers.Web3Provider((window as any).ethereum);