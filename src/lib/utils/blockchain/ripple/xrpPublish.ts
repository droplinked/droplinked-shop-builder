import {ethers} from 'ethers';
import {getContractABI, getContractAddress} from './xrpConstants'
/**
 * 
 * @param address The address of the user who is requesting the NFT to be published
 * @param producer_account_address the address of the producer account
 * @param token_id the token id of the NFT
 * @returns the transaction hash of the transaction
 */
export let XRPPublishRequest = async function(address: string, producer_account_address: string,token_id: number | string){
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if((await signer.getAddress()).toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(await getContractAddress(), await getContractABI(), signer);
    try{
        let tx = await contract.publish_request(producer_account_address,token_id, {
            gasLimit : 3000000
        });
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}
