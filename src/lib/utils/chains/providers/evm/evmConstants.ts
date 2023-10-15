import axios from 'axios';
import { Chain, Network } from '../../Chains';
async function getContractAddress(chain: Chain, network: Network) {
	let result = String((await axios.get(`https://apiv3dev.droplinked.com/storage/${snakeCase(Chain[chain])}${snakeCase(Network[network])}ContractAddress`)).data.value); // example: BinanceContractAddress
	return result;
}
async function getContractABI(_chain: Chain) {
	let result = [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_baseContract",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_tokenContract",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "AccessDenied",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "AlreadyRequested",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "DifferentAmounts",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				}
			],
			"name": "ERC20TransferFailed",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "NotSupportedERC20Token",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "RequestIsAccepted",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "RequestNotfound",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "TimePassed",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "AcceptRequest",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "CancelRequest",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "DisapproveRequest",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "PulishRequest",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "erc20token",
					"type": "address"
				}
			],
			"name": "addERC20Contract",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "approve_request",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "cancel_request",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "disapprove",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "droplinkedBase",
			"outputs": [
				{
					"internalType": "contract IDroplinkedBase",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "droplinkedToken",
			"outputs": [
				{
					"internalType": "contract IDroplinkedToken",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_uri",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_commission",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				}
			],
			"name": "mint",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256[]",
					"name": "amounts",
					"type": "uint256[]"
				},
				{
					"internalType": "address[]",
					"name": "receivers",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "tokenIds",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "tokenAmounts",
					"type": "uint256[]"
				},
				{
					"internalType": "address",
					"name": "tokenReceivers",
					"type": "address"
				},
				{
					"internalType": "address[]",
					"name": "tokenSenders",
					"type": "address[]"
				},
				{
					"internalType": "address",
					"name": "erc20TokenContract",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "signature",
					"type": "bytes"
				}
			],
			"name": "payment",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "producer_account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "publish_request",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "erc20token",
					"type": "address"
				}
			],
			"name": "removeERC20Contract",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_fee",
					"type": "uint256"
				}
			],
			"name": "setFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "_heartbeat",
					"type": "uint16"
				}
			],
			"name": "setHeartBeat",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];
	return result;
}

function snakeCase(str: string) {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
export function toBase64(str: any) {
	return btoa(str);
}
export { getContractABI, getContractAddress };