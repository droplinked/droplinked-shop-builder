import {ethers} from 'ethers';
import axios from 'axios';
import axiosInstance from 'lib/apis/axiosConfig';
async function getContractAddress(){
    let result = String((await axiosInstance.get("storage/contractAddressPolygon")).data.value);
    return result;
}
async function getContractABI(){
	let result = (await axiosInstance.get("storage/polygonABI")).data.value;
	result = atob(result);
	result = JSON.parse(result);
	return result;
}

async function getChainlinkABI(){
	let result = (await axiosInstance.get("storage/chainLinkABI")).data.value;
	result = atob(result);
	result = JSON.parse(result);
	return result;
}

export function toBase64(str: any){
	return btoa(str);
}
export {getContractABI, getContractAddress, getChainlinkABI};
// export const provider = new ethers.providers.Web3Provider((window as any).ethereum);