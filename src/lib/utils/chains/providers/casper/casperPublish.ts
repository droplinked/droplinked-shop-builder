// import { CLAccountHash, CLKey, CLPublicKey, CLU64, Contracts, DeployUtil, NamedArg, RuntimeArgs } from 'casper-js-sdk';
// import * as casper_consts from './casperConstants';
// import { getCasperWalletInstance } from './casperWalletAuth';
// import { Network } from '../../dto/chains';
// export let casperPublishRequest = async function(network: Network, address: string, producer_account_address: string, token_id: number | string){
//     const fromHexString = (hexString:string) =>
//         Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
//     let producer_hash = new CLAccountHash(fromHexString(producer_account_address));
//     const publicKeyHex = address;
//     const publicKey = CLPublicKey.fromHex(publicKeyHex);
//     let gasPrice = 3800000000;
//     const ttl = 1800000;
//     let network_name = network == Network.MAINNET ? "casper" : "casper-test";
//     let deployParams = new DeployUtil.DeployParams(publicKey, network_name , 1 , ttl);
//     let contract_hash_string = await casper_consts.getContractAddress(network);
//     let contract_byte_array = Contracts.contractHashToByteArray(contract_hash_string);
//     let named_args = [];
//     named_args.push(new NamedArg("token_id" , new CLU64(token_id)));
//     named_args.push(new NamedArg("producer-account" , new CLKey(producer_hash)));
//     let runtime_args = RuntimeArgs.fromNamedArgs(named_args);
//     const kk = DeployUtil.ExecutableDeployItem.newStoredContractByHash(contract_byte_array  , "publish_request" , runtime_args);
//     const payment = DeployUtil.standardPayment(gasPrice);
//     let deploy = DeployUtil.makeDeploy(deployParams , kk , payment);
//     const json = DeployUtil.deployToJson(deploy);
//     const signature = await getCasperWalletInstance().sign(JSON.stringify(json), publicKeyHex).catch((reason: any)=>{
//         return "Cancelled";
//     });
//     const signedDeploy = DeployUtil.setSignature(
//         deploy,
//         signature.signature,
//         CLPublicKey.fromHex(publicKeyHex)
//       );
//     const deployres = await casper_consts.casperService.deploy(signedDeploy);
//     return deployres.deploy_hash;
// }