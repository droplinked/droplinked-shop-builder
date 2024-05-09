import { CLPublicKey, CLU64, Contracts, DeployUtil, NamedArg, RuntimeArgs } from "casper-js-sdk";
import * as casper_consts from './casperConstants'
import { getCasperWalletInstance } from "./casperWalletAuth";
import { Network } from "../../dto/chains";

export let casperApproveRequest = async function(network: Network, address: string, request_id: number){
    const publicKeyHex = address;
    const publicKey = CLPublicKey.fromHex(publicKeyHex);
    let gasPrice = 2941000000;
    const ttl = 1800000;
    let chain_name = network == Network.MAINNET ? "casper" : "casper-test";
    let deployParams = new DeployUtil.DeployParams(publicKey, chain_name , 1 , ttl);
    let contract_hash_string = await casper_consts.getContractAddress(network);
    let contract_byte_array = Contracts.contractHashToByteArray(contract_hash_string);
    let named_args = [];
    named_args.push(new NamedArg("request_id" , new CLU64(request_id)));
    let runtime_args = RuntimeArgs.fromNamedArgs(named_args);
    const kk = DeployUtil.ExecutableDeployItem.newStoredContractByHash(contract_byte_array  , "approve_request" , runtime_args);
    const payment = DeployUtil.standardPayment(gasPrice);
    let deploy = DeployUtil.makeDeploy(deployParams , kk , payment);
    const json = DeployUtil.deployToJson(deploy);
    const signature = await getCasperWalletInstance().sign(JSON.stringify(json), publicKeyHex).catch((reason: any)=>{
        return "Cancelled";
    });
    const signedDeploy = DeployUtil.setSignature(
        deploy,
        signature.signature,
        CLPublicKey.fromHex(publicKeyHex)
      );
    const deployres = await casper_consts.casperService.deploy(signedDeploy);
    return deployres.deploy_hash;//na
}

export let casperDisapproveRequest = async function(network: Network, address: string, request_id: number | string){
    const publicKeyHex = address;
    const publicKey = CLPublicKey.fromHex(publicKeyHex);
    let gasPrice = 2941000000;
    const ttl = 1800000;
    let chain_name = network == Network.MAINNET ? "casper" : "casper-test";
    let deployParams = new DeployUtil.DeployParams(publicKey, chain_name , 1 , ttl);
    let contract_hash_string = await casper_consts.getContractAddress(network);
    let contract_byte_array = Contracts.contractHashToByteArray(contract_hash_string);
    let named_args = [];
    named_args.push(new NamedArg("request_id" , new CLU64(request_id)));
    let runtime_args = RuntimeArgs.fromNamedArgs(named_args);
    const kk = DeployUtil.ExecutableDeployItem.newStoredContractByHash(contract_byte_array  , "disapprove" , runtime_args);
    const payment = DeployUtil.standardPayment(gasPrice);
    let deploy = DeployUtil.makeDeploy(deployParams , kk , payment);
    const json = DeployUtil.deployToJson(deploy);
    const signature = await getCasperWalletInstance().sign(JSON.stringify(json), publicKeyHex).catch((reason:any)=>{
        return "Cancelled";
    });
    const signedDeploy = DeployUtil.setSignature(
        deploy,
        signature.signature,
        CLPublicKey.fromHex(publicKeyHex)
      );
    const deployres = await casper_consts.casperService.deploy(signedDeploy);
    return deployres.deploy_hash;
}