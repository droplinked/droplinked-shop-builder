import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { PublicKey, Connection } from '@solana/web3.js'
import { ModalInterface } from '../../dto/modalInterface'

import { DroplinkedSolanaProgram } from './idl/droplinked_solana_program'
import IDL from './idl/droplinked_solana_program.json'
import Prando from 'prando'
import { NFTStorage } from 'nft.storage'
import { addresses } from './utils'

export async function uploadToIPFS(metadata: any, apiKey: string) {
	const client = new NFTStorage({ token: apiKey })
	if (typeof metadata == typeof {} || typeof metadata == typeof []) {
		metadata = JSON.stringify(metadata)
	}
	const ipfs_hash = await client.storeBlob(new Blob([metadata]))
	return ipfs_hash
}

export async function SolanDeployShop(
	provider: any,
	address: string,
	shopInformation: {
		name: string
		description: string
		address: string
		owner: string
		logo: string
	},
	apiKey: string,
	modalInterface: ModalInterface
) {
	modalInterface.waiting('Getting ready to deploy...')

	const anchorProvider = new AnchorProvider(
		new Connection('https://api.devnet.solana.com'),
		provider
	)
	const program = new Program<DroplinkedSolanaProgram>(
		IDL as DroplinkedSolanaProgram,
		anchorProvider
	)

	const shop = JSON.parse(localStorage.getItem('appStore')).state.shop

	const nonce_generator = new Prando(shop._id)
	nonce_generator.reset()

	const nonce = [0, 0, 0, 0, 0, 0, 0, 0].map(() => nonce_generator.nextInt(0, 255))

	let metadata = {
		name: shopInformation.name,
		description: shopInformation.description,
		image: shopInformation.logo,
	}
	let metadata_ipfs_hash = await uploadToIPFS(metadata, apiKey)

	try {
		const signature = await program.methods
			.createShop(nonce, metadata_ipfs_hash)
			.accounts({ owner: new PublicKey(address) })
			.rpc()

		modalInterface.waiting('Finalizing Transaction...')
		await anchorProvider.connection.confirmTransaction(signature, 'finalized')
		modalInterface.success('Shop Deployed')

		const [deployedShopAddress] = addresses.deriveShop(
			new PublicKey(address),
			Uint8Array.from(nonce),
			program.programId
		)

		return { transaction_id: signature, deployedShopAddress, deployedNFTAddress: '' }
	} catch (err) {
		modalInterface.error(err)
		throw new Error(err)
	}
}
