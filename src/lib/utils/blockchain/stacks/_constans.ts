import { appDeveloment } from "lib/utils/app/variable";

export const configStacks = {
    contractAddress: appDeveloment ? process.env.REACT_APP_CONTRACT_ADDRESS_STACKS_TESTNET : process.env.REACT_APP_CONTRACT_ADDRESS_STACKS_MAINNET,
    contractName: process.env.REACT_APP_CONTRACT_NAME_STACK,
}