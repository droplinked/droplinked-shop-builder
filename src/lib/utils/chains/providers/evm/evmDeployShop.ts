import { ethers } from 'ethers';
import { Chain, Network } from "../../dto/chains";
import { getDeployerAddress, getShopByteCode } from "../../dto/chainConstants";
import { deployerABI } from "../../dto/chainABI";
import { chainLink } from '../../dto/chainLinkAddresses';

export async function EVMDeployShop(chain: Chain, network: Network, address:string, shopName: string, shopAddress: string, shopOwner: string, shopLogo: string, shopDescription: string) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    if ((await signer.getAddress()).toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        throw new Error("Address does not match signer address");
    }
    const deployerAddress = await getDeployerAddress(chain, network);
    const contract = new ethers.Contract(deployerAddress, deployerABI, signer);
    const byteCode = getShopByteCode();
    const salt = "0x0000000000000000000000000000000000000000000000000000000000000001";
    const constructorArgs = [shopName, shopAddress, shopOwner, shopLogo, shopDescription, deployerABI, chainLink[chain][network] as string];
    const bytecodeWithArgs = ethers.utils.defaultAbiCoder.encode(["string", "string", "address", "string", "string", "address", "address"], constructorArgs);
    const tx = await contract.deployShop(byteCode + bytecodeWithArgs.split("0x")[1], salt);
    const receipt = await tx.wait();
    console.log("receipt: ", receipt);
    console.log("tx: ", tx);
    return tx.hash;
}