import { ethers } from 'ethers';
import { Chain, Network } from "../../dto/chains";
import { getDeployerAddress, getGasPrice, getShopByteCode } from "../../dto/chainConstants";
import { deployerABI } from "../../dto/chainABI";
import { chainLink } from '../../dto/chainLinkAddresses';

function sixify(num: number): string {
    return num.toString().padStart(6, "0");
}

export async function EVMDeployShop(chain: Chain, network: Network, address: string, shopName: string, shopAddress: string, shopOwner: string, shopLogo: string, shopDescription: string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const deployerAddress = await getDeployerAddress(chain, network);
    console.log("deployerAddress: ", deployerAddress);
    const contract = new ethers.Contract(deployerAddress, deployerABI, signer);
    const byteCode = await getShopByteCode();
    const salt = "0x" + address.split("0x")[1] + "000000000000000000" + sixify((await provider.getTransactionCount(address)) + 1);
    const constructorArgs = [shopName, shopAddress, shopOwner, shopLogo, shopDescription, deployerAddress, chainLink[chain][network]];
    const bytecodeWithArgs = ethers.utils.defaultAbiCoder.encode(["string", "string", "address", "string", "string", "address", "address"], constructorArgs);
    try {
        await contract.callStatic.deployShop(byteCode + bytecodeWithArgs.split("0x")[1], salt,);
        const gasEstimation = (await contract.estimateGas.deployShop(byteCode + bytecodeWithArgs.split("0x")[1], salt,)).toBigInt().valueOf();
        const tx = await contract.deployShop(byteCode + bytecodeWithArgs.split("0x")[1], salt, {
            gasLimit: gasEstimation * BigInt(105) / BigInt(100),
            gasPrice: getGasPrice(provider)
        })
        const receipt = await tx.wait();
        const logs = receipt.logs.map((log: any) => contract.interface.parseLog(log)) as any;
        const shopDeployLog = logs.find((log: any) => log.name === "ShopDeployed");
        const deployedShopAddress = shopDeployLog.args.shop;
        const deployedNFTAddress = shopDeployLog.args.nftContract;
        return { transaction_id: tx.hash, deployedShopAddress, deployedNFTAddress };
    } catch (e: any) {
        if (e.code.toString() === "ACTION_REJECTED") {
            throw new Error("Transaction Rejected");
        }
        const err = contract.interface.parseError(e.data);
        throw err;
    }
}