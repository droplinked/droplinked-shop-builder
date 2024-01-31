import {uploadToIPFS} from '../evm/evmRecord'
import { Network } from "../../Chains";
import {CLPublicKey, CLString, CLU64, Contracts, DeployUtil, NamedArg, RuntimeArgs } from 'casper-js-sdk';
import { casperService, getContractAddress } from './casperConstants';
import { getCasperWalletInstance } from './casperWalletAuth';


async function casperRecordMerch(network: Network, sku_properties: any , address: string, product_title: string, discription: string, image_url: string, price: number, amount: number, commission: number, apiKey: string): Promise<string>{
    let IPFSHASH = await uploadToIPFS(sku_properties, apiKey);
    let producer_public_key = address;
    const publicKey = CLPublicKey.fromHex(producer_public_key);
    let gasPrice = 5*1000000000;
    const ttl = 1800000;
    let chain_name = network == Network.MAINNET ? "casper" : "casper-test";
    let deployParams = new DeployUtil.DeployParams(publicKey, chain_name , 1 , ttl);
    let contract_hash_string = await getContractAddress(network);
    let contract_byte_array = Contracts.contractHashToByteArray(contract_hash_string);    
    let named_args = [];
    named_args.push(new NamedArg("metadata" , new CLString(IPFSHASH)));
    named_args.push(new NamedArg("price" , new CLU64(price)));
    named_args.push(new NamedArg("amount" , new CLU64(String(amount))));
    named_args.push(new NamedArg("commission", new CLU64(commission)));
    let runtime_args = RuntimeArgs.fromNamedArgs(named_args);
    const kk = DeployUtil.ExecutableDeployItem.newStoredContractByHash(contract_byte_array  , "mint" , runtime_args);
    const payment = DeployUtil.standardPayment(gasPrice);
    let deploy = DeployUtil.makeDeploy(deployParams , kk , payment);
    const json = DeployUtil.deployToJson(deploy);
    const signature = await getCasperWalletInstance().sign(JSON.stringify(json), producer_public_key).catch((reason:any)=>{
        return "Cancelled";
    });
    const signedDeploy = DeployUtil.setSignature(
        deploy,
        signature.signature,
        CLPublicKey.fromHex(producer_public_key)
      );
    const deployres = await casperService.deploy(signedDeploy);
    return deployres.deploy_hash;
}
export { casperRecordMerch };